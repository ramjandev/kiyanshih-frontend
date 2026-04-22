import DashboardTopSection from "../common/DashboardTopSection";
import UserTable from "../components/user/UserTable";

const UserManagement = () => {
  return (
    <div>
      <DashboardTopSection
        title="User List"
        description="Monitor user activity and account status"
      />
      <UserTable />
    </div>
  );
};

export default UserManagement;
