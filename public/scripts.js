$( document ).ready(function() {
	fetchBookmarks()
});

$('.url-submit').on('click', (e) => {
  e.preventDefault();
});

$(document).on('click', '.folder', function(e) {
	e.preventDefault();
  var id = e.target.value
  fetchFolder(id)
});

function fetchFolder(id){
	axios.get(`/api/folders/${id}`)
	.then((response) => {
	 Object.values(response.data)[0].title;
	})
}

$(document).on('click', '.folder', function(e) {
	e.preventDefault();
	let id = e.target.value;
	axios.get('/api/urls/')
	.then((response) => {
		debugger;
		for (let i=0; i<response.data.length; i++) {
			if (id === response.data[i].folderID) {
			let folderIds = (response.data[i].folderID);
			$('.url-display').append(`<li>${response.data[i].url}</li>`);
			console.log(response.data[i].url);
			}
		}
	})
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
      					class='folder'>
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
