

function  myDeleteFunction  () {
    console.log('in function here')
    let toDelete = confirm('Are you sure you want to remove yourself from the website? ?!?\nWatch out! There is no way back once you clicked OK.\nWe will miss you :)')
    //
    if(!toDelete){
        return
    } // true if OK is pressed

    const endpoint = '/profileContractor'
    fetch(endpoint, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => window.location.href = data.redirect)
        .catch(err => console.log(err))
}