import fetchData from './fetchData';

export interface UpdateCompanyDto {
  company_name: string;
  total_users: number;
  total_products: number;
}

export const updateCompany = async (
  company: UpdateCompanyDto,
  company_id: string,
  token?: string
) => {
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response = await fetchData(`/companies/${company_id}`, {
      method: 'PATCH',
      body: JSON.stringify(company),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error('editCompanyError', error);
    throw new Error((error as Error).message);
  }
};
