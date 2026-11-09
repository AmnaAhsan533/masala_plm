
import { FileCheck, Circle, CheckCircle2 } from "lucide-react";

function DeliverablesChecklist({
  deliverables,
  completed = [],
  onToggle,
  disabled = false,
}) {
  const completedCount = deliverables.filter(
    (item) => completed.includes(item)
  ).length;

  const percentage = deliverables.length
    ? Math.round((completedCount / deliverables.length) * 100)
    : 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

        <div className="flex items-center gap-2">
          <FileCheck size={19} className="text-orange-600" />

          <div>
            <h3 className="font-semibold text-gray-900">
              Required Deliverables
            </h3>

            <p className="text-xs text-gray-400">
              Complete all mandatory documents.
            </p>
          </div>
        </div>

        <span className="text-sm font-semibold text-orange-600">
          {completedCount}/{deliverables.length} Completed
        </span>

      </div>

      {/* Progress */}
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-green-500 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Checklist */}
      <div className="mt-5 space-y-3">

        {deliverables.map((item) => {

          const isCompleted = completed.includes(item);

          return (
            <button
              key={item}
              type="button"
              disabled={disabled}
              onClick={() => onToggle(item)}
              className="flex w-full items-center gap-3 rounded-lg border border-gray-100 p-3 text-left transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
            >

              {isCompleted ? (
                <CheckCircle2
                  size={19}
                  className="shrink-0 text-green-600"
                />
              ) : (
                <Circle
                  size={19}
                  className="shrink-0 text-gray-300"
                />
              )}

              <span
                className={`text-sm ${
                  isCompleted
                    ? "text-gray-400 line-through"
                    : "text-gray-700"
                }`}
              >
                {item}
              </span>

              <span className="ml-auto text-xs text-gray-400">
                {isCompleted ? "Completed" : "Pending"}
              </span>

            </button>
          );
        })}

      </div>

    </div>
  );
}

export default DeliverablesChecklist;
