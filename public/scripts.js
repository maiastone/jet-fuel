

$('.url-submit').on('click', (e) => {
  e.preventDefault();
  console.log("hello");
});

$('.folder-submit').on('click', (e) => {
  fetchBookmarks();
  console.log("hello");
});

function fetchBookmarks () {
  axios.get('/api/folders')
  .then((response) => {
		result = response.data.map(function(item) {
			return item.title
			})
		$('.folder-display').append(result);
		console.log(result)
		})
  .catch(function(error) {
  console.log('Error receiving bookmarks')
})
}
