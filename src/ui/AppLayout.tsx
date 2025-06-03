import { Outlet } from "react-router-dom";
import Header from "./Header";
import { usePlanningContext } from "../store/planning-context";
import StartPlanning from "../features/Plan/StartPlanning";

export default function AppLayout() {
  const { isPlanning } = usePlanningContext();
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      {/* <main className="h-full overflow-y-scroll bg-stone-50 relative"> */}
      <div className="relative h-full  bg-sky-50">
        <main
          className={`transition-[height] duration-500 ease-in-out bg-stone-100 ${
            isPlanning ? "h-0 overflow-hidden" : "h-full"
          }`}
        >
          <Outlet />
        </main>
        <StartPlanning />
      </div>
      <footer className="bg-stone-50 p-4 text-center border-t border-stone-200">
        <p>© 2025 L13yron Travel</p>
      </footer>
    </div>
  );
}
