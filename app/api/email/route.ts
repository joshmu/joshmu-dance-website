import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email: from, // sender address
      name: subject, // Subject line
      message: text, // plain text body
    } = body

    console.log({ from, subject, text })
    const info = await sendEmail({ from, subject, text })
    
    return NextResponse.json({ msg: 'success', info }, { status: 200 })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

async function sendEmail({ from, subject, text }: { from: string; subject: string; text: string }) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.dreamhost.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mailItem = {
    from,
    to: 'mu@joshmu.com',
    subject: `✨DANCE CONTACT: ${subject}`,
    text,
    // if we don't specify html then lets create it from the plain text
    // html: `<pre>${text}</pre>`,
  }

  // send mail with defined transport object
  const info = await transporter.sendMail(mailItem)

  return info
}