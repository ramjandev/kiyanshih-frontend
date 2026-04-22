import { NavLink, type NavLinkProps } from "react-router-dom";

interface ActiveLinkProps extends NavLinkProps {
  children: React.ReactNode;
}

const ActiveLink = ({ to, children, ...props }: ActiveLinkProps) => {
  return (
    <NavLink
      to={to}
      {...props}
      className={({ isActive }) =>
        `relative px-4 py-3 rounded ${
          isActive ? "bg-[#E2E8F0] font-medium" : "text-gray-700"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {children}
          {isActive && (
            <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-[#007BFF] rounded-full" />
          )}
        </>
      )}
    </NavLink>
  );
};

export default ActiveLink;
