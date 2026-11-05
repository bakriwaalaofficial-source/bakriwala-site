import { NextResponse } from 'next/server';
import { saveQuery } from '@/lib/storage';
import { sendQueryNotificationEmail, MailResult } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, state, queryType, message } = body;

    // Basic validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Full name is required.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { success: false, error: 'Message or inquiry details are required.' },
        { status: 400 }
      );
    }

    // 1. Attempt sending email notification
    let mailResult: MailResult = { sent: false, error: 'Not attempted', provider: 'none' };
    try {
      mailResult = await sendQueryNotificationEmail({
        name: name.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : undefined,
        state: state ? state.trim() : '',
        queryType: queryType || 'other',
        message: message.trim(),
      });
    } catch (mailErr: any) {
      console.error('[API /api/contact] Email notification error:', mailErr);
      mailResult = { sent: false, error: mailErr?.message, provider: 'error' };
    }

    // 2. Persist query safely to storage
    const savedRecord = await saveQuery({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      state: state ? state.trim() : '',
      queryType: queryType || 'other',
      message: message.trim(),
      emailSent: mailResult.sent,
      emailError: mailResult.error || null,
    });

    return NextResponse.json({
      success: true,
      message: 'Your query has been submitted successfully to BakriWala Official!',
      queryId: savedRecord.id,
      emailSent: mailResult.sent,
      emailRecipient: 'bakriwaalaofficial@gmail.com',
      ...(mailResult.error && !mailResult.sent ? { warning: mailResult.error } : {}),
    });
  } catch (error: any) {
    console.error('[API /api/contact] Internal error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry. Please try again or WhatsApp us.' },
      { status: 500 }
    );
  }
}
