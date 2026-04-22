import Pagination from "@/common/custom/Pagination";
import SingleProviderReview from "@/components/service/SingleProvider/SingleProviderReview";

export default function ProviderReview() {
  return (
    <div>
      <div className="mb-5">
        <h3 className="text-xl font-semibold mb-2">Review From Clients</h3>
        <p className="text-slate-600 font-medium">Total review: 170 review</p>
      </div>

      <div className="">
        <SingleProviderReview />
      </div>

      {/* pagination */}
      <div className="flex justify-end mt-7">
        <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
      </div>
    </div>
  );
}
