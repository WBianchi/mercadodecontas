import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: 'E-mail é obrigatório' },
        { status: 400 }
      );
    }

    // Verificar se o email existe em alguma das tabelas de usuários
    const admin = await prisma.admin.findFirst({
      where: { email }
    });

    const cliente = await prisma.cliente.findFirst({
      where: { email }
    });

    const lojista = await prisma.lojista.findFirst({
      where: { email }
    });

    if (!admin && !cliente && !lojista) {
      return NextResponse.json(
        { message: 'E-mail não encontrado em nossa base de dados' },
        { status: 404 }
      );
    }

    // Registrar a solicitação de exclusão (em uma situação real, você pode criar uma tabela no banco para isso)
    console.log(`Solicitação de exclusão para o e-mail: ${email}`);

    // Enviar e-mail para o usuário confirmando a solicitação
    await sendEmail({
      to: email,
      subject: 'Confirmação de Solicitação de Exclusão de Dados',
      text: `
        Olá,

        Recebemos sua solicitação para excluir seus dados do Mercado de Contas.
        
        Nossa equipe processará sua solicitação em até 30 dias, conforme exigido pela Lei Geral de Proteção de Dados (LGPD).
        
        Se tiver alguma dúvida, responda a este e-mail.
        
        Atenciosamente,
        Equipe Mercado de Contas
      `
    });

    // Enviar e-mail para a equipe interna (opcional)
    await sendEmail({
      to: process.env.SMTP_USER || 'admin@mercadodecontas.com.br',
      subject: 'Nova Solicitação de Exclusão de Dados',
      text: `
        Nova solicitação de exclusão de dados:
        
        E-mail: ${email}
        Data: ${new Date().toISOString()}
        
        Por favor, processe esta solicitação de acordo com nossa política de exclusão de dados.
      `
    });

    return NextResponse.json({
      message: 'Solicitação de exclusão recebida com sucesso'
    });
  } catch (error) {
    console.error('Erro ao processar solicitação de exclusão:', error);
    return NextResponse.json(
      { message: 'Erro ao processar solicitação' },
      { status: 500 }
    );
  }
}
