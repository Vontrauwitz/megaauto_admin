import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { to, subject, html } = req.body;

    // Configura el transporter de Nodemailer (esto es un ejemplo, ajusta según tu proveedor de correo)
    let transporter = nodemailer.createTransport({
      host: "smtp.example.com",
      port: 587,
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: process.env.EMAIL_USER, // usa variables de entorno
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      let info = await transporter.sendMail({
        from: '"Your Company" <noreply@yourcompany.com>',
        to,
        subject,
        html,
      });

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error sending email" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}