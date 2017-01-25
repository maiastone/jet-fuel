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
			})
		})


  .catch(function(error) {
  console.log('Error receiving bookmarks')
})
}

function fetchFolder(id){
	console.log(id)


}

function mapId(){
	// axios.get('/api/folders')
	// .then((response) => {
	// 	response.data.map(function(item) {
	// 		return {item.id: item.title}
	// 	})
	// }
}
