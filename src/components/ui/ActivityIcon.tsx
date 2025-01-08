import { FaCircle } from "react-icons/fa";

function ActivityIcon({ state }: { state: boolean }) {
  return (
    <div
      className="relative flex items-center justify-center gap-2"
      aria-label={state ? "Active status" : "Inactive status"}
    >
      <FaCircle
        className={`h-3 w-3 ${state ? "text-green-500" : "text-gray-400"}`}
      />
      <span className="text-sm font-medium">
        {state ? "Active" : "Inactive"}
      </span>
    </div>
  );
}

export default ActivityIcon;
