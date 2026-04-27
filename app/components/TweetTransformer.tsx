"use client";

import { useState } from "react";
import { FilterButton, FilterPanel, type Filters } from "./FilterOptions";

export function TweetTransformer() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({ maxChars: 280, emojiMode: "none" });
  const characterCount = input.length;
  const maxCharacters = 280;

  const handleTransform = async () => {
    if (!input.trim()) return;

    setError(null);
    setResult(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/transform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ draft: input, filters }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Transformation failed");
      }

      setResult(data.transformed);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Transformation failed";
      setError(errorMessage);
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
          <FilterButton isOpen={filtersOpen} onToggle={() => setFiltersOpen(!filtersOpen)} filters={filters} />
          <div className="flex items-center gap-3">
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
        {filtersOpen && <FilterPanel filters={filters} onFiltersChange={setFilters} />}
        {error && (
          <p className="mt-3 text-xs text-red-400">{error}</p>
        )}
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
