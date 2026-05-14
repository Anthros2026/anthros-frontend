import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return Response.json(
      { error: "E-mail inválido." },
      { status: 400 }
    );
  }

  const { data, error } = await resend.emails.send({
    from: "Anthros <onboarding@resend.dev>",
    to: "contato@anthros.com.br",
    subject: "Novo contato - Agendar Conversa",
    text: `Olá,\n\nO contato ${email} está querendo agendar uma conversa com o nosso time.`,
  });

  if (error) {
    console.error("Resend error:", JSON.stringify(error));
    return Response.json(
      { error: "Falha ao enviar e-mail.", details: error },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}
