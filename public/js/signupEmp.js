

    const form = document.querySelector('form')
    const emailError = document.querySelector('.email.error')
    const passwordError = document.querySelector('.password.error')
    const configrPasswordError = document.querySelector('.configurePassword.error')
    const fNmaeError = document.querySelector('.fName.error')
    const lNmaeError = document.querySelector('.lName.error')
    const phoneError = document.querySelector('.phone.error')
    const cityError = document.querySelector('.city.error')
    const streetError = document.querySelector('.street.error')
    const houseError = document.querySelector('.house.error')

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        //reset errors mesg
        emailError.textContent = ''
        passwordError.textContent = ''
        configrPasswordError.textContent = ''
        fNmaeError.textContent = ''
        lNmaeError.textContent = ''
        phoneError.textContent = ''
        cityError.textContent = ''
        streetError.textContent = ''
        houseError.textContent = ''


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
                fNmaeError.textContent = data.errors.firstName
                lNmaeError.textContent = data.errors.lastName
                phoneError.textContent = data.errors.phoneNumber
                cityError.textContent = data.errors.city
                streetError.textContent = data.errors.street
                houseError.textContent = data.errors.houseNumber

            }
            if (data.user) { //successful
                location.assign('/loginEmployer')
            }
        } catch (err) {
            console.log(err)
        }


    })
