const form = document.querySelector('form')
const emailError = document.querySelector('.email.error')
const passwordError = document.querySelector('.password.error')



form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // reset errors
    emailError.textContent = ''
    passwordError.textContent = ''

    // get values
    const email = form.email.value
    const password = form.password.value

    try {
        const res = await fetch('/loginHR', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        console.log(data)
        if (data.errors) {
            emailError.textContent = data.errors.email
            passwordError.textContent = data.errors.password
        }
        if (data.user) { //successful

            const errCaptcha = document.getElementById("errCaptcha");
            const reCaptcha = document.getElementById("reCaptcha");
            recaptcha = reCaptcha.value;
            let validateCaptcha = 0;
            for (var z = 0; z < 6; z++) {
                if (recaptcha.charAt(z) != captcha[z]) {
                    validateCaptcha++;
                }
            }
            if (recaptcha == "") {
                errCaptcha.innerHTML = "Re-Captcha must be filled";
            } else if (validateCaptcha > 0 || recaptcha.length > 6) {
                errCaptcha.innerHTML = "Wrong captcha";
                return
            } else {
                errCaptcha.innerHTML = "Done";
                location.assign('/homepageHR')
            }

        }
    }
    catch (err) {
        console.log(err)
    }


})

let captcha = new Array();

function createCaptcha() {
    const activeCaptcha = document.getElementById("captcha");
    for (q = 0; q < 6; q++) {
        if (q % 2 == 0) {
            captcha[q] = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
        } else {
            captcha[q] = Math.floor(Math.random() * 10 + 0);
        }
    }
    theCaptcha = captcha.join("");
    activeCaptcha.innerHTML = `${theCaptcha}`;
}

// function validateCaptcha() {
//     const errCaptcha = document.getElementById("errCaptcha");
//     const reCaptcha = document.getElementById("reCaptcha");
//     recaptcha = reCaptcha.value;
//     let validateCaptcha = 0;
//     for (var z = 0; z < 6; z++) {
//         if (recaptcha.charAt(z) != captcha[z]) {
//             validateCaptcha++;
//         }
//     }
//     if (recaptcha == "") {
//         errCaptcha.innerHTML = "Re-Captcha must be filled";
//     } else if (validateCaptcha > 0 || recaptcha.length > 6) {
//         errCaptcha.innerHTML = "Wrong captcha";
//     } else {
//         errCaptcha.innerHTML = "Done";
//     }
// }
