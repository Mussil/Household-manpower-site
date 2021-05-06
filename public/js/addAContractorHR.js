
    const form = document.querySelector('form')
    // const emailError = document.querySelector('.email.error')
    // const passwordError = document.querySelector('.password.error')


    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        console.log('i here?')
        // reset errors
        // emailError.textContent = ''
        // passwordError.textContent = ''

        // get values

        // get values
        const email = form.email.value
        const password = form.password.value
        const firstName = form.firstName.value
        const lastName = form.lastName.value
        const phoneNumber = form.phoneNumber.value
        const city = form.city.value
        const street = form.street.value
        const houseNumber = form.houseNumber.value
        const hourlyRate = form.hourlyRate.value
        const experience = form.experience.value
        const gender = form.gender.value
        const aboutMe = form.aboutMe.value
        const education = form.education.value
        const smoker = form.smoker.value
        const form101 = form.form101.value
        const picture = form.picture.value
        const bankName = form.bankName.value
        const branch = form.branch.value
        const accountNumber = form.accountNumber.value
        const birthday = form.birthday.value


        var babysitting = document.getElementById('babysitting')
        var cleaning = document.getElementById('cleaning')
        var ironing = document.getElementById('ironing')
        var gardening = document.getElementById('gardening')
        var cooking = document.getElementById('cooking')
        var petCare = document.getElementById('pet care')

        var arrTypeJob = []
        if (babysitting.checked == true){
            arrTypeJob.push('babysitting')
        }
        if (cleaning.checked == true){
            arrTypeJob.push('cleaning')
        }
        if(ironing.checked == true){
            arrTypeJob.push('ironing')
        }
        if (cleaning.checked == true){
            arrTypeJob.push('cleaning')
        }
        if (gardening.checked == true){
            arrTypeJob.push('gardening')
        }
        if(cooking.checked == true){
            arrTypeJob.push('cooking')
        }
        if(petCare.checked == true){
            arrTypeJob.push('pet care')
        }


        var hebrew = document.getElementById('hebrew')
        var english = document.getElementById('english')
        var arabic = document.getElementById('arabic')
        var russian = document.getElementById('russian')
        var amharic = document.getElementById('amharic')
        var chinese = document.getElementById('chinese')
        var portuguese = document.getElementById('portuguese')
        var french = document.getElementById('french')
        var romanian = document.getElementById('romanian')
        var polish = document.getElementById('polish')
        var spanish = document.getElementById('spanish')

        var arrLang = []
        if (hebrew.checked == true){
            arrLang.push('hebrew')
        }
        if (english.checked == true){
            arrLang.push('english')
        }
        if(arabic.checked == true){
            arrLang.push('arabic')
        }
        if (russian.checked == true){
            arrLang.push('russian')
        }
        if (amharic.checked == true){
            arrLang.push('amharic')
        }
        if(chinese.checked == true){
            arrLang.push('chinese')
        }
        if(portuguese.checked == true){
            arrLang.push('portuguese')
        }
        if (french.checked == true){
            arrLang.push('french')
        }
        if (romanian.checked == true){
            arrLang.push('romanian')
        }
        if(polish.checked == true){
            arrLang.push('polish')
        }
        if (russian.checked == true){
            arrLang.push('russian')
        }
        if (amharic.checked == true){
            arrLang.push('amharic')
        }
        if(spanish.checked == true){
            arrLang.push('spanish')
        }

        console.log(arrLang)
        console.log(arrTypeJob)

        try {
            const res = await fetch('/addAContractorHR', {
                method: 'POST',
                body: JSON.stringify({ email, password,firstName,lastName,phoneNumber,city,street,houseNumber,branch,accountNumber,bankName,
                         gender,arrLang,education,smoker,experience,hourlyRate,picture,form101,birthday,aboutMe, arrTypeJob}),
                headers: {'Content-Type': 'application/json'}
            })
            const data = await res.json()
            console.log(data)
            // if (data.errors) {
            //     emailError.textContent = data.errors.email
            //     passwordError.textContent = data.errors.password
            // }
            // if (data.user) { //successful
            //     location.assign('/homepageContractor')
            // }
        }
        catch (err) {
            console.log(err)
        }

    })