import { PrismaClient, Role, Prisma } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

interface WPMetaData {
  key: string;
  value: string;
}

interface WPUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  avatar_url?: string;
  description?: string;
  status: string;
  billing?: {
    address_1?: string;
    address_2?: string;
    city?: string;
    state?: string;
    phone?: string;
    company?: string;
  };
  shipping?: {
    address_1?: string;
    address_2?: string;
    city?: string;
    state?: string;
  };
  meta_data?: WPMetaData[];
}

// Mapeamento de roles do WordPress para nosso sistema
const roleMapping: Record<string, Role> = {
  administrator: "ADMIN",
  editor: "EDITOR",
  author: "AUTOR",
  subscriber: "ASSINANTE",
  customer: "CLIENTE",
  "wcfm_vendor": "LOJISTA",
};

// Função para delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Função para fazer requisições à API do WooCommerce com retry
async function wooCommerceRequest(endpoint: string, params: Record<string, any> = {}, retries = 3) {
  const url = new URL(`${process.env.WP_URL}/wp-json/wc/v3/${endpoint}`);
  
  // Adicionar parâmetros à URL
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value.toString());
  });

  // Adicionar autenticação
  const auth = Buffer.from(`${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`).toString('base64');

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 503 && attempt < retries) {
          console.log(`⚠️ Servidor indisponível (503), tentativa ${attempt} de ${retries}. Aguardando 5 segundos...`);
          await delay(5000); // Espera 5 segundos antes de tentar novamente
          continue;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (attempt === retries) throw error;
      console.log(`⚠️ Erro na tentativa ${attempt}, tentando novamente em 5 segundos...`);
      await delay(5000);
    }
  }
}

async function importUsers() {
  console.log("🔄 Iniciando importação de usuários...");
  let page = 1;
  const perPage = 100;
  let totalImported = 0;

  try {
    while (true) {
      console.log(`📃 Buscando página ${page} de usuários...`);
      const users = await wooCommerceRequest("customers", {
        per_page: perPage,
        page: page,
      }) as WPUser[];

      if (!users.length) {
        break;
      }

      for (const user of users) {
        try {
          // Determinar a role do usuário
          let role = roleMapping[user.role] || "CLIENTE";

          // Preparar os dados do usuário
          const baseUserData = {
            username: user.username,
            email: user.email,
            password: "", // Será necessário um processo de redefinição de senha
            role: role,
            wpUserId: user.id,
            wpUsername: user.username,
            wpEmail: user.email,
            wpRole: user.role,
            wpFirstName: user.first_name,
            wpLastName: user.last_name,
            status: user.status === "active" ? "active" : "inactive",
          };

          // Verificar se o usuário já existe
          const existingUser = await prisma.cliente.findUnique({
            where: { email: user.email },
          });

          if (role === "LOJISTA") {
            // Processar lojista
            const lojistaData = {
              ...baseUserData,
              lojistaCommission: 0,
              corporateName: `${user.first_name} ${user.last_name}`.trim(),
              address: user.billing?.address_1 || "",
              city: user.billing?.city || "",
              state: user.billing?.state || "",
              number: user.billing?.address_2 || "",
              neighborhood: "",
              cpfCnpj: user.billing?.company || "",
              photo: user.avatar_url || "",
              description: user.description || "",
              facebook: user.meta_data?.find((m: WPMetaData) => m.key === "_fb_profile")?.value || "",
              instagram: user.meta_data?.find((m: WPMetaData) => m.key === "_instagram")?.value || "",
              youtube: user.meta_data?.find((m: WPMetaData) => m.key === "_youtube")?.value || "",
              wpVendorId: user.id,
              wpStoreSlug: user.username,
              wpStorePhone: user.billing?.phone || "",
              wpStorePolicies: user.meta_data?.find((m: WPMetaData) => m.key === "_wcfm_policy")?.value ? 
                Prisma.JsonNull : Prisma.JsonNull,
              wpMetadata: JSON.stringify(user),
            };

            if (existingUser) {
              await prisma.lojista.update({
                where: { email: user.email },
                data: lojistaData,
              });
              console.log(`📝 Lojista atualizado: ${user.email}`);
            } else {
              await prisma.lojista.create({
                data: lojistaData,
              });
              console.log(`✨ Novo lojista criado: ${user.email}`);
            }
          } else if (role === "ADMIN") {
            // Processar admin
            const adminData = {
              ...baseUserData,
              adminCommission: 0,
              wpMetadata: JSON.stringify(user),
            };

            if (existingUser) {
              await prisma.admin.update({
                where: { email: user.email },
                data: adminData,
              });
              console.log(`📝 Admin atualizado: ${user.email}`);
            } else {
              await prisma.admin.create({
                data: adminData,
              });
              console.log(`✨ Novo admin criado: ${user.email}`);
            }
          } else {
            // Processar cliente
            const clienteData = {
              ...baseUserData,
              wpBillingAddress: JSON.stringify(user.billing || null),
              wpShippingAddress: JSON.stringify(user.shipping || null),
              wpMetadata: JSON.stringify(user),
            };

            if (existingUser) {
              await prisma.cliente.update({
                where: { email: user.email },
                data: clienteData,
              });
              console.log(`📝 Cliente atualizado: ${user.email}`);
            } else {
              await prisma.cliente.create({
                data: clienteData,
              });
              console.log(`✨ Novo cliente criado: ${user.email}`);
            }
          }

          totalImported++;
        } catch (error) {
          console.error(`❌ Erro ao processar usuário ${user.email}:`, error);
        }
      }

      // Aguarda 1 segundo entre as páginas para não sobrecarregar o servidor
      await delay(1000);
      page++;
    }

    console.log(`✅ Importação concluída! Total de usuários processados: ${totalImported}`);
  } catch (error) {
    console.error("❌ Erro durante a importação:", error);
  }
}

async function main() {
  try {
    console.log("🚀 Iniciando importação do WordPress...");
    await importUsers();
    console.log("✅ Importação concluída com sucesso!");
  } catch (error) {
    console.error("❌ Erro durante a importação:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
