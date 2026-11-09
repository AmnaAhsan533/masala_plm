
import StageStatusBadge from "./StageStatusBadge";
import ApprovalPanel from "./ApprovalPanel";
import DepartmentAssignments from "./DepartmentAssignments";
import DeliverablesChecklist from "./DeliverablesChecklist";
import ActivityHistory from "./ActivityHistory";

import {
  Play,
  CheckCircle2,
  LockKeyhole,
} from "lucide-react";

function StageDetails({
  stage,
  project,
  onApprove,
  onReject,
  onComplete,
  onToggleDeliverable,
  onAssignDepartment,
}) {
  if (!stage) return null;

  const stageData = project.stageData?.[stage.id] || {};

  const completedDeliverables =
    stageData.completedDeliverables || [];

  const assignments = stageData.assignments || {};

  const approval = stageData.approval || {
    status: "Pending",
  };

  const activities = stageData.activities || [];

  const isCompleted =
    project.status === "Completed" ||
    stage.id < project.currentStage;

  const isCurrent =
    project.status !== "Completed" &&
    stage.id === project.currentStage;

  const isPending = !isCompleted && !isCurrent;

  const allDeliverablesCompleted =
    stage.deliverables.every((item) =>
      completedDeliverables.includes(item)
    );

  const canComplete =
    isCurrent &&
    allDeliverablesCompleted &&
    (
      !stage.approvalRequired ||
      approval.status === "Approved"
    );

  const displayStatus = isCompleted
    ? "Completed"
    : isCurrent && stage.approvalRequired &&
      approval.status !== "Approved"
    ? "Pending Approval"
    : isCurrent
    ? "In Progress"
    : "Pending";

  return (
    <section className="space-y-6">

      {/* Stage Header */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Stage {stage.id} of 11
            </p>

            <h2 className="mt-2 text-xl font-bold text-gray-900">
              {stage.title}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {stage.subtitle}
            </p>
          </div>

          <StageStatusBadge status={displayStatus} />

        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-800">
            Stage Overview
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {stage.description}
          </p>
        </div>

      </div>


      {/* Department Assignments */}
      <DepartmentAssignments
        departments={stage.departments}
        assignments={assignments}
        onAssign={(department, employeeId) =>
          onAssignDepartment(department, employeeId)
        }
        disabled={!isCurrent}
      />


      {/* Deliverables */}
      <DeliverablesChecklist
        deliverables={stage.deliverables}
        completed={completedDeliverables}
        onToggle={onToggleDeliverable}
        disabled={!isCurrent}
      />


      {/* Approval */}
      {stage.approvalRequired && (
        <ApprovalPanel
          stage={stage}
          approval={approval}
          onApprove={onApprove}
          onReject={onReject}
          disabled={!isCurrent || isCompleted}
        />
      )}


      {/* Activity History */}
      <ActivityHistory activities={activities} />


      {/* Stage Completion */}
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h3 className="text-sm font-semibold text-gray-900">
            Stage Completion
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            {isCompleted
              ? "This stage has been completed."
              : isPending
              ? "Complete previous stages to unlock this stage."
              : !allDeliverablesCompleted
              ? "Complete all required deliverables first."
              : stage.approvalRequired &&
                approval.status !== "Approved"
              ? "Approval is required before completing this stage."
              : "All requirements are fulfilled. You can complete this stage."}
          </p>

        </div>

        {isCurrent && (

          <button
            onClick={onComplete}
            disabled={!canComplete}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {stage.id === 11 ? (
              <>
                <CheckCircle2 size={17} />
                Complete Project
              </>
            ) : (
              <>
                <Play size={16} />
                Complete Stage
              </>
            )}
          </button>

        )}

        {isPending && (
          <span className="inline-flex items-center gap-2 text-xs text-gray-400">
            <LockKeyhole size={14} />
            Stage Locked
          </span>
        )}

        {isCompleted && (
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-green-600">
            <CheckCircle2 size={16} />
            Completed
          </span>
        )}

      </div>

    </section>
  );
}

export default StageDetails;
