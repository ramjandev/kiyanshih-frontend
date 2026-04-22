import { Link, NavLink } from "react-router-dom";
import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur animate-slide-down duration-500">
      <div className="container px-4 py-6 space-y-6">
        {/* Mobile Nav Links */}
        <nav className="flex flex-col space-y-4">
          <CommonHeader onClick={onClose} className="!text-[#111827]">
            <NavLink to="/service">Service</NavLink>
          </CommonHeader>
          <CommonHeader onClick={onClose} className="!text-[#111827]">
            <NavLink to="/provider">Provider</NavLink>
          </CommonHeader>
          <CommonHeader onClick={onClose} className="!text-[#111827]">
            <NavLink to="/how-it-works">How It Works</NavLink>
          </CommonHeader>
        </nav>

        {/* Mobile Actions */}
        <div className="flex flex-col space-y-3 pt-4 border-t border-border/40">
          <CommonButton
            className="!bg-[#1D4ED8] !border-[#1D4ED8] !border !text-white"
            onClick={onClose}
          >
            <Link to="/login">Sign In</Link>
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
