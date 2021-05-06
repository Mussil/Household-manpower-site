const form = document.querySelector('from')
// const emailError = document.querySelector('.email.error')
const passwordError = document.querySelector('.password.error')
const fNmaeError = document.querySelector('.fName.error')
const lNmaeError = document.querySelector('.lName.error')
const phoneError = document.querySelector('.phone.error')
const cityError = document.querySelector('.city.error')
const streetError = document.querySelector('.street.error')
const houseError = document.querySelector('.house.error')

console.log('tair pro js')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // emailError.textContent = ''
    passwordError.textContent = ''
    fNmaeError.textContent = ''
    lNmaeError.textContent = ''
    phoneError.textContent = ''
    cityError.textContent = ''
    streetError.textContent = ''
    houseError.textContent = ''


    // get values
    const email = form.email.value
    const password = form.password.value
    const firstName = form.firstName.value
    const lastName = form.lastName.value
    const phoneNumber = form.phoneNumber.value
    const city = form.city.value
    const street = form.street.value
    const houseNumber = form.houseNumber.value
    // console.log(email + password + firstName)

    try {
        console.log('tair pro js')
        const res = await fetch('/profileEmployer', {
            method: 'POST',
            body: JSON.stringify({email,password,firstName,lastName,phoneNumber,city,street,houseNumber}),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        if (data.errors) {
            // emailError.textContent = data.errors.email
            passwordError.textContent = data.errors.password
            fNmaeError.textContent = data.errors.firstName
            lNmaeError.textContent = data.errors.lastName
            phoneError.textContent = data.errors.phoneNumber
            cityError.textContent = data.errors.city
            streetError.textContent = data.errors.street
            houseError.textContent = data.errors.houseNumber

        }
        if (data.user) { //successful
            location.assign('/homepageEmployer')
        }
    } catch (err) {
        console.log(err)
    }


})
