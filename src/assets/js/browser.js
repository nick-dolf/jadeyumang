// Update PUT
function updatePage(page) {
  const data = new FormData(document.getElementById('pageForm'))
  axios.put("./" + page, data)
    .then( res => {
      location.href = page
    })
    .catch(err => {
      console.error(err.message)
    })
}

// Delete DELETE
function deletePage(page) {
  axios.delete("pages/series/" + page)
  .then( res => {
    console.log(res)
  })
}
