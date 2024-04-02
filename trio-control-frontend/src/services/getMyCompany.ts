import fetchData from './fetchData';

export const getMyCompany = async (token?: string) => {
  try {
    const response = await fetchData(`/companies/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

  
    return response;
  } catch (error) {
    console.error('getMyCompany', error);
    throw new Error((error as Error).message);
  }
};
