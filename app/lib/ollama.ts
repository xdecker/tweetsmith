// Ollama API helper for communicating with local LLM
// Ollama runs at http://localhost:11434

const OLLAMA_BASE_URL = "http://localhost:11434";
const OLLAMA_MODEL = "gemma3:4b";

/**
 * Request body for Ollama's /api/generate endpoint
 */
export interface OllamaRequest {
  model: string;
  prompt: string;
  stream: boolean;
}

/**
 * Response from Ollama's /api/generate endpoint
 */
export interface OllamaResponse {
  response: string;
  done: boolean;
}

/**
 * Generates text using a local Ollama LLM instance.
 * 
 * @param prompt - The text prompt to send to the model
 * @returns The generated response text as a string
 * @throws Error if the request fails or returns an error
 */
export async function generateWithOllama(prompt: string): Promise<string> {
  const requestBody: OllamaRequest = {
    model: OLLAMA_MODEL,
    prompt,
    stream: false, // Disable streaming for simpler synchronous-style response
  };

  const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`Ollama request failed with status ${response.status}`);
  }

  const data: OllamaResponse = await response.json();
  return data.response;
}
