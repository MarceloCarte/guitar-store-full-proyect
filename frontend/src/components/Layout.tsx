import Navbar from "./Navbar";
import { ModeToggle } from "./Mode-controller";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col p-2 min-h-screen">
        <div className="flex justify-end mt-0.5 -mb-5">
          <ModeToggle />
        </div>
        <Navbar />
      </div>
      <footer className="fixed bottom-0 left-0 right-0 text-center border-t border-gray-800 p-2">
        © 2025 - NC Instruments
      </footer>
    </>
  );
};

export default Layout;
