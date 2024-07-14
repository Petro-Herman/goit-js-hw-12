import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let lightbox;

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
      <a class="gallery-item" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="360px" height="252px"/>
        <div class="info info-wrap">
          <p class="info-item info-item-css"><b>Likes:</b> ${likes}</p>
          <p class="info-item info-item-css"><b>Views:</b> ${views}</p>
          <p class="info-item info-item-css"><b>Comments:</b> ${comments}</p>
          <p class="info-item info-item-css"><b>Downloads:</b> ${downloads}</p>
        </div>
      </a>
    `;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

export function showNoResultsMessage() {
  iziToast.info({
    title: 'Sorry',
    message:
      'There are no images matching your search query. Please try again!',
  });
}

export function showLoadingIndicator() {
  const loader = document.querySelector('.loader');
  loader.classList.remove('hidden');
}

export function hideLoadingIndicator() {
  const loader = document.querySelector('.loader');
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  const loadMoreButton = document.querySelector('#load-more');
  loadMoreButton.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  const loadMoreButton = document.querySelector('#load-more');
  loadMoreButton.classList.add('hidden');
}

export function showEndOfResultsMessage() {
  iziToast.info({
    title: 'End of results',
    message: "We're sorry, but you've reached the end of search results.",
  });
}
