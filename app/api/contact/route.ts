import { NextRequest, NextResponse } from 'next/server';

// Resend is optional - you can use EmailJS alternatively
// For now, we'll use a simple implementation that logs the email

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

    // Try to send via Resend if API key exists
    if (process.env.RESEND_API_KEY) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'noreply@battlegaming.store',
            to: 'digizaro.co@gmail.com',
            replyTo: body.email,
            subject: `[BattleGaming Contact] ${body.subject}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${body.name}</p>
              <p><strong>Email:</strong> ${body.email}</p>
              <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
              <p><strong>Subject:</strong> ${body.subject}</p>
              <hr />
              <p><strong>Message:</strong></p>
              <p>${body.message.replace(/\n/g, '<br />')}</p>
              <hr />
              <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
            `,
          }),
        });

        if (!resendResponse.ok) {
          console.error('Resend API error:', await resendResponse.text());
          throw new Error('Failed to send email via Resend');
        }

        const data = await resendResponse.json();
        console.log('Email sent via Resend:', data);

        return NextResponse.json(
          { message: 'Contact form submitted successfully', id: data.id },
          { status: 200 }
        );
      } catch (resendError) {
        console.error('Resend error:', resendError);
        // Fallback: log to console (in production, you'd want a backup email service)
        console.log('Contact form fallback logging:', emailContent);
      }
    }

    // Fallback: Log to console and send success response
    console.log('Contact form submission (fallback logging):', emailContent);

    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully. We will respond to you shortly.',
        success: true 
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
