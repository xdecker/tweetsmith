"use client";

import { Ban, Smile, SmilePlus, SlidersHorizontal, ChevronDown } from "lucide-react";

export type Filters = {
  maxChars: number;
  emojiMode: "none" | "few" | "many";
};

interface FilterButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  filters: Filters;
}

interface FilterPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function FilterButton({ isOpen, onToggle, filters }: FilterButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-3 py-1.5 bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg text-xs text-[#888888] hover:text-[#fafafa] hover:border-[#3a3a3a] transition-colors"
    >
      <SlidersHorizontal className="h-3.5 w-3.5" />
      <span>Filters {filters.maxChars} · {filters.emojiMode}</span>
      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>
  );
}

export function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const handleMaxCharsChange = (value: number) => {
    onFiltersChange({ ...filters, maxChars: value });
  };

  const handleEmojiModeChange = (mode: "none" | "few" | "many") => {
    onFiltersChange({ ...filters, emojiMode: mode });
  };

  return (
    <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg p-3 mt-3">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-xs text-[#888888] uppercase tracking-wider">
            Max: {filters.maxChars}
          </label>
          <input
            type="range"
            min="100"
            max="280"
            step="20"
            value={filters.maxChars}
            onChange={(e) => handleMaxCharsChange(Number(e.target.value))}
            className="w-24 h-1 bg-[#2a2a2a] rounded-full appearance-none cursor-pointer accent-[#fafafa]"
          />
        </div>

        <div className="h-4 w-px bg-[#2a2a2a]" />

        <div className="flex items-center gap-1">
          <button
            onClick={() => handleEmojiModeChange("none")}
            className={`h-7 w-7 flex items-center justify-center rounded-md border transition-colors ${
              filters.emojiMode === "none"
                ? "bg-[#fafafa] border-[#fafafa] text-[#141414]"
                : "bg-transparent border-[#2a2a2a] text-[#888888] hover:border-[#3a3a3a] hover:text-[#fafafa]"
            }`}
          >
            <Ban className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => handleEmojiModeChange("few")}
            className={`h-7 w-7 flex items-center justify-center rounded-md border transition-colors ${
              filters.emojiMode === "few"
                ? "bg-[#fafafa] border-[#fafafa] text-[#141414]"
                : "bg-transparent border-[#2a2a2a] text-[#888888] hover:border-[#3a3a3a] hover:text-[#fafafa]"
            }`}
          >
            <Smile className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => handleEmojiModeChange("many")}
            className={`h-7 w-7 flex items-center justify-center rounded-md border transition-colors ${
              filters.emojiMode === "many"
                ? "bg-[#fafafa] border-[#fafafa] text-[#141414]"
                : "bg-transparent border-[#2a2a2a] text-[#888888] hover:border-[#3a3a3a] hover:text-[#fafafa]"
            }`}
          >
            <SmilePlus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
