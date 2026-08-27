import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'No valid message provided.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'GEMINI_API_KEY environment variable is missing.' },
        { status: 500 }
      );
    }

    const systemPrompt = `You are GoatCare AI, an expert farming assistant and guide in India for BakriWala. Keep your answers concise, practical, encouraging, and highly accurate for goat farmers.`;

    const fullPrompt = `${systemPrompt}\nUser Question: ${message}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

    const aiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: fullPrompt }],
          },
        ],
      }),
    });

    const aiData = await aiRes.json();

    if (!aiRes.ok || aiData.error) {
      console.error('Gemini API Error:', aiData.error);
      return NextResponse.json(
        {
          success: false,
          error: aiData.error?.message || 'Failed to get response from Gemini AI.',
        },
        { status: 500 }
      );
    }

    const replyText =
      aiData.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Sorry, I could not process your request at the moment.';

    return NextResponse.json({ success: true, reply: replyText });
  } catch (error: any) {
    console.error('Chat Route Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}
