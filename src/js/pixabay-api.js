import axios from 'axios';

const API_KEY = '44800036-3797b6ab3e55b410f8e06bcc9'; 
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, per_page = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
