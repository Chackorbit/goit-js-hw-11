export async function fetchArticles(sendValue, numberPages) {
  const KEY = '25149934-751328f61e2da43ec1e4df823';
  const url = `https://pixabay.com/api/?key=${KEY}&q=${sendValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${numberPages}`;

  const r = await fetch(url);
  return await r.json();
}
