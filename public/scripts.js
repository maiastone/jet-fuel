function showFolders(jsonData) {
  $('.folders').append(`
    <div class="folder" id=${jsonData.id}>
      <a href="http://localhost:3000/api/folders/${jsonData.id}">${jsonData.folder_title}</a>
    </div>
  `)
  $('.folder-dropdown').append(`
    <option id=${jsonData.id}>${jsonData.folder_title}</option>
    `)
}

function showURLs(jsonData) {
	$('.urls').append(`
    <div class="url" id=${jsonData.id}>
      <a href="http://${jsonData.original_url}" target="_blank" class="individual-url">${jsonData.short_url}</a>
    </div>
  `)
}

$.get('/api/folders', function(data) {
  for(var key in data) {
    if (data.hasOwnProperty(key))
    $('.folders').append(`
      <div class="folder" id=${data[key].id}>
        <p>${data[key].folder_title}</p>
      </div>
    `)
    $('.folder-dropdown').append(`
      <option id=${data[key].id}>${data[key].folder_title}</option>
      `)
  }
})

$('.add-folder-button').on('click', function(e) {
  e.preventDefault()

  $.ajax({
    url: '/api/folders',
    type: 'post',
    data: {
      folder: $('.add-folder-input').val()
    },
    success: showFolders
  })
})

$('.add-url-button').on('click', function(e) {
  e.preventDefault()

  $.ajax({
    url: '/api/urls',
    type: 'post',
    data: {
      url: $('.add-url-input').val(),
      folderId: $('option:selected').attr('id')
    },
		success: showURLs
  })
})
