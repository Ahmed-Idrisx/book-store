import Stars from "@/components/ui/Stars";
import type { Review } from "@/features/books/api";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-bold uppercase text-neutral-500">
          {review.reviewerName.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-neutral-900">
            {review.reviewerName}
          </p>
          {review.date && (
            <p className="text-xs text-neutral-400">
              Reviewed on: {new Date(review.date).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      <div className="mb-2 flex items-center gap-2">
        <span className="text-sm font-bold text-neutral-900">
          {review.rating.toFixed(1)}
        </span>
        <Stars rating={review.rating} />
      </div>

      <p className="text-sm text-neutral-600">{review.text}</p>
    </div>
  );
}
