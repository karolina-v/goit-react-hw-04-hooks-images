function fetchImages(name, page) {
    const API = {
        KEY_API: '25854357-73cc9e97f6c573caedd14922c',
        BASE_URL: 'https://pixabay.com/api/',
        per_page: 12,
        image_type: 'photo',
        orientation: 'horizontal',
    }
  


  const searchURL = `${API.BASE_URL}?q=${name}&page=${page}&key=${API.KEY_API}&image_type=${API.image_type}&orientation=${API.orientation}&per_page=${API.per_page}`;

    return fetch(searchURL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('По вашему запросу ничего не найдено!'));
      })
}


const api = {
  fetchImages
};

export default api;