export interface Service {
  service_code: string;
  service_icon: string;
  service_name: string;
  service_tariff: number;
}

export interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}

export interface TransactionHistory{
  created_on: string;
  description: string;
  invoice_number: string;
  total_amount: number;
  transaction_type: "TOPUP" | "PAYMENT"
}