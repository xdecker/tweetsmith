"use client";

import { useState } from "react";

export function TweetTransformer() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const characterCount = input.length;
  const maxCharacters = 280;

  const handleTransform = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    
    try {
      const response = await fetch("/api/transform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ draft: input }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Transformation failed");
      }

      setResult(data.transformed);
    } catch (error) {
      console.error("Transformation failed:", error);
      setResult("Error: Failed to transform. Make sure Ollama is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl p-5">
        <label className="block text-xs font-medium uppercase tracking-wider text-[#888888] mb-2">
          Draft Tweet
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your draft here..."
          rows={4}
          className="w-full bg-[#1c1c1c] text-[#fafafa] placeholder-[#888888] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-[#3a3a3a] transition-colors"
        />
        <div className="flex items-center justify-between mt-2">
          <span className={`text-xs ${characterCount > maxCharacters ? "text-red-400" : "text-[#888888]"}`}>
            {characterCount} / {maxCharacters}
          </span>
          <button
            onClick={handleTransform}
            disabled={!input.trim() || isLoading}
            className="px-4 py-1.5 bg-[#fafafa] text-[#141414] text-sm font-medium rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {isLoading ? "Transforming..." : "Transform"}
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-4 bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl p-5">
          <label className="block text-xs font-medium uppercase tracking-wider text-[#888888] mb-2">
            Result
          </label>
          <p className="text-sm text-[#fafafa] leading-relaxed">{result}</p>
        </div>
      )}
    </div>
  );
}
