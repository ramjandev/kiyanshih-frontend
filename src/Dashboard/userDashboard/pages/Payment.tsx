import CommonWrapper from "@/common/space/CommonWrapper";
import PaymentHistory from "../userComponents/paymentHistory/PaymentHistory";
import CurveSearch from "@/components/service/CurveSearch";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import { RiCalendarTodoFill } from "react-icons/ri";
import CommonSpace from "@/common/space/CommonSpace";
import { useGetAllPaymentHistoryQuery } from "@/redux/featuresAPI/userAPI/paymentHistory.api";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { type DateRange } from "react-day-picker";
import { format } from "date-fns";

const Payment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  // Handle search debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: allPayment, isLoading } = useGetAllPaymentHistoryQuery({
    search: debouncedSearch || undefined,
    from_date: date?.from ? format(date.from, "yyyy-MM-dd") : undefined,
    to_date: date?.to ? format(date.to, "yyyy-MM-dd") : undefined,
  });

  return (
    <CommonWrapper>
      <CommonSpace>
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
          <div className="flex items-center gap-5 w-full">
            <CurveSearch
              className="!max-w-[600px]"
              placeholder="Search by transaction ID or provider..."
              value={searchTerm}
              onChange={(val) => setSearchTerm(val)}
            />

            <Popover>
              <PopoverTrigger asChild>
                <ButtonWithIcon
                  icon={RiCalendarTodoFill}
                  className="!bg-white !text-[#0F172A] border border-border !py-4 !px-6 whitespace-nowrap"
                >
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd")} - {format(date.to, "LLL dd")}
                      </>
                    ) : (
                      format(date.from, "LLL dd")
                    )
                  ) : (
                    "Date Range"
                  )}
                </ButtonWithIcon>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 !border-none" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CommonSpace>

      <div className={isLoading ? "opacity-50 pointer-events-none transition-opacity" : "transition-opacity"}>
        <PaymentHistory transactions={allPayment?.results} />
      </div>
    </CommonWrapper>
  );
};

export default Payment;
