
    const form = document.querySelector('form')
    const emailError = document.querySelector('.email.error')
    const hourlyRateError = document.querySelector('.Hourly.rate.error')
    const noJobsType = document.querySelector('.noJobTypes.error')
    const noLanguages = document.querySelector('.noLanguages.error')
    const sucNew = document.querySelector('.suc.new')


    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        emailError.textContent = ''
        hourlyRateError.textContent = ''
        noJobsType.textContent = ''
        noLanguages.textContent = ''
        sucNew.textContent = ''


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


        if(hourlyRate<17 || hourlyRate>500){
            hourlyRateError.textContent = 'Please enter salary in the following range: [17,500]'
            return
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

        flag=0
        var arrLang = []
        if (hebrew.checked == true){
            arrLang.push('hebrew')
            flag=1
        }
        if (english.checked == true){
            arrLang.push('english')
            flag=1
        }
        if(arabic.checked == true){
            arrLang.push('arabic')
            flag=1
        }
        if (russian.checked == true){
            arrLang.push('russian')
            flag=1
        }
        if (amharic.checked == true){
            arrLang.push('amharic')
            flag=1
        }
        if(chinese.checked == true){
            arrLang.push('chinese')
            flag=1
        }
        if(portuguese.checked == true){
            arrLang.push('portuguese')
            flag=1
        }
        if (french.checked == true){
            arrLang.push('french')
            flag=1
        }
        if (romanian.checked == true){
            arrLang.push('romanian')
            flag=1
        }
        if(polish.checked == true){
            arrLang.push('polish')
            flag=1
        }
        if(spanish.checked == true){
            arrLang.push('spanish')
            flag=1
        }

        if (flag==0){
            noLanguages.textContent = 'Please select at least one language'
            return
        }
        var babysitting = document.getElementById('babysitting')
        var cleaning = document.getElementById('cleaning')
        var ironing = document.getElementById('ironing')
        var gardening = document.getElementById('gardening')
        var cooking = document.getElementById('cooking')
        var petCare = document.getElementById('pet care')

        var arrTypeJob = []
        var flag=0
        if (babysitting.checked == true){
            arrTypeJob.push('babysitting')
            flag=1
        }
        if (cleaning.checked == true){
            arrTypeJob.push('cleaning')
            flag=1
        }
        if(ironing.checked == true){
            arrTypeJob.push('ironing')
            flag=1
        }
        if (gardening.checked == true){
            arrTypeJob.push('gardening')
            flag=1
        }
        if(cooking.checked == true){
            arrTypeJob.push('cooking')
            flag=1
        }
        if(petCare.checked == true){
            arrTypeJob.push('pet care')
            flag=1
        }
        if (flag==0){
            noJobsType.textContent = 'Please select at least one job type'
            return
        }



        try {
            const res = await fetch('/addAContractorHR', {
                method: 'POST',
                body: JSON.stringify({ email, password,firstName,lastName,phoneNumber,city,street,houseNumber,branch,accountNumber,bankName,
                         gender,arrLang,education,smoker,experience,hourlyRate,picture,form101,birthday,aboutMe, arrTypeJob}),
                headers: {'Content-Type': 'application/json'}
            })
            const data = await res.json()
            console.log(data)
            if (data.errors) {
                emailError.textContent = data.errors.email
            }
            if(data.user){
                var msg='A new contractor worker: '+data.user.email+' is added to the system an email on its way to him/her.'
                // sucNew.textContent = msg
                form.reset()
                // eslint-disable-next-line no-undef
                swal(msg)

                //res.send('<h3>YOU ARE ADD A NEW EMPLOYER TO THE SYSTEM</h3>')
            }

        }
        catch (err) {
            console.log(err)
        }

    })