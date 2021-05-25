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
        rateError.textContent = 'Please choose rate'
        return;
    }
    var str = window.location.href

    var idTransaction = str.split('/')[4]

    console.log(idTransaction.slice(3, idTransaction.length-3))
    idTransaction = idTransaction.slice(3, idTransaction.length-3)

    console.log('id',idTransaction)

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
                    // if(selectedValue==1) {
                    //     swal("Sorry to hear ");
                    // } else if(selectedValue==2) {
                    //     swal("Oh boy, was it so bad ?!? ");
                    // }else if(selectedValue==3) {
                    //     swal("Ok :) Fair enough ");
                    // }else if(selectedValue==4) {
                    //     swal("Wonderfull, that's great to hear");
                    // }else {
                    //     swal("Wow!!! thanks, great!!!");
                    // }

                    window.opener = self;

                    // setTimeout("window.close()",3000)

                    // console.log('you are soppesed to see update page!!!')
                    window.location.href = "http://127.0.0.1:3000/workHistoryEmployer";
                }
            } catch (err) {
                console.log(err)
            }


})




