const form = document.querySelector('form')
form.addEventListener('submit', async (e) => {
    console.log('kkkkkkkkkkkkkkkkkkkkk')
    e.preventDefault()

    const rateError = document.querySelector('.error-rating')
    rateError.textContent = ''


    const rbs = document.querySelectorAll('input[name="rating"]');
    let selectedValue;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            console.log(selectedValue)
            break;
        }

    }
    if(selectedValue!=1 && selectedValue!=2 && selectedValue!=3 && selectedValue!=4 && selectedValue!=5){
        console.log('error')
        rateError.textContent = 'Please enter rate'
        return;
    }
    var str = window.location.href
    const idTransaction = str.split('/')[4]
    console.log(idTransaction)
    const recommend = form.recommend.value
    console.log(recommend)
    try {
                const res = await fetch('/rateContractor', {
                    method: 'POST',
                    body: JSON.stringify({idTransaction, "rate": selectedValue ,recommend}),
                    headers: {'Content-Type': 'application/json'}
                })
                const data = await res.json()
                if (data) {
                    swal("Nice! success");
                    window.opener = self;
                    // window.close();
                    setTimeout("window.close()",5000)
                }
            } catch (err) {
                console.log(err)
            }


})




