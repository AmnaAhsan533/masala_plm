
import { Check, LockKeyhole, Clock } from "lucide-react";

import { workflowStages } from "../../data/workflowStages";
import StageStatusBadge from "./StageStatusBadge";

function getStageStatus(stageId, project) {
  if (project.status === "Completed") {
    return "Completed";
  }

  if (stageId < project.currentStage) {
    return "Completed";
  }

  if (stageId === project.currentStage) {
    return "In Progress";
  }

  return "Pending";
}

function WorkflowTimeline({
  project,
  selectedStage,
  onSelectStage,
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">

      {/* Heading */}
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Product Development Workflow
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Track all 11 stages of product development.
          </p>
        </div>

        <div className="text-sm font-semibold text-orange-600">
          Stage {project.currentStage} of 11
        </div>
      </div>

      {/* Timeline */}
      <div className="overflow-x-auto pb-4">
        <div className="flex min-w-max items-start">

          {workflowStages.map((stage, index) => {
            const status = getStageStatus(stage.id, project);

            const isSelected = selectedStage === stage.id;

            return (
              <div
                key={stage.id}
                className="flex w-40 flex-col items-center"
              >

                {/* Stage Circle and Connector */}
                <div className="flex w-full items-center">

                  {index > 0 && (
                    <div
                      className={`h-0.5 flex-1 ${
                        status === "Completed"
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  )}

                  <button
                    onClick={() => onSelectStage(stage.id)}
                    title={stage.title}
                    className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 font-bold transition ${
                      isSelected
                        ? "border-orange-600 bg-orange-600 text-white ring-4 ring-orange-100"
                        : status === "Completed"
                        ? "border-green-500 bg-green-500 text-white"
                        : status === "In Progress"
                        ? "border-orange-500 bg-orange-50 text-orange-600"
                        : "border-gray-200 bg-white text-gray-400"
                    }`}
                  >
                    {status === "Completed" ? (
                      <Check size={19} />
                    ) : (
                      stage.id
                    )}
                  </button>

                  {index < workflowStages.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 ${
                        status === "Completed"
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>

                {/* Stage Information */}
                <button
                  onClick={() => onSelectStage(stage.id)}
                  className={`mt-3 min-h-28 w-full rounded-lg border p-3 text-center transition ${
                    isSelected
                      ? "border-orange-300 bg-orange-50"
                      : "border-transparent hover:bg-gray-50"
                  }`}
                >
                  <p className="text-xs font-bold text-gray-800">
                    {stage.title}
                  </p>

                  <p className="mt-1 text-[11px] leading-4 text-gray-500">
                    {stage.subtitle}
                  </p>

                  <div className="mt-3 flex justify-center">
                    <StageStatusBadge status={status} />
                  </div>

                  {stage.approvalRequired && (
                    <div className="mt-2 flex items-center justify-center gap-1 text-[10px] font-semibold text-orange-600">
                      <LockKeyhole size={12} />
                      Approval Required
                    </div>
                  )}
                </button>
              </div>
            );
          })}

        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-5 border-t border-gray-100 pt-4">

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          Completed
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
          In Progress
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
          Pending
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <LockKeyhole size={13} className="text-orange-600" />
          Approval Stage
        </div>

      </div>
    </section>
  );
}

export default WorkflowTimeline;
