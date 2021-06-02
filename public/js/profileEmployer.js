
// eslint-disable-next-line no-unused-vars
// function myDeleteFunction() {
//
//     // eslint-disable-next-line no-undef
//     swal({
//             title: 'Are you sure?',
//             text: 'You will not be able to recover your account!',
//             type: 'warning',
//             showCancelButton: true,
//             confirmButtonClass: 'btn-danger',
//             confirmButtonText: 'Yes, delete!',
//             cancelButtonText: 'No, cancel!',
//             closeOnConfirm: false,
//             closeOnCancel: false
//         },
//         function (isConfirm) {
//             if (isConfirm) {
//                 // eslint-disable-next-line no-undef
//                 swal('Deleted!', 'Your account has been deleted.', 'success')
//                 const endpoint = '/profileEmployer'
//                 fetch(endpoint, {
//                     method: 'DELETE',
//                 })
//                     .then(response => response.json())
//                     .then(data => window.location.href = data.redirect)
//                     .catch(err => console.log(err))
//             } else {
//                 // eslint-disable-next-line no-undef
//                 swal('Cancelled', 'Your account is safe :)', 'error')
//             }
//         })
// }




const form = document.querySelector('form')
const emailError = document.querySelector('.email.error')
const passwordError = document.querySelector('.password.error')
const succUpdate = document.querySelector('.update.succ')
const failUpdate = document.querySelector('.update.fail')


var email = ''
var password = ''
var firstName = ''
var lastName = ''
var phoneNumber = ''
var city = ''
var street = ''
var houseNumber = ''
var changePassword = 0//false = no change



function get(e,p,fn,ls,phone,c,s,h) {
    email = e
    password = p
    firstName = fn
    lastName = ls
    phoneNumber = phone
    city = c
    street = s
    houseNumber = h
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log(email +password+ firstName + lastName + phoneNumber + city + street + houseNumber+ ' !!!!!!!!!!!!!!!')

    var myInput1 = document.getElementById('email')
    if (myInput1 && myInput1.value) email = form.email.value

    //var myInput = document.getElementById('password')
    var myInput12 = document.getElementById('confirmationPassword')
    if (myInput12 && myInput12.value) {
        password = form.password.value
        const confirmationPassword = form.confirmationPassword.value
        if (password !== confirmationPassword) {
            passwordError.textContent = 'Passwords Does not Match'
            return
        }
        else{
            changePassword = 1 // true = change
        }
    }
    var myInput2 = document.getElementById('firstName')
    if (myInput2 && myInput2.value) firstName = form.firstName.value

    var myInput3 = document.getElementById('lastName')
    if (myInput3 && myInput3.value) lastName = form.lastName.value

    var myInput4 = document.getElementById('phoneNumber')
    if (myInput4 && myInput4.value) phoneNumber = form.phoneNumber.value

    var myInput5 = document.getElementById('city')
    if (myInput5 && myInput5.value) {
        city = form.city.value
    }
    var myInput6 = document.getElementById('street')
    if (myInput6 && myInput6.value) {
        street = form.street.value
    }
    var myInput7 = document.getElementById('houseNumber')
    if (myInput7 && myInput7.value) {
        houseNumber = form.houseNumber.value
    }
    console.log(email +password+ firstName + lastName + phoneNumber + city + street + houseNumber+ ' !!!!!!!!!!!!!!!')


    try {
        const res = await fetch('/profileEmployer', {
            method: 'POST',
            body: JSON.stringify({email, password, firstName, lastName, phoneNumber, city, street, houseNumber,changePassword}),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        if (data.errors) {
            emailError.textContent = data.errors.email
            failUpdate.textContent = 'There was a problem updating the data..Please try again'
        }
        if (data.user) { //successful
            succUpdate.textContent = 'Everything is saved successfully!'
            location.assign('/profileEmployer')
        }
    } catch (err) {
        console.log(err)
    }
})
