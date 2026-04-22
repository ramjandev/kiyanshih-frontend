import image from "@/assets/images/image.svg";
import pdf from "@/assets/images/pdf.svg";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApproveProviderMutation } from "@/redux/featuresAPI/adminApi/providerApi";
import type { Provider } from "@/redux/featuresAPI/adminApi/types/provider";
import { type FC } from "react";
import { FaRegEye } from "react-icons/fa6";
import { IoCheckmarkOutline, IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";
interface ProviderTableProps {
  providers: Provider[];
  setSelectedProvider: (provider: Provider) => void;
}
const tableHeaders = [
  { label: "SL", align: "text-center hidden 2xl:table-cell" },
  { label: "Provider Information", align: "text-left" },
  { label: "Contact information", align: "text-left xl:table-cell hidden" },
  { label: "Insurance number", align: "text-center lg:table-cell hidden " },
  { label: "Documents(Govt id)", align: "text-center hidden 2xl:table-cell" },
  { label: "Professional Documents", align: "text-center" },
];

const tableDesign = {
  header:
    "text-lg font-Geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12 leading-[28px]",
  cellHeader: "border border-border px-4 ",
  bodyRow:
    "text-[#2C2C2C] font-Geist text-lg font-normal md:h-12 leading-[28px]",
  cell: "border border-border px-4 text-center",
};

const BackgroundTable: FC<ProviderTableProps> = ({
  providers,
  setSelectedProvider,
}) => {
  const [approveProvider] = useApproveProviderMutation();
  const handleApprove = async (providerId: number) => {
    try {
      const res = await approveProvider({
        id: providerId,
        data: { action: "approve", admin_notes: "verified" },
      }).unwrap();

      toast.success(res?.message || "Provider approved successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const handleReject = async (providerId: number) => {
    try {
      const res = await approveProvider({
        id: providerId,
        data: { action: "reject", admin_notes: "Unverified" },
      }).unwrap();

      toast.error(res?.message || "Provider rejected successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CommonBorderWrapper className=" !p-8 !border-0">
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
          {providers.map((p) => (
            <TableRow key={p.sl} className={tableDesign.bodyRow}>
              <TableCell
                className={` hidden 2xl:table-cell  ${tableDesign.cell}`}
              >
                {p.sl.toString().padStart(2, "0")}
              </TableCell>
              <TableCell className={`  ${tableDesign.cell}`}>
                <div className="flex gap-2">
                  <Avatar className="h-8 w-8">
                    {p.service_availability ? (
                      <AvatarImage src={p.service_name} />
                    ) : (
                      <AvatarFallback>{p.provider_name}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-medium">{p.provider_name}</p>
                    <p className="text-orange-500 text-xs">
                      ★ {p.rating.toFixed(1)}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell
                className={`xl:table-cell hidden  ${tableDesign.cell}`}
              >
                <div>
                  <p>{p.contact_phone}</p>
                  <p>{p.contact_email}</p>
                </div>
              </TableCell>
              <TableCell
                className={`hidden lg:table-cell  ${tableDesign.cell}`}
              >
                {p.provider_id}
              </TableCell>
              <TableCell
                className={`hidden 2xl:table-cell  ${tableDesign.cell}`}
              >
                <div className=" flex justify-center gap-2">
                  <img src={image} alt="" />
                  <img src={pdf} alt="" />
                </div>
              </TableCell>
              <TableCell className={`  ${tableDesign.cell}`}>
                <div className=" flex justify-center gap-4">
                  <span
                    onClick={() => setSelectedProvider(p)}
                    className=" text-2xl cursor-pointer text-[#1D4ED8]"
                  >
                    <FaRegEye />
                  </span>
                  <span
                    onClick={() => handleApprove(p.provider_id)}
                    className=" text-2xl cursor-pointer text-[#15803D]"
                  >
                    <IoCheckmarkOutline />
                  </span>
                  <span
                    onClick={() => handleReject(p.provider_id)}
                    className=" text-2xl cursor-pointer text-[#B91C1C]"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CommonBorderWrapper>
  );
};

export default BackgroundTable;
