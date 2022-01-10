export function fetchArticles(sendValue, numberPages) {
  const KEY = '25149934-751328f61e2da43ec1e4df823';
  const url = `https://pixabay.com/api/?key=${KEY}&q=${sendValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${numberPages}`;

  return fetch(url).then(r => r.json());
}
