import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-3 fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-900">
          🌤️ Weather App
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white shadow-md p-2 rounded-md">
                <NavigationMenuLink asChild>
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 rounded-md">
                    Dashboard
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link to="/forecast" className="block px-4 py-2 hover:bg-gray-100 rounded-md">
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/dashboard" className="px-4 py-2 hover:text-gray-700">
                  Dashboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;
