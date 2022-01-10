// export function onSearch(e) {
//   e.preventDefault();

//   const searchQuery = e.currentTarget.elements.query.value;

//   const option = {
//     headers: {
//       Authorization: '25149934-751328f61e2da43ec1e4df823',
//     },
//   };
//   const url = `https://newsapi.org/v2/everything?q=${searchQuery}&language=en&pageSize=5&page=1`;

//   fetch(url, option)
//     .then(r => r.json())
//     .then(console.log);
// }
