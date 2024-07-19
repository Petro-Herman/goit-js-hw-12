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
const per_page = 15;

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
  hideLoadMoreButton(); 
  showLoadingIndicator();
  page = 1;

  try {
    const data = await fetchImages(query, page, per_page);
    totalHits = data.totalHits;
    // console.log('Total hits:', totalHits); 
    if (data.hits.length === 0) {
      showNoResultsMessage();
    } else {
      renderImages(data.hits);
      if (page * per_page < totalHits) {
        showLoadMoreButton(); 
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
  // console.log('Current page:', page); 

  try {
    const data = await fetchImages(query, page, per_page);
    renderImages(data.hits);

    if (page * per_page >= totalHits) {
      showEndOfResultsMessage();
      hideLoadMoreButton();
    } else {
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
