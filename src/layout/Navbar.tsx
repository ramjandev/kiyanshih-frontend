import logo from "@/assets/images/logo.png";
import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import CommonWrapper from "@/common/space/CommonWrapper";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "../components/navbar/MobileMenu";
import JoinModal from "@/components/navbar/JoinModal";
import ActiveLink from "@/components/navbar/ActiveLink";
import CommonDropdown from "@/common/custom/CommonDropdown";
import { languageItems } from "@/Dashboard/Admin/common/data";
import { HiOutlineGlobeAlt } from "react-icons/hi";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  return (
    <header className="bg-[#EFF6FF] w-full">
      <CommonWrapper>
        <div className="w-full flex items-center justify-between h-18">
          {/* Logo + Desktop Nav */}
          <div className="flex items-center gap-2 lg:gap-12 ">
            <Link to="/" className="w-[132px] h-[52px]">
              <img src={logo} alt="Logo" />
            </Link>
            {/* Desktop Menu bar */}
            <nav className="hidden md:flex items-center ">
              <CommonHeader className="!text-[#111827]">
                <ActiveLink to="/service">Service</ActiveLink>
              </CommonHeader>
              <CommonHeader className="!text-[#111827]">
                <ActiveLink to="/provider">Provider</ActiveLink>
              </CommonHeader>
              <CommonHeader className="!text-[#111827]">
                <ActiveLink to="/how-it-works">How It Works</ActiveLink>
              </CommonHeader>
            </nav>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-x-3">
            <CommonDropdown
              items={languageItems}
              trigger={
                <span className="text-3xl text-[#1D4ED8]">
                  <HiOutlineGlobeAlt />
                </span>
              }
            />
            <CommonButton className="border !border-[#1D4ED8] !px-4 !py-2">
              <Link to="/login"> Sign In</Link>
            </CommonButton>
            <CommonButton
              onClick={() => setIsJoinModalOpen(true)}
              className="!bg-[#1D4ED8] !border-[#1D4ED8] !border !text-white !px-4 !py-2"
            >
              Get Started
            </CommonButton>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden 12-9 w-12 p-0 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-8 w-8 " />
            ) : (
              <Menu className="h-8 w-8 " />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {isMenuOpen && (
          <MobileMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          />
        )}

        {/* Join Modal */}
        <JoinModal open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen} />
      </CommonWrapper>
    </header>
  );
};

export default Navbar;
