import { TweetTransformer } from "./components/TweetTransformer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-[#fafafa] mb-1">TweetSmith</h1>
        <p className="text-sm text-[#888888]">Transform your drafts into polished tweets</p>
      </header>

      <main className="flex-1 flex flex-col items-center w-full">
        <TweetTransformer />
      </main>

      <footer className="mt-12 text-xs text-[#888888]">
        powered by ollama
      </footer>
    </div>
  );
}
