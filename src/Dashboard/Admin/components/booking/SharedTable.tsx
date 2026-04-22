import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Booking } from "@/redux/featuresAPI/adminApi/types/booking";
import { Eye } from "lucide-react";
import type { FC } from "react";
import { Link } from "react-router-dom";

interface BookingTableProps {
  bookings: Booking[];
  // statusColors?: Record<BookingStatus["status"], string>;
  // onViewClick?: (booking: Booking) => void;
  // onDownloadClick?: (booking: Booking) => void;
}

const defaultStatusColors: Record<Booking["status"], string> = {
  Pending: "text-orange-600",
  Cancelled: "text-red-600",
  Confirmed: "text-[#EAB308]",
  Rejected: "text-red-600",
  Accepted: "text-green-600",
  "In-progress": "text-blue-600",
  Completed: "text-green-600",

  "Cancelled-By-User": "text-red-600",
};
export const bookingTableHead = [
  { key: "sl", label: "SL", align: "text-center  hidden 2xl:table-cell" },
  {
    key: "bookingId",
    label: "Booking ID",
    align: "text-center hidden 2xl:table-cell",
  },
  {
    key: "bookingDate",
    label: "Booking Date",
    align: "text-center hidden xl:table-cell",
  },
  {
    key: "serviceLocation",
    label: "Service Location",
    align: "text-center hidden xl:table-cell",
  },
  { key: "customerInfo", label: "Customer Info", align: "text-center" },
  {
    key: "providerInfo",
    label: "Provider Info",
    align: "text-center hidden lg:table-cell",
  },
  { key: "totalAmount", label: "Total Amount", align: "text-center" },
  { key: "status", label: "Status", align: "text-center hidden lg:table-cell" },
  { key: "action", label: "Action", align: "text-center" },
];

const tableDesign = {
  header:
    "text-lg font-Geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12 leading-[28px]",
  cellHeader: "border border-border px-4 ",
  bodyRow:
    "text-[#2C2C2C] font-Geist text-lg font-normal md:h-12 leading-[28px]",
  cell: "border border-border px-4 text-center",
};
const SharedTable: FC<BookingTableProps> = ({
  bookings,
  // onViewClick,
  // onDownloadClick,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className={tableDesign.header}>
          {bookingTableHead.map((col) => (
            <TableHead
              key={col.key}
              className={` ${col.align} ${tableDesign.cellHeader}`}
            >
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.sl} className={tableDesign.bodyRow}>
            <TableCell className={` hidden 2xl:table-cell ${tableDesign.cell}`}>
              {booking.sl.toString().padStart(2, "0")}
            </TableCell>
            <TableCell className={`hidden 2xl:table-cell  ${tableDesign.cell}`}>
              {booking.booking_id}
            </TableCell>
            <TableCell className={` hidden xl:table-cell  ${tableDesign.cell}`}>
              <div>
                <p className="whitespace-nowrap">{booking.booking_date}</p>
                <p className="whitespace-nowrap">
                  {booking.customer_info.name}
                </p>
              </div>
            </TableCell>
            <TableCell
              className={` hidden
              xl:table-cell  ${tableDesign.cell}`}
            >
              <div
                className="max-w-[150px] truncate"
                title={booking.service_location}
              >
                {booking.service_location}
              </div>
            </TableCell>
            <TableCell className={`  ${tableDesign.cell}`}>
              <div>
                <p title={booking.customer_info.name}>
                  {booking.customer_info.name}
                </p>
                <p className="whitespace-nowrap">
                  {booking.customer_info.phone}
                </p>
              </div>
            </TableCell>
            <TableCell className={` hidden lg:table-cell  ${tableDesign.cell}`}>
              <div>
                <p title={booking.provider_info.name}>
                  {booking.provider_info.name}
                </p>
                <p className="whitespace-nowrap">
                  {booking.provider_info.phone}
                </p>
              </div>
            </TableCell>
            <TableCell className={`  ${tableDesign.cell} `}>
              {booking.total_amount}
            </TableCell>
            <TableCell
              className={` hidden lg:table-cell ${tableDesign.cell} ${
                defaultStatusColors[booking.status]
              } `}
            >
              {booking.status}
            </TableCell>
            <TableCell className="border border-border text-center min-w-[80px]">
              <div className="flex justify-center gap-3 ">
                <Link to={`${booking.booking_id}`} className="text-[#09090B]">
                  <Eye size={18} />
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SharedTable;
