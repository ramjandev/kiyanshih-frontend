import TransactionTable from "@/Dashboard/Admin/components/transaction/TransactionTable";
import DashboardTopSection from "../../common/DashboardTopSection";

const Transaction = () => {
  return (
    <div>
      <DashboardTopSection
        title="Transaction"
        description="Track all your payments and refunds in one place"
      />
      <TransactionTable />
    </div>
  );
};

export default Transaction;
