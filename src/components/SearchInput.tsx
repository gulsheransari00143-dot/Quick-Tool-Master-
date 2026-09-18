"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchInput({ onSearch }: { onSearch?: (value: string) => void }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const update = (next: string) => { setValue(next); onSearch?.(next); };

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.querySelector<HTMLInputElement>('[aria-label="Search tools"]')?.focus();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const query = value.trim();
    router.push(query ? `/tools?q=${encodeURIComponent(query)}` : "/tools");
  };

  return (
    <form className="search-input" onSubmit={submit} role="search">
      <span aria-hidden="true">⌕</span>
      <input value={value} onChange={(event) => update(event.target.value)} placeholder="Search tools..." aria-label="Search tools" />
      <kbd>⌘ K</kbd>
    </form>
  );
}
