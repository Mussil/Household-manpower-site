
const form = document.querySelector('form')
const emailError = document.querySelector('.email.error')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // reset errors
    emailError.textContent = ''

    // get values
    const email = form.email.value

    try {
        const res = await fetch('/forgotEmployer', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        console.log(data)
        if (data.errors) {
            emailError.textContent = data.errors.email
        }
        if(data.user) { //successful
            console.log('Fd')
            emailError.textContent = 'email sent successfully'
        }
    }
    catch (err) {
        console.log(err)
    }
})

