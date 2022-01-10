import './css/common.css';
import { fetchArticles } from './js/fetch-articles';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import '../node_modules/simplelightbox/dist/simple-lightbox.min.css';
import { addHtml } from './js/add-html';

// Your API key: 25149934-751328f61e2da43ec1e4df823

const refs = {
  searchForm: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
  divLoadmoreBtn: document.querySelector('.div-load-more'),
};

let numberPages = 1;
let searchValue = '';

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  let sendValue = e.currentTarget.searchQuery.value;
  searchValue = sendValue.trim();
  numberPages = 1;

  if (searchValue === '') {
    refs.divLoadmoreBtn.classList.add('visually-hidden');
    Notiflix.Notify.failure(`Если ничего не ищешь, ничего не найдёш`);
    return clearArticlesContainer();
  }

  refs.divLoadmoreBtn.classList.remove('visually-hidden');
  refs.divLoadmoreBtn.classList.add('div-load-more-animation');

  clearArticlesContainer();

  appendImgMarkup(sendValue, numberPages);
}

function onLoadMore() {
  numberPages += 1;

  loadNewImg(searchValue, numberPages);
  scroll();
}

function clearArticlesContainer() {
  refs.gallery.innerHTML = '';
}

function loadNewImg(sendValue, numberPages) {
  fetchArticles(sendValue, numberPages).then(arrImg => {
    Notiflix.Notify.success(`Hooray! Your next 40 images.`);
    refs.gallery.innerHTML += addHtml(arrImg.hits).join('');
    let gallerySet = new SimpleLightbox('.gallery__item', {
      captionPosition: 'bottom',
      captionDelay: 250,
    });
    gallerySet.on('show.simplelightbox');
  });
}

function appendImgMarkup(sendValue, numberPages) {
  fetchArticles(sendValue, numberPages)
    .then(arrImg => {
      if (arrImg.hits === 0) {
        Notiflix.Notify.warning(`Hooray! We found ${arrImg.hits} images.`);
        return;
      }
      if (arrImg.totalHits === 0) {
        refs.divLoadmoreBtn.classList.add('visually-hidden');
      }
      Notiflix.Notify.success(`Hooray! We found ${arrImg.totalHits} images.`);
      refs.gallery.innerHTML += addHtml(arrImg.hits).join('');
      let gallerySet = new SimpleLightbox('.gallery__item', {
        captionPosition: 'bottom',
        captionDelay: 250,
      });
      gallerySet.on('show.simplelightbox');
    })
    .catch(error => {
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    });
}

function scroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
