export default function Loading() {
  return (
    <div className="min-h-[50vh] grid place-items-center">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="card bg-base-100 shadow border border-base-300">
      <div className="skeleton h-48 w-full rounded-t-2xl rounded-b-none" />
      <div className="card-body gap-3">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-10 w-28 mt-2" />
      </div>
    </div>
  );
}
