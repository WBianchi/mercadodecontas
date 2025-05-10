export const MERCADOPAGO_CONFIG = {
  PUBLIC_KEY: process.env.MERCADOPAGO_PUBLIC_KEY || "APP_USR-774c9b19-627c-41e3-964b-c4b5417d69fc",
  CLIENT_ID: process.env.MERCADOPAGO_CLIENT_ID || "6587762469152592",
  CLIENT_SECRET: process.env.MERCADOPAGO_CLIENT_SECRET || "Ilk6xNfZbhIWIy5qakNhXT2iQLDFpUjd",
  ACCESS_TOKEN: process.env.MERCADOPAGO_ACCESS_TOKEN || "APP_USR-6587762469152592-022618-a7be1976c0e99c955e06e35cdb7b2d73-472593881", // Token obtido diretamente do MP
  BASE_URL: process.env.NEXT_PUBLIC_APP_URL || "https://mercadodecontas.com.br" // URL base da aplicação para notificações
};
