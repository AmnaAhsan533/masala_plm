function ProjectProgress({ progress }) {
  return (
    <div className="min-w-28">
      <div className="mb-1 flex justify-between text-xs">
        <span className="font-medium text-gray-700">
          {progress}%
        </span>
        <span className="text-gray-400">Complete</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-orange-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ProjectProgress;