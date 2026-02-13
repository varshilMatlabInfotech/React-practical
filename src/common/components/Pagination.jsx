export default function Pagination({
  pageLabel,
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
  perPageOptions,
  perPageValue,
  onPerPageChange,
  onRefresh,
  refreshDisabled,
  refreshLabel = "Refresh",
  className =
    "mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
}) {
  const showPerPage =
    Array.isArray(perPageOptions) &&
    perPageOptions.length > 0 &&
    typeof onPerPageChange === "function";
  const showRefresh = typeof onRefresh === "function";

  return (
    <div className={className}>
      {showPerPage && (
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span>Show</span>
          <select
            value={perPageValue}
            onChange={onPerPageChange}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:border-blue-400 focus:outline-none"
          >
            {perPageOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <span>per page</span>
        </div>
      )}

      {pageLabel && (
        <span className="text-sm font-semibold text-slate-600">
          {pageLabel}
        </span>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={onPrev}
          disabled={prevDisabled}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Prev
        </button>

        <button
          onClick={onNext}
          disabled={nextDisabled}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>

        {showRefresh && (
          <button
            onClick={onRefresh}
            disabled={refreshDisabled}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {refreshLabel}
          </button>
        )}
      </div>
    </div>
  );
}

