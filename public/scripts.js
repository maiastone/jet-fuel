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

$('.add-folder-button').on('click', (e) => {
	e.preventDefault();
	let title = $('.add-folder-input').val();
	let folderID = Math.floor((Math.random() * 100) + 1);
	axios.post('/api/folders', {
		title,
		folderID
	})
	.then((response) => {
		$('.folder-display').append(`<button
						value=${folderID}
						class='folder'>
						${title}
						<span class="id">
							${folderID}
						</span>
						</button>`);
		$('.folder-dropdown').append(`
			<option id=${folderID}>${title}</option>
			`);
	})
	.catch(function(error) {
		console.log('error posting folder');
	})
	$('.add-folder-input').val('');
});


$(document).on('click', '.folder', function(e) {
	e.preventDefault();
	let id = e.target.value;
	axios.get('/api/urls/')
	.then((response) => {
		for (let i=0; i<response.data.length; i++) {
			if (parseInt(id) === response.data[i].folderID) {
			$('.url-display').append(`<li>
				<a href='${(response.data[i].url)}' target='_blank'>https://jet.ly/${response.data[i].shortURL}</a>
				</li>`);
			}
		}
	})
});


$('.add-url-button').on('click', (e) => {
  e.preventDefault();
  let url = $('.add-url-input').val()
  let folderID = $('option:selected').attr('id');

  axios.post('/api/urls', {
    url,
    folderID,
  })
  .then((response) => {
		for (let i=0; i<response.data.length; i++) {
			if (url === response.data[i].url) {
    $('.url-display').append(`
      <li>
      <a href='${url}' target='_blank'>http://jet.ly/${response.data[i].shortURL}</a>
      </li>
    `);
			}
		}
  })
  .catch(function(error) {
    console.log('error posting urls');
  })
  $('.add-url-input').val('');
});
