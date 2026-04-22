export interface StatCard {
  title: string;
  amount: string;
  subtitle: string;
  icon: React.ReactNode;
}

export interface Payment {
  id: string;
  job: string;
  projectType: string;
  completed: string;
  from: string;
  to: string;
  accepted: string;
  total: string;
  status: "Accepted" | "In-Progress" | "Cancel-Booking" | "Review-Request";
}

export interface CompletedPayment {
  id: string;
  job: string;
  projectType: string;
  completed: string;
  from: string;
  to: string;
  accepted: string;
  amount: string;
  platformFee: string;
  providerReceived: string;
}
