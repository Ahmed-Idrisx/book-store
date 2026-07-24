"use client";

import { FiEdit3 } from "react-icons/fi";

interface OrderNoteProps {
  note: string;
  setNote: (value: string) => void;
}

const OrderNote = ({ note, setNote }: OrderNoteProps) => {
  return (
    <div className="rounded-xl bg-white p-6 sm:p-8">
      <h2 className="mb-6 text-lg font-bold text-neutral-900">Note</h2>
      <div className="flex items-start gap-2 rounded-lg border border-neutral-200 px-4 py-3.5">
        <FiEdit3 size={16} className="mt-0.5 shrink-0 text-neutral-400" />
        <textarea
          placeholder="Add note"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-neutral-400"
        />
      </div>
    </div>
  );
};

export default OrderNote;
