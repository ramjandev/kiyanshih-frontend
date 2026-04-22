import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Transaction } from "@/redux/types/userTypes/userSettings.type";
import { format } from "date-fns";

export const tableHeaders = [
  { key: "sl", label: "SL", align: "text-center" },
  { key: "transactionId", label: "Transaction ID", align: "text-center" },
  { key: "transactionDate", label: "Transaction Date", align: "text-center" },
  { key: "provider", label: "Transaction From", align: "text-center" },
  { key: "amount", label: "Amount", align: "text-center" },
  { key: "status", label: "Status", align: "text-center" },
];

const statusColors: Record<string, string> = {
  success: "text-[#2DD4BF]",
  pending: "text-amber-500",
  failed: "text-red-500",
  refund: "text-[#DB2777]",
};

interface PaymentHistoryProps {
  transactions?: Transaction[];
}

const PaymentHistory = ({ transactions = [] }: PaymentHistoryProps) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-gray-300 rounded-md bg-gray-50 mb-10">
        <p className="text-gray-500 text-lg">No transaction history found.</p>
      </div>
    );
  }

  return (
    <Table className="border border-border text-center mb-10">
      <TableHeader>
        <TableRow className="bg-[#EFF6FF] text-base text-[#2C2C2C] font-medium">
          {tableHeaders.map((header) => (
            <TableHead
              key={header.key}
              className={`border border-border text-center ${header.align}`}
            >
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {transactions.map((transaction, index) => (
          <TableRow
            key={transaction.id}
            className="hover:bg-gray-50 text-[#2C2C2C] text-base font-normal bg-white"
          >
            <TableCell className="border border-border text-center py-4">
              {(index + 1).toString().padStart(2, "0")}
            </TableCell>
            <TableCell className="border border-border text-center">
              {transaction.transaction_id}
            </TableCell>
            <TableCell className="border border-border text-center">
              <div className="flex flex-col gap-0.5 justify-center">
                <span>{format(new Date(transaction.created_at), "yyyy-MM-dd")}</span>
                <span className="text-xs text-gray-400">{format(new Date(transaction.created_at), "hh:mm a")}</span>
              </div>
            </TableCell>
            <TableCell className="border border-border text-center">
              <div className="flex flex-col">
                <span className="font-medium">{transaction.provider_name}</span>
                <span className="text-xs text-gray-500">{transaction.job_title}</span>
              </div>
            </TableCell>

            <TableCell className="border border-border text-center font-medium">
              ${parseFloat(transaction.amount).toFixed(2)}
            </TableCell>
            <TableCell
              className={`border border-border text-center font-bold capitalize ${statusColors[transaction.status.toLowerCase()] || "text-gray-500"
                }`}
            >
              {transaction.status}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PaymentHistory;
