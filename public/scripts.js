$( document ).ready(function() {
	fetchFolders()
});

function fetchFolders () {
  axios.get('/api/folders')
  .then((response) => {
		response.data.map(function(folder) {
			$('.folder-display').append(`
          <li class='folders'>
      			<button
                value=${folder.folderID}
      					class='folder'>
      			${folder.title}
    						<span class="id">
    							${folder.folderID}
    						</span>
      			</button>
          </li>
      `);
			$('.folder-dropdown').append(`
				<option id=${folder.folderID}>${folder.title}</option>
				`);
			})
})
  .catch(function(error) {
  console.log('Error receiving folders')
})
}

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
		console.log(id, 'id');
		for (let i=0; i<response.data.length; i++) {
			console.log(i, 'i');
			if (parseInt(id) === response.data[i].folderID) {
				console.log(response.data[i].folderID, 'folderID');
			$('.url-display').append(`<li>${(response.data[i].url)}</li>`);
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
