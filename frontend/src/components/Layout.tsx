import Navbar from "./Navbar";
import { ModeToggle } from "./Mode-controller";

const Layout = () => {
  return (
    <>
      <div className="p-2">
        <ModeToggle />
        <Navbar />
      </div>
      <footer className="text-center border-t-gray-300">NC Instruments</footer>
    </>
  );
};

export default Layout;
