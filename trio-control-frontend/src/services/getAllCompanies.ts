import fetchData from './fetchData';

export const getAllCompany = async (token?: string) => {
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response = await fetchData(`/companies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('getAllCompany', error);
    throw new Error((error as Error).message);
  }
};
