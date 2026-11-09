
import { Clock, Activity } from "lucide-react";

function ActivityHistory({ activities = [] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">

      <div className="flex items-center gap-2">
        <Activity size={19} className="text-orange-600" />

        <div>
          <h3 className="font-semibold text-gray-900">
            Activity History
          </h3>

          <p className="text-xs text-gray-400">
            Recent updates for this stage.
          </p>
        </div>
      </div>

      <div className="mt-5">

        {activities.length === 0 ? (

          <p className="py-5 text-center text-sm text-gray-400">
            No activity recorded yet.
          </p>

        ) : (

          <div className="space-y-4">

            {activities.map((activity) => (

              <div
                key={activity.id}
                className="flex gap-3"
              >

                <div className="mt-1">
                  <div className="rounded-full bg-orange-50 p-2">
                    <Clock size={14} className="text-orange-600" />
                  </div>
                </div>

                <div className="flex-1 border-b border-gray-100 pb-4">

                  <p className="text-sm font-medium text-gray-800">
                    {activity.action}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    By {activity.user}
                  </p>

                  {activity.remarks && (
                    <p className="mt-2 rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
                      {activity.remarks}
                    </p>
                  )}

                  <p className="mt-2 text-[11px] text-gray-400">
                    {activity.date}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default ActivityHistory;
