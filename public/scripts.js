
$( document ).ready(function() {
	fetchBookmarks()

});

$('.url-submit').on('click', (e) => {
  e.preventDefault();
  console.log("hello");
});

$('.folder-submit').on('click', (e) => {
  console.log("hello");
});

$(document).on('click', '.folder-listitem', function(e) {
	var id = e.target.value
	fetchFolder(id)
})

function fetchBookmarks () {
  axios.get('/api/folders')
  .then((response) => {
debugger
		response.data.map(function(folder) {
			$('.folder-display').append(`<li>
																		<button value=${folder.id}
																				class='folder-listitem'>
																				${folder.title}
																					<span class="id">
																						${folder.id}
																					</span>
																			</button>
																		</li>`);
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

function mapId(){
	// axios.get('/api/folders')
	// .then((response) => {
	// 	response.data.map(function(item) {
	// 		return {item.id: item.title}
	// 	})
	// }
}
