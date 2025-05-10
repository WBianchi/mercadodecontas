import { PrismaClient, Role } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

interface WPUser {
  id: number;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  roles: string[];
  avatar_urls: {
    [key: string]: string;
  };
  meta: any[];
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

async function importAdmins() {
  console.log("🔄 Iniciando importação de administradores...");
  let page = 1;
  const perPage = 100;
  let totalImported = 0;

  try {
    while (true) {
      console.log(`📃 Buscando página ${page} de usuários...`);
      const users = await wooCommerceRequest("customers", {
        per_page: perPage,
        page: page,
        role: "administrator"
      }) as WPUser[];

      if (!users.length) {
        break;
      }

      for (const user of users) {
        try {
          // Verificar se o usuário já existe
          const existingUser = await prisma.admin.findUnique({
            where: { email: user.email },
          });

          const adminData = {
            username: user.username,
            email: user.email,
            password: "", // Será necessário um processo de redefinição de senha
            role: "ADMIN" as Role,
            wpUserId: user.id,
            wpUsername: user.username,
            wpEmail: user.email,
            wpRole: "administrator",
            wpFirstName: user.first_name,
            wpLastName: user.last_name,
            status: "active",
            adminCommission: 0,
            wpMetadata: JSON.stringify({
              id: user.id,
              name: user.name,
              url: user.url,
              description: user.description,
              link: user.link,
              slug: user.slug,
              avatar_urls: user.avatar_urls,
              meta: user.meta
            }),
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

          totalImported++;
        } catch (error) {
          console.error(`❌ Erro ao processar administrador ${user.email}:`, error);
        }
      }

      // Aguarda 1 segundo entre as páginas para não sobrecarregar o servidor
      await delay(1000);
      page++;
    }

    console.log(`✅ Importação concluída! Total de administradores processados: ${totalImported}`);
  } catch (error) {
    console.error("❌ Erro durante a importação:", error);
  }
}

async function main() {
  try {
    console.log("🚀 Iniciando importação de administradores do WordPress...");
    await importAdmins();
    console.log("✅ Importação concluída com sucesso!");
  } catch (error) {
    console.error("❌ Erro durante a importação:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
