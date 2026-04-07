import { BsFillPlayFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function LearningModuleCard() {
  const navigate = useNavigate();
  return (
    <section className="w-full rounded-lg border border-gray-300 p-4 flex flex-col gap-4 lg:flex-row">
      <section className="h-[180px] w-full rounded-lg bg-black sm:h-[220px] lg:h-[200px] lg:max-w-[500px]">
        <p>Test</p>
      </section>

      <section className="w-full leading-7 sm:leading-8 min-w-0">
        <p className="text-md font-bold text-stone-400 uppercase">
          Design: module 3 of 8
        </p>

        <p className="font-medium break-words">
          UX Fundamentals & Design Thinking
        </p>

        <p className="text-sm font-medium break-words">
          Next up: Wireframing with Low-fidelity Prototypes
        </p>

        <div className="mt-3">
          <p className="text-md font-medium text-blue-900">60% complete</p>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-3 h-3 bg-green-700 rounded-full"></div>

            <p className="text-xs truncate">Last visited 2h ago</p>
          </div>

          <button
            className="w-full sm:w-auto px-5 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition duration-300 text-sm cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate("/active-courses");
            }}
          >
            Resume Course
            <BsFillPlayFill className="inline-block ml-2" />
          </button>
        </div>
      </section>
    </section>
  );
}

export default LearningModuleCard;
