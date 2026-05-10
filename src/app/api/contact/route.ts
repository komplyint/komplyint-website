import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const { name = '', email = '', message = '' } = await request.json()

    const cleanName = String(name).trim().slice(0, 120)
    const cleanEmail = String(email).trim().slice(0, 200)
    const cleanMessage = String(message).trim().slice(0, 5000)

    if (!cleanEmail || !cleanMessage || !isValidEmail(cleanEmail)) {
      return NextResponse.json(
        { error: 'A valid email and message are required' },
        { status: 400 }
      )
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('SMTP configuration missing')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    const recipient = process.env.CONTACT_TO_EMAIL || 'komplyint@komplyint.com'
    const safeName = escapeHtml(cleanName || 'Not provided')
    const safeEmail = escapeHtml(cleanEmail)
    const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, '<br>')

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: recipient,
      replyTo: cleanEmail,
      subject: `Website inquiry: ${cleanName || 'No name provided'}`,
      text: `Name: ${cleanName || 'Not provided'}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
      html: `
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
