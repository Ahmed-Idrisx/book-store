"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export interface FilterItem {
  id: string | number;
  label: string;
  value: string;
  count?: number;
}

interface FilterAccordionProps {
  title: string;
  items: FilterItem[];
  selected: string[];
  onChange: (values: string[]) => void;
  initialVisibleCount: number;
  defaultOpen?: boolean;
}

export default function FilterAccordion({
  title,
  items,
  selected,
  onChange,
  initialVisibleCount,
  defaultOpen = true,
}: FilterAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const toggleValue = (value: string) => {
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange(updated);
  };

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = items.length > visibleCount;

  return (
    <div className="mb-4 rounded-lg border border-neutral-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3.5 text-left font-bold text-pink-600"
      >
        {title}
        <FiChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="border-t border-neutral-100 px-4 py-3">
          {items.length === 0 ? (
            <p className="py-2 text-xs text-neutral-400">
              No options available
            </p>
          ) : (
            <>
              {visibleItems.map((item) => (
                <label
                  key={item.id}
                  className="mb-2 flex cursor-pointer items-center justify-between text-sm text-neutral-700"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(item.value)}
                      onChange={() => toggleValue(item.value)}
                      className="h-4 w-4 accent-brand-pink"
                    />
                    {item.label}
                  </span>
                  {typeof item.count === "number" && (
                    <span className="text-xs text-neutral-400">
                      ({item.count})
                    </span>
                  )}
                </label>
              ))}

              {hasMore && (
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                  className="mt-1 block w-full text-center text-xs font-semibold text-brand-pink hover:underline"
                >
                  Load More
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
