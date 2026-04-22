import CategoryTop from "@/Dashboard/Admin/components/category/CategoryTop";
import CategoryTable from "../../components/category/CategoryTable";
import CategoryForm from "@/Dashboard/Admin/components/category/CategoryForm";

const CategorySetUp = () => {
  return (
    <div>
      <CategoryTop />
      <CategoryForm />
      <CategoryTable />
    </div>
  );
};

export default CategorySetUp;
