import Navbar from "./Navbar";
import { ModeToggle } from "./Mode-controller";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col p-2">
        <div className="flex justify-end mt-0.5 -mb-5">
          <ModeToggle />
        </div>
        <Navbar />
      
      <main className="pb-16 overflow-auto min-h-fit">
        <Outlet /> 
      </main>
      <footer className="fixed bottom-0 right-0 left-0 text-center border-t border-gray-800 p-2 bg-gray-900 font-semibold">
        © 2025 - NC Instruments
      </footer>
      </div>
    </>
  );
};

export default Layout;
