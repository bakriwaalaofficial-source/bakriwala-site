import { NextResponse } from 'next/server';

const OPENROUTER_MODELS = [
  'nvidia/nemotron-3.5-lightning:free',
  'nex-agi/nex-n2.5-mini:free',
  'inclusionai/ling-3.0-flash-vl:free',
  'qwen/qwen3.8-27b:free',
  'poolside/laguna-s-2.1:free'
];

function cleanAiResponse(text: string): string {
  // Strip <think>...</think> tags if model outputs chain of thought
  let cleaned = text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  // Strip lines like "Here's a thinking process:" or similar chain of thought prefix
  cleaned = cleaned.replace(/^Here'?s a thinking process:[\s\S]*?\n\n/i, '').trim();
  return cleaned || text.trim();
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'No valid message provided.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'OPENROUTER_API_KEY environment variable is missing.' },
        { status: 500 }
      );
    }

    const systemPrompt = `You are GoatCare AI, an expert livestock and goat farming assistant and consultant in India for BakriWala.
Provide practical, actionable, and accurate advice for Indian goat farmers (e.g. breed selection like Barbari, Sirohi, Beetal; disease management like PPR, Enterotoxemia, Goat Pox; feed planning, green fodder, dry fodder, concentrates; shed layout; NABARD/NLM subsidy schemes).
Use bullet points, bold highlights, and numbered steps when helpful.
Do NOT output your internal reasoning or thinking process. Output only the final response for the user.`;

    let lastError = null;

    for (const model of OPENROUTER_MODELS) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://bakriwala.com',
            'X-Title': 'BakriWala Goat Farming'
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: message }
            ],
            temperature: 0.7,
            max_tokens: 1000
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        const data = await res.json();

        if (res.ok && data.choices && data.choices[0]?.message?.content) {
          const reply = cleanAiResponse(data.choices[0].message.content);
          return NextResponse.json({
            success: true,
            reply: reply,
            modelUsed: model
          });
        } else {
          lastError = data.error?.message || `Model ${model} returned status ${res.status}`;
          console.warn(`Model ${model} failed:`, lastError);
        }
      } catch (err: any) {
        lastError = err.message;
        console.warn(`Error calling model ${model}:`, err.message);
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: lastError || 'All AI models were temporarily busy. Please try again in a moment.'
      },
      { status: 502 }
    );
  } catch (error: any) {
    console.error('Chat Route Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}
