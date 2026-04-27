"use client";

import { User, ChevronDown } from "lucide-react";

const CONTEXT_STORAGE_KEY = "TweetSmith-context";

interface ContextButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  hasContext: boolean;
}

interface ContextPanelProps {
  onContextChange: (context: string) => void;
}

export function ContextButton({ isOpen, onToggle, hasContext }: ContextButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="relative flex items-center gap-2 px-3 py-1.5 bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg text-xs text-[#888888] hover:text-[#fafafa] hover:border-[#3a3a3a] transition-colors"
    >
      <User className="h-3.5 w-3.5" />
      <span>Context</span>
      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      {hasContext && (
        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#fafafa]" />
      )}
    </button>
  );
}

export function ContextPanel({ onContextChange }: ContextPanelProps) {
  const loadContext = () => {
    return typeof window !== "undefined" ? localStorage.getItem(CONTEXT_STORAGE_KEY) || "" : "";
  };

  const handleContextChange = (value: string) => {
    localStorage.setItem(CONTEXT_STORAGE_KEY, value);
    onContextChange(value);
  };

  return (
    <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg p-3 mt-3">
      <label className="block text-xs text-[#888888] uppercase tracking-wider mb-2">
        Style / Tone Context
      </label>
      <textarea
        defaultValue={loadContext()}
        onChange={(e) => handleContextChange(e.target.value)}
        placeholder="Describe your preferred style, tone, or audience..."
        rows={2}
        className="w-full bg-[#1c1c1c] text-[#fafafa] placeholder-[#888888] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-[#3a3a3a] transition-colors"
      />
    </div>
  );
}
