

    const form = document.querySelector('form')
    const emailError = document.querySelector('.email.error')
    const passwordError = document.querySelector('.password.error')


    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        //reset errors mesg
        emailError.textContent = ''
        passwordError.textContent = ''


        // get values
        const email = form.email.value
        const password = form.password.value
        const conPass = form.configurePassword.value
        const firstName = form.firstName.value
        const lastName = form.lastName.value
        const phoneNumber = form.phoneNumber.value
        const city = form.city.value
        const street = form.street.value
        const houseNumber = form.houseNumber.value

        console.log(city +'city?')
        if(password !== conPass){
            passwordError.textContent = 'Passwords Does not Match'
            return
        }

        try {
            const res = await fetch('/signupEmployer', {
                method: 'POST',
                body: JSON.stringify({email,password,firstName,lastName,phoneNumber,city,street,houseNumber}),
                headers: {'Content-Type': 'application/json'}
            })
            const data = await res.json()
            if (data.errors) {
                emailError.textContent = data.errors.email
                passwordError.textContent = data.errors.password


            }
            if (data.user) { //successful
                location.assign('/loginEmployer')
            }
        } catch (err) {
            console.log(err)
        }


    })
