import { fetchImages } from './js/pixabay-api.js';
import {
  clearGallery,
  renderImages,
  showNoResultsMessage,
  showLoadingIndicator,
  hideLoadingIndicator,
  showLoadMoreButton,
  hideLoadMoreButton,
  showEndOfResultsMessage,
} from './js/render-functions.js';

let query = '';
let page = 1;
let totalHits = 0;

const form = document.querySelector('#search-form');
const input = form.querySelector('input');
const loadMoreButton = document.querySelector('#load-more');

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = input.value.trim();
  if (!query) {
    return;
  }

  clearGallery();
  hideLoadMoreButton(); // Приховуємо кнопку перед початком нового пошуку
  showLoadingIndicator();
  page = 1;

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;
    if (data.hits.length === 0) {
      showNoResultsMessage();
    } else {
      renderImages(data.hits);
      if (data.hits.length < totalHits) {
        showLoadMoreButton(); // Відображаємо кнопку після успішного отримання результатів
      }
    }
  } catch (error) {
    console.error('Error:', error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoadingIndicator();
  }
});

loadMoreButton.addEventListener('click', async () => {
  showLoadingIndicator();
  page += 1;

  try {
    const data = await fetchImages(query, page);
    if (data.hits.length === 0 || page * 15 >= totalHits) {
      showEndOfResultsMessage();
      hideLoadMoreButton(); // Приховуємо кнопку, якщо більше немає результатів
    } else {
      renderImages(data.hits);
      window.scrollBy({
        top:
          document
            .querySelector('.gallery')
            .firstElementChild.getBoundingClientRect().height * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    console.error('Error:', error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoadingIndicator();
  }
});
