import img from "@/assets/images/man.png";

export interface User {
  sl: number;
  userName: string;
  avatar?: string;
  contactPhone: string;
  contactEmail: string;
  totalBookings: number;
  status: "Pending" | "Cancelled" | "Rejected" | "Accepted" | "In-progress";
}

export const userData: User[] = [
  {
    sl: 1,
    userName: "Alice Johnson",
    avatar: img,
    contactPhone: "+880111111111",
    contactEmail: "alice@example.com",
    totalBookings: 5,
    status: "Pending",
  },
  {
    sl: 2,
    userName: "Bob Smith",
    avatar: img,
    contactPhone: "+880222222222",
    contactEmail: "bob@example.com",
    totalBookings: 8,
    status: "Accepted",
  },
  {
    sl: 3,
    userName: "Charlie Brown",
    avatar: img,
    contactPhone: "+880333333333",
    contactEmail: "charlie@example.com",
    totalBookings: 3,
    status: "Cancelled",
  },
  {
    sl: 4,
    userName: "Diana Prince",
    avatar: img,
    contactPhone: "+880444444444",
    contactEmail: "diana@example.com",
    totalBookings: 12,
    status: "In-progress",
  },
  {
    sl: 5,
    userName: "Ethan Hunt",
    avatar: img,
    contactPhone: "+880555555555",
    contactEmail: "ethan@example.com",
    totalBookings: 9,
    status: "Accepted",
  },
  {
    sl: 6,
    userName: "Fiona Gallagher",
    avatar: img,
    contactPhone: "+880666666666",
    contactEmail: "fiona@example.com",
    totalBookings: 7,
    status: "Rejected",
  },
  {
    sl: 7,
    userName: "George Miller",
    avatar: img,
    contactPhone: "+880777777777",
    contactEmail: "george@example.com",
    totalBookings: 4,
    status: "Pending",
  },
  {
    sl: 8,
    userName: "Hannah Lee",
    avatar: img,
    contactPhone: "+880888888888",
    contactEmail: "hannah@example.com",
    totalBookings: 11,
    status: "In-progress",
  },
  {
    sl: 9,
    userName: "Ian Wright",
    avatar: img,
    contactPhone: "+880999999999",
    contactEmail: "ian@example.com",
    totalBookings: 6,
    status: "Cancelled",
  },
  {
    sl: 10,
    userName: "Jasmine Taylor",
    avatar: img,
    contactPhone: "+880101010101",
    contactEmail: "jasmine@example.com",
    totalBookings: 14,
    status: "Accepted",
  },
  {
    sl: 11,
    userName: "Kevin Hart",
    avatar: img,
    contactPhone: "+880111222333",
    contactEmail: "kevin@example.com",
    totalBookings: 2,
    status: "Rejected",
  },
  {
    sl: 12,
    userName: "Laura Wilson",
    avatar: img,
    contactPhone: "+880444555666",
    contactEmail: "laura@example.com",
    totalBookings: 10,
    status: "In-progress",
  },
  {
    sl: 13,
    userName: "Michael Scott",
    avatar: img,
    contactPhone: "+880777888999",
    contactEmail: "michael@example.com",
    totalBookings: 13,
    status: "Pending",
  },
  {
    sl: 14,
    userName: "Nina Dobrev",
    avatar: img,
    contactPhone: "+880121212121",
    contactEmail: "nina@example.com",
    totalBookings: 15,
    status: "Accepted",
  },
  {
    sl: 15,
    userName: "Oscar Isaac",
    avatar: img,
    contactPhone: "+880131313131",
    contactEmail: "oscar@example.com",
    totalBookings: 1,
    status: "Cancelled",
  },
];
