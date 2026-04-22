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
import { useGetUserDataQuery } from "@/redux/featuresAPI/adminApi/categoryApi";
import type { User } from "@/redux/featuresAPI/adminApi/types/user";
import { Eye } from "lucide-react";
import { useState } from "react";
import UserProfileModal from "./UserProfileModal";

const defaultStatusColors: Record<User["status"], string> = {
  Active: "text-[#2DD4BF]",
  Inactive: "text-[#DB2777]",
};

const tableHeaders = [
  { label: "SL", align: "text-center hidden 2xl:table-cell" },
  { label: "User name", align: "text-center" },
  { label: "Contact information", align: "text-center xl:table-cell hidden" },
  { label: "Total Bookings", align: "text-center lg:table-cell hidden" },
  { label: "Status", align: "text-center" },
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
const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetUserDataQuery({
    current_page: currentPage,
    page_size: 10,
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsProfileModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsProfileModalOpen(false);
    setSelectedUser(null);
  };
  return (
    <>
      <LoadingStatus
        isLoading={isLoading}
        items={data?.data.users}
        itemName="users"
      />
      <CommonBorderWrapper className=" border-0 !p-10">
        {!isLoading && data?.data.users && data?.data.users.length > 0 && (
          <Table className="">
            <TableHeader>
              <TableRow className={tableDesign.header}>
                {tableHeaders.map((header) => (
                  <TableHead
                    key={header.label}
                    className={` ${tableDesign.cellHeader} ${header.align}`}
                  >
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.data.users.map((p) => (
                <TableRow key={p.sl} className={tableDesign.bodyRow}>
                  <TableCell
                    className={`hidden 2xl:table-cell  ${tableDesign.cell}`}
                  >
                    {p.sl.toString().padStart(2, "0")}
                  </TableCell>
                  <TableCell className={`  ${tableDesign.cell}`}>
                    <div className="flex gap-2">
                      <Avatar className="h-8 w-8">
                        {p.profile_picture ? (
                          <AvatarImage src={p.profile_picture} />
                        ) : (
                          <AvatarFallback>{p.user_name}</AvatarFallback>
                        )}
                      </Avatar>
                      {p.user_name}
                    </div>
                  </TableCell>
                  <TableCell
                    className={`xl:table-cell hidden  ${tableDesign.cell}`}
                  >
                    <div>
                      <p>{p.contact_information.phone}</p>
                      <p>{p.contact_information.email}</p>
                    </div>
                  </TableCell>
                  <TableCell
                    className={`hidden lg:table-cell  ${tableDesign.cell}`}
                  >
                    {p.total_bookings}
                  </TableCell>
                  <TableCell
                    className={`  border border-border text-center font-medium ${
                      defaultStatusColors[p.status]
                    }`}
                  >
                    {p.status}
                  </TableCell>
                  <TableCell className={`  ${tableDesign.cell}`}>
                    <div
                      onClick={() => handleEdit(p)}
                      className="flex justify-center gap-3 cursor-pointer"
                    >
                      <Eye size={18} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <div className="w-full flex items-center justify-between lg:justify-end mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={data?.data.pagination.total_pages || 1}
            onPageChange={setCurrentPage}
          />
        </div>
      </CommonBorderWrapper>

      {isProfileModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="sm:max-w-2xl w-full  bg-white border border-border rounded-xl p-6">
            <UserProfileModal user={selectedUser} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default UserTable;
