import FetchData from './fetchData';

export const uploadFile = async (
  file: File,
  company_id: string,
  token: string
) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await FetchData(`/files/${company_id}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    return response;
  } catch (error) {
    console.error('uploadFileError', error);
    throw new Error((error as Error).message);
  }
};
