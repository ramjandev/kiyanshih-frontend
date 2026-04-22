import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import LoadingStatus from "@/common/custom/LoadingStatus";
import Pagination from "@/common/custom/Pagination";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import { useGetSubscriptionsQuery } from "@/redux/featuresAPI/adminApi/businessManagement";
import { Eye } from "lucide-react";
import { useState } from "react";
import SubscriptionInfoCard from "./SubscriptionInfoCard";

const tableHeaders = [
  { label: "SL", align: "text-center hidden 2xl:table-cell" },
  { label: "Provider", align: "text-left" },
  { label: "Contact information", align: "text-center 2xl:table-cell hidden" },
  { label: "Active plan", align: "text-center xl:table-cell hidden" },
  { label: "Verification Plan", align: "text-center lg:table-cell hidden" },
  { label: "Action", align: "text-center" },
];
const tableDesign = {
  header:
    "text-lg font-Geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12 leading-[28px]",
  cellHeader: "border border-border px-4 ",
  bodyRow:
    "text-[#2C2C2C] font-Geist text-lg font-normal md:h-12 leading-[28px]",
  cell: "border border-border px-4 text-center",
};
const SubscriptionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetSubscriptionsQuery(
    { current_page: currentPage, page_size: 10 },
    { refetchOnMountOrArgChange: true }
  );
  const SubscriptionData = data?.data.subscriptions || [];
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<
    number | null
  >(null);
  const [isSubscriptionInfoOpen, setIsSubscriptionInfoOpen] = useState(false);
  const handleOpenSubscriptionInfo = (id: number) => {
    setSelectedSubscriptionId(id);
    setIsSubscriptionInfoOpen(true);
  };
  const handleCloseSubscriptionInfo = () => {
    setSelectedSubscriptionId(null);
    setIsSubscriptionInfoOpen(false);
  };
  return (
    <>
      <LoadingStatus
        isLoading={isLoading}
        items={SubscriptionData}
        itemName="Subscription"
      />
      {!isLoading && SubscriptionData.length > 0 && (
        <CommonBorderWrapper className=" border-0 !p-10">
          <Table className="">
            <TableHeader>
              <TableRow className={tableDesign.header}>
                {tableHeaders.map((header) => (
                  <TableHead
                    key={header.label}
                    className={` ${tableDesign.cellHeader}  ${header.align}`}
                  >
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {SubscriptionData.map((p) => (
                <TableRow key={p.sl} className={tableDesign.bodyRow}>
                  <TableCell
                    className={`2xl:table-cell hidden  ${tableDesign.cell}`}
                  >
                    {p.sl.toString().padStart(2, "0")}
                  </TableCell>
                  <TableCell className={`  ${tableDesign.cell}`}>
                    <div className="flex gap-2">
                      <Avatar className="h-8 w-8">
                        {p.provider.profile_picture ? (
                          <AvatarImage src={p.provider.profile_picture} />
                        ) : (
                          <AvatarFallback>{p.provider.name}</AvatarFallback>
                        )}
                      </Avatar>
                      {p.provider.name}
                    </div>
                  </TableCell>
                  <TableCell
                    className={` 2xl:table-cell hidden  ${tableDesign.cell}`}
                  >
                    <div>
                      <p>{p.contact_information.phone}</p>
                      <p>{p.contact_information.email}</p>
                    </div>
                  </TableCell>

                  <TableCell
                    className={`xl:table-cell hidden ${tableDesign.cell}  ${
                      p.active_plan === "Basic"
                        ? "text-[#334155]"
                        : "text-[#1D4ED8]"
                    } 
            `}
                  >
                    {p.active_plan}
                  </TableCell>
                  <TableCell
                    className={`lg:table-cell hidden  ${tableDesign.cell} ${
                      p.verification_plan === "Complete"
                        ? "text-[#334155]"
                        : "text-[#B91C1C]"
                    } 
                
              `}
                  >
                    {p.verification_plan}
                  </TableCell>
                  <TableCell className={`  ${tableDesign.cell}`}>
                    <div
                      onClick={() => handleOpenSubscriptionInfo(p.provider.id)}
                      className="flex justify-center gap-3 cursor-pointer"
                    >
                      <Eye size={18} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="w-full  flex items-center justify-center lg:justify-end mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={data?.data.pagination.total_pages || 1}
              onPageChange={setCurrentPage}
            />
          </div>
        </CommonBorderWrapper>
      )}

      {isSubscriptionInfoOpen && (
        <SubscriptionInfoCard
          selectedSubscriptionId={selectedSubscriptionId}
          onClose={handleCloseSubscriptionInfo}
        />
      )}
    </>
  );
};

export default SubscriptionTable;
