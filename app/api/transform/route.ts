import { NextRequest, NextResponse } from "next/server";
import { generateWithOllama } from "../../lib/ollama";

/**
 * POST /api/transform
 * Transforms a draft tweet using Ollama LLM
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { draft } = body;

    // Validate input
    if (!draft || typeof draft !== "string") {
      return NextResponse.json(
        { error: "Invalid request: 'draft' must be a non-empty string" },
        { status: 400 }
      );
    }

    // Build prompt for tweet transformation
    const prompt = `You are a tweet formatter. Transform the following draft into a cleaner, more engaging, and well-formatted tweet. Keep it under 280 characters. Return ONLY the improved tweet, nothing else.

Draft: ${draft}

Improved tweet:`;

    // Generate transformed tweet using Ollama
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
