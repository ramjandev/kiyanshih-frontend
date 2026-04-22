import LoadingStatus from "@/common/custom/LoadingStatus";
import Pagination from "@/common/custom/Pagination";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTransactionsQuery } from "@/redux/featuresAPI/adminApi/businessManagement";
import type { Transaction } from "@/redux/featuresAPI/adminApi/types/business";
import { useState } from "react";

export const tableHeaders = [
  { key: "sl", label: "SL", align: "text-center hidden 2xl:table-cell" },
  {
    key: "bookingId",
    label: "Booking ID",
    align: "text-center hidden 2xl:table-cell",
  },
  {
    key: "bookingDate",
    label: "Booking Date",
    align: "text-center hidden 2xl:table-cell",
  },
  {
    key: "serviceLocation",
    label: "Service Location",
    align: "text-center xl:table-cell hidden",
  },
  { key: "customerInfo", label: "Customer Info", align: "text-center" },
  { key: "providerInfo", label: "Provider Info", align: "text-center " },
  {
    key: "totalAmount",
    label: "Total Amount",
    align: "text-center xl:table-cell hidden",
  },
  { key: "status", label: "Status", align: "text-center lg:table-cell hidden" },
];

const tableDesign = {
  header:
    "text-lg font-Geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12 leading-[28px]",
  cellHeader: "border border-border px-4 ",
  bodyRow:
    "text-[#2C2C2C] font-Geist text-lg font-normal md:h-12 leading-[28px]",
  cell: "border border-border px-4 text-center",
};

const statusColors: Record<Transaction["status"], string> = {
  Paid: "text-[#2DD4BF]",
  Refund: "text-[#DB2777]",
};

const TransactionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetTransactionsQuery(
    { current_page: currentPage, page_size: 10 },
    { refetchOnMountOrArgChange: true }
  );
  const TransactionData = data?.data.transactions || [];
  return (
    <>
      <LoadingStatus
        isLoading={isLoading}
        items={TransactionData}
        itemName="Transaction"
      />
      {!isLoading && TransactionData.length > 0 && (
        <CommonBorderWrapper className=" border-0 !p-10">
          <Table className="">
            <TableHeader>
              <TableRow className={tableDesign.header}>
                {tableHeaders.map((header) => (
                  <TableHead
                    key={header.key}
                    className={` ${tableDesign.cellHeader} ${header.align}`}
                  >
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {TransactionData.map((booking) => (
                <TableRow key={booking.sl} className={tableDesign.bodyRow}>
                  <TableCell
                    className={`2xl:table-cell hidden  ${tableDesign.cell}`}
                  >
                    {booking.sl.toString().padStart(2, "0")}
                  </TableCell>
                  <TableCell
                    className={`2xl:table-cell hidden  ${tableDesign.cell}`}
                  >
                    {booking.booking_id}
                  </TableCell>
                  <TableCell
                    className={`2xl:table-cell hidden  ${tableDesign.cell}`}
                  >
                    <div>
                      <p>{booking.booking_date}</p>
                      <p>{booking.booking_time}</p>
                    </div>
                  </TableCell>
                  <TableCell
                    className={` xl:table-cell hidden  ${tableDesign.cell}`}
                  >
                    {booking.service_location}
                  </TableCell>
                  <TableCell className={`  ${tableDesign.cell}`}>
                    <div>
                      <p>{booking.customer_info.name}</p>
                      <p>{booking.customer_info.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className={`  ${tableDesign.cell}`}>
                    <div>
                      <p>{booking.provider_info.name}</p>
                      <p>{booking.provider_info.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell
                    className={`xl:table-cell hidden  ${tableDesign.cell}`}
                  >
                    {booking.total_amount}$
                  </TableCell>
                  <TableCell
                    className={`lg:table-cell hidden ${tableDesign.cell} ${
                      statusColors[booking.status]
                    }`}
                  >
                    {booking.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="w-full ml-auto flex items-center justify-center lg:justify-end mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={data?.data.pagination.total_pages || 1}
              onPageChange={setCurrentPage}
            />
          </div>
        </CommonBorderWrapper>
      )}
    </>
  );
};

export default TransactionTable;
