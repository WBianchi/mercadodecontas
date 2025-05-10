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
  first_name: string;
  last_name: string;
  email: string;
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
  avatar_url?: string;
  meta_data?: WPMetaData[];
  description?: string;
}

// Função para delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Função para fazer requisições à API do WooCommerce com retry
async function wooCommerceRequest(endpoint: string, params: Record<string, any> = {}, retries = 3) {
  // Gerar o timestamp OAuth
  const timestamp = Math.floor(Date.now() / 1000);
  
  // Construir a URL base
  const url = new URL(`${process.env.WP_URL}/wp-json/wc/v3/${endpoint}`);
  
  // Adicionar parâmetros à URL
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value.toString());
  });

  // Adicionar parâmetros de autenticação OAuth
  url.searchParams.append('consumer_key', process.env.WC_CONSUMER_KEY!);
  url.searchParams.append('consumer_secret', process.env.WC_CONSUMER_SECRET!);
  url.searchParams.append('oauth_timestamp', timestamp.toString());

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url.toString());

      if (!response.ok) {
        if (response.status === 503 && attempt < retries) {
          console.log(`⚠️ Servidor indisponível (503), tentativa ${attempt} de ${retries}. Aguardando 5 segundos...`);
          await delay(5000);
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

async function importVendors() {
  console.log("🔄 Iniciando importação de lojistas...");
  let page = 1;
  const perPage = 100;
  let totalImported = 0;

  try {
    while (true) {
      console.log(`📃 Buscando página ${page} de usuários...`);
      const users = await wooCommerceRequest("customers", {
        per_page: perPage,
        page: page,
        role: "wcfm_vendor"
      }) as WPUser[];

      if (!users.length) {
        break;
      }

      for (const user of users) {
        try {
          // Verificar se o usuário já existe
          const existingUser = await prisma.lojista.findUnique({
            where: { email: user.email },
          });

          // Processar políticas da loja
          const wcfmPolicy = user.meta_data?.find((m: WPMetaData) => m.key === "_wcfm_policy")?.value;
          const storePolicies = wcfmPolicy ? JSON.parse(wcfmPolicy) : null;

          const lojistaData = {
            username: user.username,
            email: user.email,
            password: "", // Será necessário um processo de redefinição de senha
            role: "LOJISTA" as Role,
            wpUserId: user.id,
            wpVendorId: user.id,
            wpStoreSlug: user.username,
            wpStorePhone: user.billing?.phone || "",
            wpStorePolicies: storePolicies ? storePolicies : Prisma.JsonNull,
            wpMetadata: user as any,
            status: "active",
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
            gallery: [],
            workingHours: []
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

          totalImported++;
        } catch (error) {
          console.error(`❌ Erro ao processar lojista ${user.email}:`, error);
        }
      }

      // Aguarda 1 segundo entre as páginas para não sobrecarregar o servidor
      await delay(1000);
      page++;
    }

    console.log(`✅ Importação concluída! Total de lojistas processados: ${totalImported}`);
  } catch (error) {
    console.error("❌ Erro durante a importação:", error);
  }
}

async function main() {
  try {
    console.log("🚀 Iniciando importação de lojistas do WordPress...");
    await importVendors();
    console.log("✅ Importação concluída com sucesso!");
  } catch (error) {
    console.error("❌ Erro durante a importação:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
