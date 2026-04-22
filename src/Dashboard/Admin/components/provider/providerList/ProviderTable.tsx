import CustomSwitch from "@/common/custom/CustomSwitch";
import Pagination from "@/common/custom/Pagination";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MdOutlineStarPurple500 } from "react-icons/md";

import LoadingStatus from "@/common/custom/LoadingStatus";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllProvidersQuery } from "@/redux/featuresAPI/adminApi/providerApi";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Table headers
const tableHeaders = [
  { label: "SL", align: "text-center hidden 2xl:table-cell" },
  { label: "Provider", align: "text-left" },
  { label: "Contact Info", align: "text-center xl:table-cell hidden" },
  { label: "Total Bookings", align: "text-center hidden lg:table-cell" },
  { label: "Service Availability", align: "text-center" },
  { label: "Status", align: "text-center hidden xl:table-cell" },
  { label: "Verified Status", align: "text-center hidden xl:table-cell" },
  { label: "Action", align: "text-center" },
];

// Tailwind classes
const tableDesign = {
  header:
    "text-lg font-Geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12 leading-[28px]",
  cellHeader: "border border-border px-4 ",
  bodyRow:
    "text-[#2C2C2C] font-Geist text-lg font-normal md:h-12 leading-[28px]",
  cell: "border border-border px-4 text-center",
};

interface ProviderTableProps {
  onToggleAvailability?: (p: any) => void;
}

const ProviderTable = ({ onToggleAvailability }: ProviderTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetAllProvidersQuery(
    { current_page: currentPage, page_size: 1 },
    { refetchOnMountOrArgChange: true }
  );
  const providers = data?.data || [];
  const pagination = data?.pagination;

  return (
    <CommonBorderWrapper className="border-0 !p-10">
      <LoadingStatus
        isLoading={isLoading}
        items={providers}
        itemName="providers"
      />
      {!isLoading && providers.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow className={tableDesign.header}>
              {tableHeaders.map((header) => (
                <TableHead
                  key={header.label}
                  className={`${tableDesign.cellHeader} ${header.align}`}
                >
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {providers.map((p) => (
              <TableRow key={p.provider_id} className={tableDesign.bodyRow}>
                {/* SL */}
                <TableCell
                  className={`hidden 2xl:table-cell ${tableDesign.cell}`}
                >
                  {p.sl.toString().padStart(2, "0")}
                </TableCell>

                {/* Provider */}
                <TableCell className={tableDesign.cell}>
                  <div className="flex items-start gap-2">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback>{p.provider_name}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <p className="font-medium">{p.provider_name}</p>
                      <div className="text-orange-500 text-xs flex items-center gap-1">
                        <span>
                          <MdOutlineStarPurple500 />
                        </span>
                        {p.rating.toFixed(1)} ({p.total_reviews})
                      </div>
                    </div>
                  </div>
                </TableCell>

                {/* Contact Info */}
                <TableCell
                  className={`hidden xl:table-cell ${tableDesign.cell}`}
                >
                  <div>
                    <p>{p.contact_phone}</p>
                    <p>{p.contact_email}</p>
                  </div>
                </TableCell>

                {/* Total Bookings */}
                <TableCell
                  className={`hidden lg:table-cell ${tableDesign.cell}`}
                >
                  {p.total_bookings_served}
                </TableCell>

                {/* Service Availability */}
                <TableCell className={tableDesign.cell}>
                  <div className="flex justify-center">
                    <CustomSwitch
                      checked={p.service_availability}
                      onChange={() => onToggleAvailability?.(p)}
                    />
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell
                  className={`hidden xl:table-cell ${tableDesign.cell}`}
                >
                  <div
                    className={
                      p.service_availability ? "text-blue" : "text-[#2C2C2C]"
                    }
                  >
                    {p.status}
                  </div>
                </TableCell>
                <TableCell
                  className={`hidden xl:table-cell ${tableDesign.cell}`}
                >
                  <div
                    className={
                      p.verification_status === "Verified"
                        ? "text-[#2C2C2C]"
                        : "text-[#DB2777]"
                    }
                  >
                    {p.verification_status}
                  </div>
                </TableCell>

                {/* Action */}
                <TableCell className={tableDesign.cell}>
                  <div className="flex justify-center gap-3 cursor-pointer">
                    <Link to={`${p.provider_id}`} className="text-[#09090B]">
                      <Eye size={18} />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {providers.length > 0 && pagination && (
        <div className="w-full flex items-center justify-center lg:justify-end mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.total_pages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </CommonBorderWrapper>
  );
};

export default ProviderTable;
