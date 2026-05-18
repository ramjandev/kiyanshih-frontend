import logo from "@/assets/images/logo.png";
import CommonWrapper from "@/common/space/CommonWrapper";
import JoinModal from "@/components/navbar/JoinModal";
import MobileMenu from "@/components/navbar/MobileMenu";
import NotificationProvider from "@/components/Provider/NotificationProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetProfileQuery } from "@/redux/featuresAPI/adminApi/notificationApi";
import { logout } from "@/redux/featuresAPI/auth/auth.slice";
import { useAppDispatch } from "@/redux/hooks";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const { data: profile } = useGetProfileQuery();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const isProviderDashboard = location.pathname.startsWith(
    "/provider-dashboard",
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-[#EFF6FF] border-b border-gray-100 py-[14px]">
      <CommonWrapper>
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/user-dashboard/overview" className="w-[132px] h-[52px]">
            <img src={logo} alt="Logo" />
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-x-6">
            <NotificationProvider />
            {/* Welcome + Avatar Dropdown */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-lg font-semibold text-[#0F172A]">
                  Welcome Back!
                </div>
                <div className="text-sm md:text-[16px] text-[#334155]">
                  {profile?.first_name} {profile?.last_name}
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="outline-none">
                    <Avatar className="sm:h-[50px] sm:w-[50px] h-[40px] w-[40px] cursor-pointer">
                      <AvatarImage
                        src={(profile as any)?.user_profile?.profile_picture || profile?.profile_image_url || undefined}
                        alt={profile?.first_name || "User"}
                      />
                      <AvatarFallback className="bg-blue-200 text-gray-900 font-semibold text-xl">
                        {profile?.first_name
                          ? profile.first_name[0].toUpperCase()
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-44 mt-3 rounded-xl bg-white shadow-lg shadow-black/10 border border-gray-100"
                >
                  <DropdownMenuItem
                    onClick={() => navigate("/user-dashboard/profile")}
                    className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                  >
                    Profile
                  </DropdownMenuItem>

                  {isProviderDashboard && (
                    <DropdownMenuItem
                      onClick={() => navigate("/")}
                      className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                      Use as Client
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md focus:text-red-600"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden h-10 w-10 p-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </CommonWrapper>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      )}

      {/* Join Modal */}
      <JoinModal open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen} />
    </header>
  );
};

export default UserNavbar;
