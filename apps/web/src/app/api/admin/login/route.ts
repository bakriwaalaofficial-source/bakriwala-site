import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const validEmails = [
      (process.env.ADMIN_EMAIL || '').toLowerCase(),
      'admin@goatcare.ai',
      'bakriwaalaofficial@gmail.com',
      'admin@bakriwala.com',
    ].filter(Boolean);

    const validPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (validEmails.includes((email || '').toLowerCase().trim()) && password === validPassword) {
      // Mock session token
      const token = `admin_token_${Buffer.from(email + ':' + Date.now()).toString('base64')}`;
      return NextResponse.json({
        success: true,
        token,
        message: 'Admin authenticated successfully',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid admin credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Authentication processing error' },
      { status: 500 }
    );
  }
}
