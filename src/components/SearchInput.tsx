"use client";

import { useState } from "react";

export default function SearchInput({ onSearch }: { onSearch?: (value: string) => void }) {
  const [value, setValue] = useState("");
  const update = (next: string) => { setValue(next); onSearch?.(next); };
  return (
    <label className="search-input">
      <span aria-hidden="true">⌕</span>
      <input value={value} onChange={(event) => update(event.target.value)} placeholder="Search tools..." aria-label="Search tools" />
      <kbd>⌘ K</kbd>
    </label>
  );
}
