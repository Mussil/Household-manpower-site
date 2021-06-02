
const form = document.querySelector('form')
const emailError = document.querySelector('.email.error')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // reset errors
    emailError.textContent = ''

    // get values
    const email = form.email.value
    const name = form.name.value
    const bug = form.bug.value



    try {
        const res = await fetch('/bugReport', {
            method: 'POST',
            body: JSON.stringify({email, name, bug}),
            headers: {'Content-Type': 'application/json'}
        })
            const data = await res.json()
            console.log(data)
            if (data.errors) {
                emailError.textContent = data.errors.email
            }
            if(data.msg) { //successful
                emailError.textContent = data.msg



            }
        }
        catch (err) {
            console.log(err)
        }

})