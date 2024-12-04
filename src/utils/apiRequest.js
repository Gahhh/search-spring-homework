const APIENDPOINT = 'http://api.searchspring.net/api/search/search.json';

export const fetchData = async (q, page, siteId='scmq7n',resultsFormat='native') => {
  const url = `${APIENDPOINT}?siteId=${siteId}&q=${q}&resultsFormat=${resultsFormat}&page=${page}`;
  try {
    const response = await fetch(`${url}`);
    return response;
  } catch (error) {
    return error;
  }
}