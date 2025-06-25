import { useContext } from "react";
import { AppContext } from "@/context/appContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { AppState } from "@/interfaces/interfaces";

const Navbar = () => {
  const { token, user, logout } = useContext(AppContext) as AppState;

  return (
    <nav className="block w-full px-4 py-2 mx-auto max-w-7xl text-white bg-gray-900 shadow-md rounded-md lg:px-8 lg:py-3 mt-10">
      <div className="container flex items-center justify-between mx-auto text-gray-100">
        <Link to="/" className="text-base font-semibold text-gray-200">
          NC Guitar Store
        </Link>

        <ul className="hidden lg:flex gap-6 items-center">
          <li>
            <Link to="/" className="text-sm text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="text-sm text-gray-200">
              Productos
            </Link>
          </li>

          {token ? (
            <div className="flex items-center gap-3 mx-auto">
              <li>
                <Link to="/checkout" className="text-sm text-gray-200">
                  Carrito
                </Link>
              </li>
              <li>
                <Link to={`/users/${user}`} className="text-sm text-gray-200">
                  Usuario
                </Link>
              </li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user.image} />
                    <AvatarFallback>NC</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem asChild>
                    <Link to={`/users/${user}`}>Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <Link to={'/'}>Cerrar sesión</Link>
                    
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <li>
              <Link to="/sign-in" className="text-sm text-gray-200">
                Ingresar
              </Link>
            </li>
          )}
        </ul>

        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1">
                <Menu className="w-6 h-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products">Productos</Link>
              </DropdownMenuItem>

              {token ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/checkout">Carrito</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/users/${user}`}>Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    Cerrar sesión
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link to="/sign-in">Ingresar</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
