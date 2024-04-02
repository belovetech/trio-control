export interface Login {
  email: string;
  password: string;
}

export interface CompanyDetails {
  id: string;
  company_name: string;
  total_users: number;
  total_products: number;
  company_logo: string;
}
