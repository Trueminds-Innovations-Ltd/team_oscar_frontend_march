import Sidebar from "../../../shared/layout/Sidebar";
import NavBar from "../../../shared/layout/NavBar";
import SummaryCard from "../../../shared/ui/SummaryCard";
import DashboardMetrics from "../components/DashboardMetrics";
import { FaGraduationCap } from "react-icons/fa";

function Dashboard() {
  return (
    <div className="grid grid-cols-[250px_1fr]">
      <Sidebar />

      {/* Main dashboard */}
      <section>
        <NavBar />

        <main className="w-full px-7 mt-5">
          <section>
            <h1 className="text-[35px] font-extrabold">
              Good Morning, Oscar 👋
            </h1>
            <p className="mt-2 font-bold text-gray-500">
              3 tasks due this week
            </p>
          </section>

          <section>
            <DashboardMetrics>
              <SummaryCard>
                  <FaGraduationCap />

                  <div>
                    <p className="font-medium">Progress</p>
                    <p className="font-bold">10% Complete</p>
                  </div>
              </SummaryCard>

              <SummaryCard>
                  <FaGraduationCap />

                  <div>
                    <p className="font-medium">Courses</p>
                    <p className="font-bold">5</p>
                  </div>
              </SummaryCard>

              <SummaryCard>
                  <FaGraduationCap />

                  <div>
                    <p className="font-medium">Completed Courses</p>
                    <p className="font-bold">2/5</p>
                  </div>
              </SummaryCard>

              <SummaryCard>
                  <FaGraduationCap />

                  <div>
                    <p className="font-medium">Task</p>
                    <p className="font-bold">2/5</p>
                  </div>
              </SummaryCard>
            </DashboardMetrics>
          </section>
        </main>
      </section>
    </div>
  );
}

export default Dashboard;
