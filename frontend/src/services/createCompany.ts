import fetchData from './fetchData';

export interface CreateCompanyDto {
  id: string;
  company_name: string;
  total_users: number;
  total_products: number;
  percentage: string;
  company_logo: string;
}

export const createCompany = async (
  company: CreateCompanyDto,
  token?: string
) => {
  try {
    const response = await fetchData('/companies', {
      method: 'POST',
      body: JSON.stringify(company),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('unable to create company');
    }

    return response;
  } catch (error) {
    console.error('createCompanyError', error);
    throw new Error((error as Error).message);
  }
};
