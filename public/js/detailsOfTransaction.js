console.log('js')



// eslint-disable-next-line no-unused-vars
async function myAccept() {
    const msg = document.querySelector('.msg')

    msg.textContent = ''

    var str = window.location.href
    const idTransaction = str.split('/')[4]

    // eslint-disable-next-line no-undef
    swal({
            title: 'Are you sure you want to approve?',
            text: 'You will not be able to decline later!',
            type: 'info',
            showCancelButton: true,
            confirmButtonClass: 'btn-danger',
            confirmButtonText: 'Yes, approve it!',
            closeOnConfirm: false
        },
        async function(){
            const res = await fetch('/detailsOfTransaction/', {
                method: 'POST',
                body: JSON.stringify({isAccepted: 1, idTransaction}),
                headers: {'Content-Type': 'application/json'}
            })
            const data = await res.json()

            console.log(data.msg)
            // eslint-disable-next-line no-undef
            swal({
                title: 'Approved!',
                text: 'The transaction is approved.\n An email inform the employer has been sent',
                type: 'success'
            }, function() {
                console.log('fd')
                window.location.href = '../workOrdersContractor'
            })

        })


}



// eslint-disable-next-line no-unused-vars
async function myDecline() {
    const msg = document.querySelector('.msg')


    msg.textContent = ''

    var str = window.location.href
    const idTransaction = str.split('/')[4]

    // eslint-disable-next-line no-undef
    swal({
            title: 'Are you sure you want to decline?',
            text: 'You will not be able to confirm later!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn-danger',
            confirmButtonText: 'Yes, decline it!',
            closeOnConfirm: false
        },
        async function(){
            const res = await fetch('/detailsOfTransaction/', {
                method: 'POST',
                body: JSON.stringify({isAccepted: 2, idTransaction}),
                headers: {'Content-Type': 'application/json'}
            })
            const data = await res.json()

            console.log(data.msg)
            // eslint-disable-next-line no-undef
            swal({
                title: 'Denied!',
                text: 'The transaction is denied.\n An email inform the employer has been sent',
                type: 'success'
            }, function() {
                console.log('fd')
                 window.location.href = '../workOrdersContractor'
            })

        })



    }


