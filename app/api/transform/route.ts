import { NextRequest, NextResponse } from "next/server";
import { generateWithOllama } from "../../lib/ollama";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { draft, filters, context } = body;
    const { maxChars = 280, emojiMode = "few" } = filters || {};

    if (!draft || typeof draft !== "string") {
      return NextResponse.json(
        { error: "Invalid request: 'draft' must be a non-empty string" },
        { status: 400 }
      );
    }

    const emojiRule = emojiMode === "none"
      ? "- No emojis"
      : emojiMode === "few"
      ? "- Use 1-2 emojis sparingly"
      : emojiMode === "moderate"
      ? "- Use 2-3 emojis"
      : "- Use emojis freely";

    const strictLimits = `STRICT LIMITS:
- Maximum ${maxChars} characters (THIS IS MANDATORY)
${emojiRule}
- No hashtags`;

    const guidelines = `GUIDELINES:
- Lead with the most valuable/engaging part
- Sound human and conversational
- Make it punchy and scannable`;

    const styleNote = context ? `\nAuthor style: ${context}` : "";

    const prompt = `${strictLimits}

${guidelines}${styleNote}

Draft: ${draft}

Respond with ONLY the rewritten tweet. No quotes, no explanation.`;

    const transformed = await generateWithOllama(prompt);

    return NextResponse.json({ transformed });
  } catch (error) {
    console.error("Transform error:", error);
    return NextResponse.json(
      {
        error: "Failed to transform tweet. Make sure Ollama is running at localhost:11434",
      },
      { status: 500 }
    );
  }
}
