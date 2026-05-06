import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailContent = `
New Contact Form Submission
---------------------------

Name: ${body.name}
Email: ${body.email}
Phone: ${body.phone || 'Not provided'}
Subject: ${body.subject}

Message:
${body.message}

---------------------------
Submission Time: ${new Date().toLocaleString('en-US', { timeZone: 'America/Denver' })}
IP: ${request.headers.get('x-forwarded-for') || 'Unknown'}
`;

    // Try to send via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const result = await resend.emails.send({
          from: 'noreply@battlegaming.store',
          to: 'digizaro.co@gmail.com',
          replyTo: body.email,
          subject: `[BattleGaming Contact] ${body.subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #FF7828;">New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${body.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${body.email}">${body.email}</a></p>
              <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
              <p><strong>Subject:</strong> <span style="background: #f0f0f0; padding: 4px 8px; border-radius: 4px;">${body.subject}</span></p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <h3>Message:</h3>
              <p>${body.message.replace(/\n/g, '<br />')}</p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p style="color: #888; font-size: 12px;">
                <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/Denver' })}<br>
                <strong>IP Address:</strong> ${request.headers.get('x-forwarded-for') || 'Unknown'}
              </p>
            </div>
          `,
        });

        if (result.error) {
          console.error('Resend error:', result.error);
          throw new Error(`Resend error: ${result.error.message}`);
        }

        console.log('✅ Email sent via Resend:', result.data?.id);

        return NextResponse.json(
          { 
            message: 'Contact form submitted successfully! We will respond to you shortly.',
            id: result.data?.id,
            success: true 
          },
          { status: 200 }
        );
      } catch (resendError) {
        console.error('❌ Resend sending failed:', resendError);
        // Continue to fallback below
      }
    }

    // Fallback: Log to console
    console.log('📧 Contact form submission (fallback):\n', emailContent);

    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully. We will respond to you shortly.',
        success: true,
        note: 'Note: Email delivery is pending - please ensure RESEND_API_KEY is configured'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
