
$( document ).ready(function() {
	fetchBookmarks()
});

$('.url-submit').on('click', (e) => {
  e.preventDefault();
});

$(document).on('click', '.folder-listitem', function(e) {
  var id = e.target.value
  fetchFolder(id)
});

$('.add-url-button').on('click', (e) => {
  e.preventDefault();
  let url = $('.add-url-input').val()
  let folderID = $('option:selected').attr('id');
  console.log(url, folderID)

  axios.post('/api/urls', {
    url,
    folderID
  })
  .then((response) => {
    $('.url-display').append(`
      <li>
      <a href='${url}'>short URL</a>
      </li>
    `);
  })
  .catch(function(error) {
    console.log('error fetching urls');
  })
  $('.add-url-input').val('');
});


function fetchBookmarks () {
  axios.get('/api/folders')
  .then((response) => {
		response.data.map(function(folder) {
			$('.folder-display').append(`
          <li class='folders'>
      			<button
                value=${folder.id}
      					class='folder-listitem'>
      			${folder.title}
    						<span class="id">
    							${folder.id}
    						</span>
      			</button>
          </li>
      `);
			$('.folder-dropdown').append(`
				<option id=${folder.id}>${folder.title}</option>
				`);
			})
})
  .catch(function(error) {
  console.log('Error receiving bookmarks')
})
}

function fetchFolder(id){
	axios.get(`/api/folders/${id}`)
	.then((response) => {
		console.log(Object.values(response.data)[0].id, Object.values(response.data)[0].title )
	})
}
