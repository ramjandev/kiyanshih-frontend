export type Transaction = {
  sl: number;
  bookingId: string;
  bookingDate: {
    date: string;
    time: string;
  };
  serviceLocation: string;
  customerInfo: {
    name: string;
    phone: string;
  };
  providerInfo: {
    name: string;
    phone: string;
  };
  totalAmount: string;
  status: "Paid" | "Refund";
};

export const TransactionData: Transaction[] = [
  {
    sl: 1,
    bookingId: "100129",
    bookingDate: { date: "25-Aug-2025", time: "11:25am" },
    serviceLocation: "Customer Location",
    customerInfo: { name: "Charlotte Davis", phone: "+5596965" },
    providerInfo: { name: "Jemmi Kolly", phone: "+5596965" },
    totalAmount: "482.50$",
    status: "Paid",
  },
  {
    sl: 2,
    bookingId: "100130",
    bookingDate: { date: "25-Aug-2025", time: "11:30am" },
    serviceLocation: "Customer Location",
    customerInfo: { name: "Alice Johnson", phone: "+5596970" },
    providerInfo: { name: "Mark Smith", phone: "+5596971" },
    totalAmount: "320.00$",
    status: "Refund",
  },
  {
    sl: 3,
    bookingId: "100131",
    bookingDate: { date: "25-Aug-2025", time: "11:45am" },
    serviceLocation: "Customer Location",
    customerInfo: { name: "David Lee", phone: "+5596972" },
    providerInfo: { name: "Samantha Brown", phone: "+5596973" },
    totalAmount: "250.00$",
    status: "Paid",
  },
  {
    sl: 4,
    bookingId: "100132",
    bookingDate: { date: "25-Aug-2025", time: "12:00pm" },
    serviceLocation: "Customer Location",
    customerInfo: { name: "Emily Clark", phone: "+5596974" },
    providerInfo: { name: "John Doe", phone: "+5596975" },
    totalAmount: "400.00$",
    status: "Refund",
  },
  {
    sl: 5,
    bookingId: "100133",
    bookingDate: { date: "25-Aug-2025", time: "12:15pm" },
    serviceLocation: "Customer Location",
    customerInfo: { name: "Michael Scott", phone: "+5596976" },
    providerInfo: { name: "Dwight Schrute", phone: "+5596977" },
    totalAmount: "150.00$",
    status: "Paid",
  },
  {
    sl: 6,
    bookingId: "100134",
    bookingDate: { date: "25-Aug-2025", time: "12:30pm" },
    serviceLocation: "Customer Location",
    customerInfo: { name: "Pam Beesly", phone: "+5596978" },
    providerInfo: { name: "Jim Halpert", phone: "+5596979" },
    totalAmount: "275.00$",
    status: "Paid",
  },
  {
    sl: 7,
    bookingId: "100135",
    bookingDate: { date: "25-Aug-2025", time: "12:45pm" },
    serviceLocation: "Customer Location",
    customerInfo: { name: "Stanley Hudson", phone: "+5596980" },
    providerInfo: { name: "Phyllis Vance", phone: "+5596981" },
    totalAmount: "500.00$",
    status: "Paid",
  },
  {
    sl: 8,
    bookingId: "100136",
    bookingDate: { date: "25-Aug-2025", time: "01:00pm" },
    serviceLocation: "Customer Location",
    customerInfo: { name: "Kevin Malone", phone: "+5596982" },
    providerInfo: { name: "Oscar Martinez", phone: "+5596983" },
    totalAmount: "220.00$",
    status: "Paid",
  },
  {
    sl: 9,
    bookingId: "100137",
    bookingDate: { date: "25-Aug-2025", time: "01:15pm" },
    serviceLocation: "Customer Location",
    customerInfo: { name: "Angela Martin", phone: "+5596984" },
    providerInfo: { name: "Darryl Philbin", phone: "+5596985" },
    totalAmount: "380.00$",
    status: "Refund",
  },
  {
    sl: 10,
    bookingId: "100138",
    bookingDate: { date: "25-Aug-2025", time: "01:30pm" },
    serviceLocation: "Customer Location",
    customerInfo: { name: "Ryan Howard", phone: "+5596986" },
    providerInfo: { name: "Kelly Kapoor", phone: "+5596987" },
    totalAmount: "430.00$",
    status: "Paid",
  },
  {
    sl: 11,
    bookingId: "100139",
    bookingDate: { date: "25-Aug-2025", time: "01:45pm" },
    serviceLocation: "Customer Location",
    customerInfo: { name: "Toby Flenderson", phone: "+5596988" },
    providerInfo: { name: "Creed Bratton", phone: "+5596989" },
    totalAmount: "310.00$",
    status: "Refund",
  },
  {
    sl: 12,
    bookingId: "100140",
    bookingDate: { date: "25-Aug-2025", time: "02:00pm" },
    serviceLocation: "Customer Location",
    customerInfo: { name: "Meredith Palmer", phone: "+5596990" },
    providerInfo: { name: "Oscar Martinez", phone: "+5596991" },
    totalAmount: "290.00$",
    status: "Paid",
  },
  {
    sl: 13,
    bookingId: "100141",
    bookingDate: { date: "25-Aug-2025", time: "02:15pm" },
    serviceLocation: "Customer Location",
    customerInfo: { name: "Holly Flax", phone: "+5596992" },
    providerInfo: { name: "Michael Scott", phone: "+5596993" },
    totalAmount: "360.00$",
    status: "Paid",
  },
  {
    sl: 14,
    bookingId: "100142",
    bookingDate: { date: "25-Aug-2025", time: "02:30pm" },
    serviceLocation: "Customer Location",
    customerInfo: { name: "Jan Levinson", phone: "+5596994" },
    providerInfo: { name: "Ryan Howard", phone: "+5596995" },
    totalAmount: "410.00$",
    status: "Paid",
  },
  {
    sl: 15,
    bookingId: "100143",
    bookingDate: { date: "25-Aug-2025", time: "02:45pm" },
    serviceLocation: "Customer Location",
    customerInfo: { name: "Oscar Martinez", phone: "+5596996" },
    providerInfo: { name: "Stanley Hudson", phone: "+5596997" },
    totalAmount: "350.00$",
    status: "Paid",
  },
];
