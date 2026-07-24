"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export interface SortOption {
  label: string;
  value: string;
}

interface SortDropdownProps {
  options: SortOption[];
  value: string | null;
  onChange: (value: string) => void;
}

export default function SortDropdown({
  options,
  value,
  onChange,
}: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex min-w-40 items-center justify-between gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700"
      >
        {selectedLabel ?? "Sort by"}
        <FiChevronDown size={16} className={open ? "rotate-180" : ""} />
      </button>

      {open && (
        <ul className="absolute right-0 z-10 mt-2 w-48 overflow-hidden rounded-lg border border-neutral-100 bg-white py-1 shadow-lg">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-neutral-50 ${
                  value === option.value
                    ? "font-semibold text-brand-pink"
                    : "text-neutral-700"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
