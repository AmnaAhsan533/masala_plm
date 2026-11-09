
import { employees } from "../../data/employees";
import { Users, UserRound } from "lucide-react";

function DepartmentAssignments({
  departments,
  assignments = {},
  onAssign,
  disabled = false,
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">

      <div className="flex items-center gap-2">
        <Users size={19} className="text-orange-600" />

        <div>
          <h3 className="font-semibold text-gray-900">
            Department Assignments
          </h3>
          <p className="text-xs text-gray-400">
            Assign employees responsible for this stage.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">

        {departments.map((department) => {

          const assignedEmployee = employees.find(
            (employee) => employee.id === assignments[department]
          );

          const departmentEmployees = employees.filter(
            (employee) => employee.department === department
          );

          return (
            <div
              key={department}
              className="flex flex-col justify-between gap-3 rounded-lg border border-gray-100 p-4 sm:flex-row sm:items-center"
            >

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {department}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {assignedEmployee
                    ? assignedEmployee.designation
                    : "No employee assigned"}
                </p>
              </div>

              <div className="flex items-center gap-2">

                <UserRound size={16} className="text-gray-400" />

                <select
                  value={assignments[department] || ""}
                  disabled={disabled}
                  onChange={(e) =>
                    onAssign(department, e.target.value)
                  }
                  className="min-w-48 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-500 disabled:bg-gray-100"
                >

                  <option value="">
                    Select Employee
                  </option>

                  {departmentEmployees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}

                </select>

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default DepartmentAssignments;
