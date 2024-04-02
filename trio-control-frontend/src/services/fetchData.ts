import { BASE_URL } from '../utils/constants';

console.log(BASE_URL);

async function fetchData(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching data');
  }
}

export default fetchData;
