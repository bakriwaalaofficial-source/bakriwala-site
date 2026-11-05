import nodemailer from 'nodemailer';

export interface SendMailParams {
  name: string;
  phone: string;
  email?: string;
  state?: string;
  queryType: string;
  message: string;
}

export interface MailResult {
  sent: boolean;
  messageId?: string;
  provider?: string;
  error?: string;
}

const QUERY_TYPE_LABELS: Record<string, string> = {
  training: 'Training Program Enrollment',
  expert: 'Expert & Health Advisory',
  breeds: 'Breed Stock Purchase Inquiry',
  dpr: 'NABARD / Bank Loan DPR Report',
  other: 'General Inquiry',
};

export async function sendQueryNotificationEmail(params: SendMailParams): Promise<MailResult> {
  const recipient =
    process.env.NOTIFICATION_EMAIL ||
    process.env.EMAIL_TO ||
    'bakriwaalaofficial@gmail.com';

  const user =
    process.env.EMAIL_USER ||
    process.env.SMTP_USER ||
    'bakriwaalaofficial@gmail.com';

  const pass =
    process.env.EMAIL_PASS ||
    process.env.SMTP_PASS ||
    process.env.GMAIL_APP_PASSWORD;

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 465;
  const isSecure = port === 465;

  const subjectLabel = QUERY_TYPE_LABELS[params.queryType] || params.queryType;

  // Indian Standard Time format
  const formattedDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const cleanPhone = params.phone.replace(/[^0-9]/g, '');
  const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const whatsappUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    `Namaste ${params.name}, this is BakriWala Official regarding your query about "${subjectLabel}". How can we help you today?`
  )}`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Query from BakriWala Official</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    
    <!-- Header Banner -->
    <div style="background: linear-gradient(135deg, #166534 0%, #15803d 100%); color: #ffffff; padding: 28px 24px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
        🐐 BakriWala Official
      </h1>
      <p style="margin: 6px 0 0; font-size: 14px; color: #bbf7d0; font-weight: 500;">
        New Farmer Inquiry Received from Website
      </p>
    </div>

    <!-- Main Content -->
    <div style="padding: 28px 24px;">
      
      <div style="margin-bottom: 20px;">
        <span style="display: inline-block; background-color: #dcfce7; color: #15803d; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; border: 1px solid #bbf7d0;">
          Category: ${subjectLabel}
        </span>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tbody>
          <tr>
            <td style="padding: 10px 12px; font-size: 13px; font-weight: 700; color: #64748b; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; width: 35%;">
              Farmer Name
            </td>
            <td style="padding: 10px 12px; font-size: 14px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
              ${params.name}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-size: 13px; font-weight: 700; color: #64748b; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              Mobile / WhatsApp
            </td>
            <td style="padding: 10px 12px; font-size: 14px; font-weight: 700; color: #15803d; border-bottom: 1px solid #e2e8f0;">
              <a href="tel:${params.phone}" style="color: #15803d; text-decoration: none;">${params.phone}</a>
            </td>
          </tr>
          ${
            params.email
              ? `
          <tr>
            <td style="padding: 10px 12px; font-size: 13px; font-weight: 700; color: #64748b; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              Email Address
            </td>
            <td style="padding: 10px 12px; font-size: 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
              <a href="mailto:${params.email}" style="color: #0284c7; text-decoration: none;">${params.email}</a>
            </td>
          </tr>`
              : ''
          }
          <tr>
            <td style="padding: 10px 12px; font-size: 13px; font-weight: 700; color: #64748b; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              State / District
            </td>
            <td style="padding: 10px 12px; font-size: 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
              ${params.state || 'Not specified'}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-size: 13px; font-weight: 700; color: #64748b; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              Submission Time
            </td>
            <td style="padding: 10px 12px; font-size: 13px; color: #475569; border-bottom: 1px solid #e2e8f0;">
              ${formattedDate} (IST)
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Farmer Message Box -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #16a34a; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
        <h3 style="margin: 0 0 10px 0; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #475569;">
          Farmer Question / Message:
        </h3>
        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">
${params.message}
        </p>
      </div>

      <!-- Quick Action Buttons -->
      <div style="text-align: center; padding: 12px 0;">
        <a href="${whatsappUrl}" target="_blank" style="display: inline-block; background-color: #22c55e; color: #ffffff !important; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 10px; text-decoration: none; margin: 6px;">
          💬 Reply on WhatsApp
        </a>
        <a href="tel:${params.phone}" style="display: inline-block; background-color: #0f172a; color: #ffffff !important; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 10px; text-decoration: none; margin: 6px;">
          📞 Call Farmer
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0 0 4px 0;">
        Sent automatically from the <strong>BakriWala Official Website</strong> Query Form.
      </p>
      <p style="margin: 0;">
        Recipient: <strong style="color: #0f172a;">${recipient}</strong>
      </p>
    </div>

  </div>
</body>
</html>
  `;

  const textContent = `
[BakriWala Official] New Farmer Query Received
----------------------------------------------
Category: ${subjectLabel}
Name: ${params.name}
Phone: ${params.phone}
Email: ${params.email || 'N/A'}
Location: ${params.state || 'N/A'}
Date: ${formattedDate} (IST)

Message:
${params.message}

WhatsApp: ${whatsappUrl}
  `.trim();

  // 1. Try Resend if RESEND_API_KEY is configured
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'BakriWala Official <onboarding@resend.dev>',
          to: [recipient],
          reply_to: params.email || undefined,
          subject: `🔔 [BakriWala Query] New message from ${params.name} (${subjectLabel})`,
          html: htmlContent,
          text: textContent,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        return { sent: true, provider: 'resend', messageId: data.id };
      }
      console.warn('[Mailer] Resend API failed, falling back:', data);
    } catch (resendErr: any) {
      console.warn('[Mailer] Resend error:', resendErr?.message);
    }
  }

  // 2. Try Nodemailer with SMTP
  if (pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: isSecure,
        auth: {
          user,
          pass,
        },
      });

      const info = await transporter.sendMail({
        from: `"BakriWala Official" <${user}>`,
        to: recipient,
        replyTo: params.email || undefined,
        subject: `🔔 [BakriWala Query] New message from ${params.name} (${subjectLabel})`,
        text: textContent,
        html: htmlContent,
      });

      return { sent: true, provider: 'smtp', messageId: info.messageId };
    } catch (smtpErr: any) {
      console.error('[Mailer] SMTP delivery failed:', smtpErr);
      return {
        sent: false,
        provider: 'smtp',
        error: smtpErr?.message || 'SMTP delivery failed',
      };
    }
  }

  // If no email provider credential configured
  return {
    sent: false,
    provider: 'none',
    error:
      'EMAIL_PASS / SMTP_PASS is not configured in .env.local. The query was saved to the admin dashboard database.',
  };
}
