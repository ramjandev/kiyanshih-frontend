import AlertDialogBox from "@/common/custom/AlertDialogBox";
import LoadingStatus from "@/common/custom/LoadingStatus";
import Pagination from "@/common/custom/Pagination";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import CommonSpace from "@/common/space/CommonSpace";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "@/redux/featuresAPI/adminApi/categoryApi";
import type { Category } from "@/redux/featuresAPI/adminApi/types/category";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import CategoryForm from "./CategoryForm";

export const tableHeaders = [
  { key: "sl", label: "SL", align: "text-center lg:table-cell hidden" },
  { key: "category", label: "Category name", align: "text-center" },
  {
    key: "categoryCount",
    label: "Sub category count",
    align: "text-center hidden lg:table-cell",
  },

  { key: "action", label: "Action", align: "text-center" },
];

const tableDesign = {
  header:
    "text-lg font-Geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12 leading-[28px]",
  cellHeader: "border border-border px-4 ",
  bodyRow:
    "text-[#2C2C2C] font-Geist text-lg font-normal md:h-12 leading-[28px] bg-white hover:bg-gray-50",
  cell: "border border-border px-4 text-center",
};
const CategoryTable = () => {
  const [current_page, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetCategoryQuery({
    current_page: current_page,
    page_size: 10,
  });

  const categoryData = data?.data.categories || [];
  const pagination = data?.data.pagination;
  const [isEditing, setIsEditing] = useState(false);
  const [initialValues, setInitialValues] = useState<Category | null>(null);

  const handleEdit = (category: Category) => {
    setIsEditing(true);
    setInitialValues(category);
  };
  const [deleteCategory , {isLoading: isDeleting}] = useDeleteCategoryMutation();
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteCategory(id).unwrap();
      toast.success(res.message);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };
  return (
    <>
      <LoadingStatus
        isLoading={isLoading}
        items={categoryData}
        itemName="category"
      />

      {!isLoading && categoryData.length > 0 && (
        <CommonSpace>
          <CommonBorderWrapper className=" border-0 !p-10">
            <Table className={tableDesign.header}>
              <TableHeader>
                <TableRow className="bg-[#EFF6FF] text-base text-[#2C2C2C] font-medium">
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
                {categoryData?.map((category) => (
                  <TableRow key={category.sl} className={tableDesign.bodyRow}>
                    <TableCell
                      className={` hidden lg:table-cell  ${tableDesign.cell}`}
                    >
                      {category.sl.toString().padStart(2, "0")}
                    </TableCell>
                    <TableCell className={`  ${tableDesign.cell}`}>
                      {category.category_name}
                    </TableCell>
                    <TableCell
                      className={` lg:table-cell hidden  ${tableDesign.cell}`}
                    >
                      {category.subcategory_name.length}
                    </TableCell>

                    <TableCell className={`  ${tableDesign.cell}`}>
                      <div className="flex justify-center gap-3 text-blue-500">
                        <button
                          onClick={() => handleEdit(category)}
                          className="hover:text-blue-700  cursor-pointer"
                        >
                          <FiEdit size={18} />
                        </button>
                        <AlertDialogBox
                          action={() => handleDelete(category.sl)}
                          isLoading={isDeleting}
                          trigger={
                            <button className="text-red-700  cursor-pointer">
                              <RiDeleteBinLine size={18} />
                            </button>
                          }
                        />
                   
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="w-full  flex items-center justify-center lg:justify-end mt-10 ">
              <Pagination
                currentPage={current_page}
                totalPages={pagination?.total_pages || 1}
                onPageChange={setCurrentPage}
              />
            </div>
          </CommonBorderWrapper>
        </CommonSpace>
      )}
      {isEditing && initialValues && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <CategoryForm
            initialValues={initialValues}
            setIsEditing={setIsEditing}
            setInitialValues={setInitialValues}
          />
        </div>
      )}
    </>
  );
};

export default CategoryTable;
