
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  UserRound,
  Building2,
  Flag,
  FlaskConical,
} from "lucide-react";

// Context
import { useProjects } from "../../context/ProjectContext";

// Data
import { workflowStages } from "../../data/workflowStages";

// Project Components
import ProjectStatusBadge from "../../components/projects/ProjectStatusBadge";
import ProjectProgress from "../../components/projects/ProjectProgress";

// Workflow Components
import WorkflowTimeline from "../../components/workflow/WorkflowTimeline";
import StageDetails from "../../components/workflow/StageDetails";

function ProjectDetails() {
  // ==========================================
  // 1. PROJECT DATA
  // ==========================================

  const { projectId } = useParams();

  const { getProjectById, updateProject } = useProjects();

  const project = getProjectById(projectId);

  // ==========================================
  // 2. WORKFLOW STATE
  // ==========================================

  const [selectedStage, setSelectedStage] = useState(
    project?.currentStage || 1
  );

  // Sync selected stage when navigating to another project
  useEffect(() => {
    setSelectedStage(project?.currentStage || 1);
  }, [projectId]);

  const activeStage = workflowStages.find(
    (stage) => stage.id === selectedStage
  );

  // ==========================================
  // 3. UPDATE STAGE DATA + ACTIVITY
  // ==========================================

  const saveStageUpdate = (
    stageId,
    updates,
    action,
    remarks = ""
  ) => {
    if (!project) return;

    const existing = project.stageData?.[stageId] || {};

    const activity = {
      id: `${Date.now()}-${Math.random()}`,
      action,
      user: "Admin",
      remarks,
      date: new Date().toLocaleString(),
    };

    updateProject(project.id, {
      stageData: {
        ...project.stageData,

        [stageId]: {
          ...existing,
          ...updates,

          activities: [
            activity,
            ...(existing.activities || []),
          ],
        },
      },
    });
  };

  // ==========================================
  // 4. DEPARTMENT ASSIGNMENT
  // ==========================================

  const handleAssignDepartment = (
    department,
    employeeId
  ) => {
    if (selectedStage !== project.currentStage) return;

    const existing =
      project.stageData?.[selectedStage] || {};

    saveStageUpdate(
      selectedStage,
      {
        assignments: {
          ...existing.assignments,
          [department]: employeeId,
        },
      },
      `${department} assignment updated`
    );
  };

  // ==========================================
  // 5. DELIVERABLE CHECKLIST
  // ==========================================

  const handleToggleDeliverable = (deliverable) => {
    if (selectedStage !== project.currentStage) return;

    const existing =
      project.stageData?.[selectedStage] || {};

    const completed =
      existing.completedDeliverables || [];

    const isCompleted = completed.includes(deliverable);

    const updated = isCompleted
      ? completed.filter((item) => item !== deliverable)
      : [...completed, deliverable];

    // Changing deliverables invalidates an existing approval.
    const approvalUpdate =
      existing.approval?.status === "Approved"
        ? {
            approval: {
              status: "Pending",
              approver: "",
              remarks: "Approval reset because deliverables changed.",
              date: "",
            },
          }
        : {};

    saveStageUpdate(
      selectedStage,
      {
        completedDeliverables: updated,
        ...approvalUpdate,
      },
      isCompleted
        ? "Deliverable marked as pending"
        : "Deliverable completed",
      deliverable
    );
  };

  // ==========================================
  // 6. APPROVE STAGE
  // ==========================================

  const handleApprove = (approver, remarks) => {
    if (selectedStage !== project.currentStage) return;

    if (!remarks.trim()) {
      alert("Please enter approval remarks.");
      return;
    }

    saveStageUpdate(
      selectedStage,
      {
        approval: {
          status: "Approved",
          approver,
          remarks,
          date: new Date().toLocaleString(),
        },
      },
      "Stage approved",
      remarks
    );
  };

  // ==========================================
  // 7. REJECT STAGE
  // ==========================================

  const handleReject = (approver, remarks) => {
    if (selectedStage !== project.currentStage) return;

    if (!remarks.trim()) {
      alert("Please enter rejection remarks.");
      return;
    }

    saveStageUpdate(
      selectedStage,
      {
        approval: {
          status: "Rejected",
          approver,
          remarks,
          date: new Date().toLocaleString(),
        },
      },
      "Stage rejected",
      remarks
    );
  };

  // ==========================================
  // 8. COMPLETE STAGE
  // ==========================================

  const handleCompleteStage = () => {
    if (!project || !activeStage) return;

    if (selectedStage !== project.currentStage) return;

    const stageData =
      project.stageData?.[selectedStage] || {};

    const completed =
      stageData.completedDeliverables || [];

    const deliverables =
      activeStage.deliverables || [];

    const allCompleted = deliverables.every(
      (item) => completed.includes(item)
    );

    if (!allCompleted) {
      alert("Please complete all required deliverables.");
      return;
    }

    if (
      activeStage.approvalRequired &&
      stageData.approval?.status !== "Approved"
    ) {
      alert("This stage requires approval before completion.");
      return;
    }

    // Final stage
    if (selectedStage === 11) {
      updateProject(project.id, {
        status: "Completed",
        currentStage: 11,
        progress: 100,
      });

      alert("Congratulations! Project completed.");

      return;
    }

    // Move to next stage
    const nextStage = selectedStage + 1;

    updateProject(project.id, {
      currentStage: nextStage,
      progress: Math.round((selectedStage / 11) * 100),
      status: "In Progress",
    });

    setSelectedStage(nextStage);
  };

  // ==========================================
  // 9. PROJECT NOT FOUND
  // ==========================================

  if (!project) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">

        <h2 className="text-xl font-semibold text-gray-800">
          Project Not Found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          The requested project does not exist.
        </p>

        <Link
          to="/projects"
          className="mt-5 inline-block text-sm font-semibold text-orange-600"
        >
          Back to Projects
        </Link>

      </div>
    );
  }

  // ==========================================
  // 10. PROJECT INFORMATION
  // ==========================================

  const details = [
    {
      label: "Project Lead",
      value: project.projectLead,
      icon: UserRound,
    },
    {
      label: "Category",
      value: project.category,
      icon: FlaskConical,
    },
    {
      label: "Priority",
      value: project.priority,
      icon: Flag,
    },
    {
      label: "Target Launch",
      value: project.targetLaunchDate || "Not specified",
      icon: CalendarDays,
    },
  ];

  // ==========================================
  // 11. MAIN UI
  // ==========================================

  return (
    <div className="space-y-6">

      {/* Back Navigation */}

      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </Link>

      {/* Project Header */}

      <div className="rounded-xl border border-gray-200 bg-white p-6">

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <h1 className="text-2xl font-bold text-gray-900">
                {project.productName}
              </h1>

              <ProjectStatusBadge status={project.status} />

            </div>

            <p className="mt-2 text-sm text-gray-400">
              {project.id} · {project.productType}
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600">
              {project.description ||
                "No project description provided."}
            </p>

          </div>

          <div className="rounded-lg bg-orange-50 p-3">
            <Building2 className="text-orange-600" size={25} />
          </div>

        </div>

      </div>

      {/* Project Information Cards */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {details.map((detail) => {
          const Icon = detail.icon;

          return (
            <div
              key={detail.label}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >

              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-gray-100 p-2">
                  <Icon size={19} className="text-gray-600" />
                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    {detail.label}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {detail.value || "Not specified"}
                  </p>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* Project Progress */}

      <div className="rounded-xl border border-gray-200 bg-white p-6">

        <h2 className="font-semibold text-gray-900">
          Project Progress
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Current development progress.
        </p>

        <div className="mt-5 max-w-xl">
          <ProjectProgress
            progress={project.progress || 0}
          />
        </div>

        <p className="mt-3 text-sm text-gray-500">
          {project.status === "Completed"
            ? "All 11 development stages completed."
            : `Currently at Stage ${project.currentStage || 1} of 11.`}
        </p>

      </div>

      {/* Participating Departments */}

      <div className="rounded-xl border border-gray-200 bg-white p-6">

        <h2 className="font-semibold text-gray-900">
          Participating Departments
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">

          {(project.departments || []).map((department) => (
            <span
              key={department}
              className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700"
            >
              {department}
            </span>
          ))}

        </div>

      </div>

      {/* ======================================
          PRODUCT DEVELOPMENT WORKFLOW
      ====================================== */}

      <div className="space-y-6">

        {/* 11 Stage Timeline */}

        <WorkflowTimeline
          project={project}
          selectedStage={selectedStage}
          onSelectStage={setSelectedStage}
        />

        {/* Stage Details and Management */}

        <StageDetails
          stage={activeStage}
          project={project}
          onApprove={handleApprove}
          onReject={handleReject}
          onComplete={handleCompleteStage}
          onToggleDeliverable={handleToggleDeliverable}
          onAssignDepartment={handleAssignDepartment}
        />

      </div>

    </div>
  );
}

export default ProjectDetails;
