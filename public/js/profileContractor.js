
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
//                 const endpoint = '/profileContractor'
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
const hourlyRateError = document.querySelector('.Hourly.rate.error')


var email = ''
var password = ''
var firstName = ''
var lastName = ''
var phoneNumber = ''
var city = ''
var street = ''
var houseNumber = ''
var arrLang = []
var education = ''
var smoker = ''
var experience = ''
var hourlyRate = ''
var aboutMe = ''
var arrTypeJob = []
var changePassword = 0//false = no change

var data =''
// eslint-disable-next-line no-unused-vars
function sendData(dataHere)
{
    data=dataHere
}




form.addEventListener('submit', async (e) => {
    e.preventDefault()

    email = data.email
    password = data.password
    firstName = data.firstName
    lastName = data.lastName
    phoneNumber = data.phoneNumber
    city = data.address.city
    street = data.address.street
    houseNumber = data.address.houseNumber
    arrLang = data.languages
    education = data.education
    smoker = data.smoker
    experience = data.experience
    hourlyRate = data.hourlyRate
    aboutMe = data.aboutMe
    arrTypeJob = data.jobTypes

    for(var k=0;k<data.jobTypes.length;++k){
        arrTypeJob[k]=data.jobTypes[k].value
    }

    for(k=0;k<data.languages.length;++k){
        arrLang[k]=data.languages[k].value
    }

    var myInput1 = document.getElementById('email')
    if (myInput1 && myInput1.value) {
        email = form.email.value
    }

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
    if (myInput2 && myInput2.value) {
        firstName = form.firstName.value
    }
    var myInput3 = document.getElementById('lastName')
    if (myInput3 && myInput3.value) {
        lastName = form.lastName.value
    }
    var myInput4 = document.getElementById('phoneNumber')
    if (myInput4 && myInput4.value) {
        phoneNumber = form.phoneNumber.value
    }
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
    var myInput8 = document.getElementById('hourlyRate')
    if (myInput8 && myInput8.value) {
        if(myInput8.value < 17 || myInput8.value > 500){
            hourlyRateError.textContent = 'Please enter salary in the following range: [17,500]'
            return
        }
        else{
            hourlyRate = form.hourlyRate.value
        }
    }
    var myInput9 = document.getElementById('experience')
    if (myInput9 && myInput9.value) {
        experience = form.experience.value
    }
    var myInput10 = document.getElementById('aboutMe')
    if (myInput10 && myInput10.value) {
        aboutMe = form.aboutMe.value
    }
    var myInput11 = document.getElementById('education')
    if (myInput11 && myInput11.value) {
        education = form.education.value
    }
    var myInput13 = document.getElementById('smoker')
    if (myInput13 && myInput13.value) {
        smoker = form.smoker.value
    }


    var babysitting = document.getElementById('Babysitting')
    var cleaning = document.getElementById('Cleaning')
    var ironing = document.getElementById('Ironing')
    var gardening = document.getElementById('Gardening')
    var cooking = document.getElementById('Cooking')
    var petCare = document.getElementById('Pet care')


        if (babysitting.checked == true && arrTypeJob.includes('babysitting') == false) {
            arrTypeJob.push('babysitting')
        }

        if (cleaning.checked == true && arrTypeJob.includes('cleaning') == false) {
            arrTypeJob.push('cleaning')
        }

        if (ironing.checked == true && arrTypeJob.includes('ironing') == false) {
            arrTypeJob.push('ironing')
        }

        if (gardening.checked == true && arrTypeJob.includes('gardening') == false) {
            arrTypeJob.push('gardening')
        }
        if (cooking.checked == true && arrTypeJob.includes('cooking') == false) {
            arrTypeJob.push('cooking')
        }
        if (petCare.checked == true && arrTypeJob.includes('pet care') == false) {
            arrTypeJob.push('pet care')
        }





    var hebrew = document.getElementById('Hebrew')
    var english = document.getElementById('English')
    var arabic = document.getElementById('Arabic')
    var russian = document.getElementById('Russian')
    var amharic = document.getElementById('Amharic')
    var chinese = document.getElementById('Chinese')
    var portuguese = document.getElementById('Portuguese')
    var french = document.getElementById('French')
    var romanian = document.getElementById('Romanian')
    var polish = document.getElementById('Polish')
    var spanish = document.getElementById('Spanish')


        if (hebrew.checked == true && arrLang.includes('hebrew') == false) {
            arrLang.push('hebrew')
        }
        if (english.checked == true && arrLang.includes('english') == false) {
            arrLang.push('english')
        }
        if (arabic.checked == true && arrLang.includes('arabic') == false) {
            arrLang.push('arabic')
        }
        if (russian.checked == true && arrLang.includes('russian') == false) {
            arrLang.push('russian')
        }
        if (amharic.checked == true && arrLang.includes('amharic') == false) {
            arrLang.push('amharic')
        }
        if (chinese.checked == true && arrLang.includes('chinese') == false) {
            arrLang.push('chinese')
        }
        if (portuguese.checked == true && arrLang.includes('portuguese') == false) {
            arrLang.push('portuguese')
        }
        if (french.checked == true && arrLang.includes('french') == false) {
            arrLang.push('french')
        }
        if (romanian.checked == true && arrLang.includes('romanian') == false) {
            arrLang.push('romanian')
        }
        if (polish.checked == true && arrLang.includes('polish') == false) {
            arrLang.push('polish')
        }
        if (spanish.checked == true && arrLang.includes('spanish') == false) {
            arrLang.push('spanish')
        }

    try {
        const res = await fetch('/profileContractor', {
            method: 'POST',
            body: JSON.stringify({email, password, firstName, lastName, phoneNumber, city, street, houseNumber,arrLang,education,smoker,experience,hourlyRate,aboutMe,arrTypeJob,changePassword}),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        if (data.errors) {
            emailError.textContent = data.errors.email
            failUpdate.textContent = 'There was a problem updating the data..Please try again'
        }
        if (data.user) { //successful
            console.log(data.user)
            succUpdate.textContent = 'Everything is saved successfully!'
            // location.assign('/profileContractor')
        }
    } catch (err) {
        console.log(err)
    }
})
