import CommonButton from "@/common/button/CommonButton";
import { useLazyDownloadPDFQuery } from "@/redux/featuresAPI/adminApi/bookingApi";
import DashboardSearch from "./DashboardSearch";

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  // lazy query hook
  const [downloadPDF, { isLoading }] = useLazyDownloadPDFQuery();

  const handleDownload = async () => {
    try {
      // call the API
      const result = await downloadPDF().unwrap();

      // Assuming API returns PDF as Blob or base64
      // If API returns Blob directly:
      const blob = new Blob([result], { type: "application/pdf" });

      // Create URL for new tab
      const url = window.URL.createObjectURL(blob);

      // Open in new tab
      const newTab = window.open(url, "_blank");
      if (newTab) {
        newTab.focus();
      }

      // Optional: automatically download the file
      const link = document.createElement("a");
      link.href = url;
      link.download = "booking.pdf";
      link.click();

      // Clean up URL object
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download PDF:", err);
    }
  };

  return (
    <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-6">
      <DashboardSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="flex gap-2">
        <CommonButton
          onClick={handleDownload}
          className="!py-3"
          disabled={isLoading}
        >
          {isLoading ? "Downloading..." : "Download as pdf"}
        </CommonButton>
      </div>
    </div>
  );
};

export default SearchFilter;
