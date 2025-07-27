import DarkMode from "@/DarkMode";
import { useLogoutUserMutation } from "@/features/api/authApi";
import DOMPurify from "dompurify";
import { BookOpen, LogOut, Menu, Search, Settings, Watch } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  const isInputSuspicious = (input) => {
    const xssPattern = /<script|javascript:|on\w+=/i;
    const sqlPattern = /['";\\]|(\b(OR|AND|SELECT|UNION)\b)/i;
    return xssPattern.test(input) || sqlPattern.test(input);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery === "") return;

    if (isInputSuspicious(trimmedQuery)) {
      toast.warning("Please avoid using special characters in your search");
      return;
    }

    const sanitizedQuery = DOMPurify.sanitize(trimmedQuery, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true
    });

    const encodedQuery = encodeURIComponent(sanitizedQuery);
    navigate(`/watch/search?query=${encodedQuery}`);
    setSearchQuery("");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);


  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-[#0d0d0d] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop View */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Watch size={30} className="text-[#146321] dark:text-white" />
          <Link to="/">
            <h1 className="hidden md:block font-extrabold text-2xl tracking-wide">
              <span className="text-[#146321] dark:text-[#146321]">Regal</span>{" "}
              <span className="text-gray-800 dark:text-white">Ticks</span>
            </h1>
          </Link>
        </div>

        {/* Search Field */}
        <form
          onSubmit={searchHandler}
          className="flex items-center bg-gray-50/80 dark:bg-gray-800/80 rounded-full border border-gray-200 dark:border-gray-600 overflow-hidden w-[500px] max-w-full shadow-sm hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-[#146321]/20 focus-within:border-[#146321]"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search luxury watches..."
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 bg-transparent text-sm"
          />
          <button
            type="submit"
            className="p-3 px-4 text-gray-600 dark:text-gray-400 hover:text-[#146321] dark:hover:text-[#4ade80] transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full mr-1"
          >
            <Search size={20} strokeWidth={2} />
          </button>
        </form>

        {/* User Section */}
        <div className="flex items-center gap-6 flex-shrink-0">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="user"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="/my-learning">My Purchase</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/profile">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "seller" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="cursor-pointer"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="bg-[#146321] hover:bg-[#146321]/90 cursor-pointer"
              >
                Signup
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <div className="flex items-center gap-2">
          <Watch size={26} className="text-[#146321] dark:text-white" />
          <Link to="/">
            <h1 className="font-bold text-lg">
              <span className="text-[#146321] dark:text-[#146321]">Regal</span>{" "}
              <span className="text-gray-800 dark:text-white">Ticks</span>
            </h1>
          </Link>
        </div>
        <MobileNavbar user={user} />
      </div>
    </div>
  );
};

const MobileNavbar = ({ user }) => {
  const [logoutUser] = useLogoutUserMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  const isInputSuspicious = (input) => {
    const xssPattern = /<script|javascript:|on\w+=/i;
    const sqlPattern = /['";\\]|(\b(OR|AND|SELECT|UNION)\b)/i;
    return xssPattern.test(input) || sqlPattern.test(input);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery === "") return;

    if (isInputSuspicious(trimmedQuery)) {
      toast.warning("Please avoid using special characters in your search");
      return;
    }

    const sanitizedQuery = DOMPurify.sanitize(trimmedQuery, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true
    });

    const encodedQuery = encodeURIComponent(sanitizedQuery);
    navigate(`/watch/search?query=${encodedQuery}`);
    setSearchQuery("");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (isInputSuspicious(value)) {
      toast.warning("Suspicious characters detected", {
        duration: 2000,
        position: "top-center"
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          variant="ghost"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <SheetHeader className="flex flex-row items-center justify-between mt-2 pb-4">
          <SheetTitle>
            <Link to="/" className="transition-transform hover:scale-105 duration-200">
              <Watch size={30} className="text-[#146321] dark:text-white inline" />
              <span className="font-bold text-lg ml-2">
                <span className="text-[#146321] dark:text-[#146321]">Regal</span>
                <span className="text-gray-800 dark:text-white">Ticks</span>
              </span>
            </Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>

        {user && (
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg mb-4">
            <Avatar className="ring-2 ring-[#146321]/20">
              <AvatarImage
                src={user?.photoUrl || "https://github.com/shadcn.png"}
                alt="user"
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-[#146321] to-[#1e3a2a] text-white font-semibold">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        )}

        <form
          onSubmit={searchHandler}
          className="flex items-center bg-gray-50 dark:bg-gray-800/50 rounded-full border border-gray-200 dark:border-gray-600 overflow-hidden mb-6 focus-within:ring-2 focus-within:ring-[#146321]/20 focus-within:border-[#146321] transition-all duration-200"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search luxury watches..."
            className="flex-grow border-none focus-visible:ring-0 px-4 py-3 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 bg-transparent text-sm"
          />
          <button
            type="submit"
            className="p-3 text-gray-600 dark:text-gray-400 hover:text-[#146321] dark:hover:text-green-400 transition-colors duration-200"
          >
            <Search size={20} strokeWidth={2} />
          </button>
        </form>

        <nav className="flex flex-col space-y-2 flex-1">
          {user ? (
            <>
              <Link
                to="/my-learning"
                className="flex items-center gap-3 p-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#146321] dark:hover:text-green-400 transition-all duration-200"
              >
                <BookOpen size={20} />
                My Purchase
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-3 p-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#146321] dark:hover:text-green-400 transition-all duration-200"
              >
                <Settings size={20} />
                Edit Profile
              </Link>
              <button
                onClick={logoutHandler}
                className="flex items-center gap-3 p-3 rounded-lg font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 w-full text-left"
              >
                <LogOut size={20} />
                Log out
              </button>
            </>
          ) : (
            <div className="space-y-3 mt-6">
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="w-full py-3 font-medium border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="w-full py-3 bg-[#146321] hover:bg-[#30843e] text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                Sign Up
              </Button>
            </div>
          )}
        </nav>

        {user?.role === "seller" && (
          <SheetFooter className="mt-auto">
            <SheetClose asChild>
              <Button type="submit" onClick={() => navigate("/admin/dashboard")}>
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;  