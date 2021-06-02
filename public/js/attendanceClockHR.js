var data = {}
// eslint-disable-next-line no-unused-vars
function getDetails(dataHere){
    data = dataHere
    // console.log(data)
}

// eslint-disable-next-line no-unused-vars
function myEditFunction(g) {

    console.log('edit')
    console.log('trying to edit ', g)
    // console.log(data[g].transactionId)
    const id = data[g].transactionId
    console.log('id :', id)
    //
    // for (var i=0;i<data.length;i++){
    //     var first = document.getElementById(g).getElementsByClassName('hour-shift')[0]
    //     first.style.background = "white"
    //     var second = document.getElementById(g).getElementsByClassName('hour-shift')[1]
    //     second.style.background = "white"
    // }

    console.log(document.getElementById(g))
    var first = document.getElementById(g).getElementsByClassName('shift hour-shift')[0]
    first.style.background = '#f3f3f3 url(\'img_tree.png\') no-repeat right top'
    var second = document.getElementById(g).getElementsByClassName('shift hour-shift')[1]
    second.style.background = '#f3f3f3 url(\'img_tree.png\') no-repeat right top'

    document.getElementById('hoursForm').style.display = 'block'

    const form = document.querySelector('form')
        const hourMessageError = document.querySelector('.hour.message.error')
        const hourMessageSuc = document.querySelector('.hour.message.suc')


        form.addEventListener('submit', async (e) => {
            e.preventDefault()

            // reset errors
            hourMessageError.textContent = ''
            hourMessageSuc.textContent = ''

            // get values
            let startTime = form.startTime.value
            let endTime = form.endTime.value
            console.log('start hour chosen:' + startTime)
            console.log('end hour chosen:' + endTime)
            let startTime1 = startTime.split(':')
            let endTime1 = endTime.split(':')
            let startMin = parseInt(startTime1[0]) *  60 + parseInt(startTime1[1])
            let endMin = parseInt(endTime1[0]) * 60 + parseInt(endTime1[1])
            console.log(startMin)
            console.log(endMin)

            if (startMin >= endMin) {
                hourMessageError.textContent = 'Final hour should be after the initial hour'
            } else {
                try {
                    const res = await fetch('/attendanceClockHR', {
                        method: 'POST',
                        body: JSON.stringify({id, startMin, endMin}),
                        headers: {'Content-Type': 'application/json'}
                    })
                    const data = await res.json()
                    console.log(data)
                    if (data.msgError) {
                        hourMessageError.textContent = data.msgError
                    }
                    if (data.msg) {
                        hourMessageSuc.textContent = data.msg

                        first.textContent=startTime
                        second.textContent=endTime

                        document.getElementById('hoursForm').style.display = 'none'

                        // swal("Awesome!, Changes updated successfully!\n Updating mail was sent to the contractor")
                        swal({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Updating mail was sent to the contractor\n\n# Shift start time: '+startTime+'\n\n# Shift end time: '+endTime,
                            showConfirmButton: false,
                            timer: 5000
                        })

                    }

                } catch (err) {
                    console.log(err)
                }

            }

            first.style.background = 'lightblue'
            second.style.background = 'lightblue'
        })



}


// function sendMailToCont() {
//
//     // let wrap = document.createElement('div');
//     // // wrap.setAttribute('class', 'text-muted');
//     // wrap.innerHTML = '<h1>333333333333</h1><button onclick="reply(\'sad\')" type="button" value="sad" class="btn feel"><i class="fa fa-frown-o fa-3x"></i></button><button onclick="reply(\'neutral\')" type="button" value="neutral" class="btn feel"><i class="fa fa-meh-o fa-3x"></i></button><button onclick="reply(\'happy\')" type="button" value="happy" class="btn feel"><i class="fa fa-smile-o fa-3x"></i></button><hr>'
//
//
// }






// eslint-disable-next-line no-unused-vars
function myDeleteFunction(g) {

    // document.getElementById("demo").innerHTML = "You are asking to delete a record # " + String(g)
    // alert('You chose to delete this record. There is no way back! Sorry ')

    swal({
            title: "Are you sure?",
            text: "You will not be able to recover this record!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel please!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function(isConfirm) {
            if (isConfirm) {
                swal("Deleted!", "Your record has been deleted.", "success");
                const id = data[g].transactionId

                ////////////////////////////////////////to add a qouestion if user want to delete !!!!!!!!

                const endpoint = '/attendanceClockHR/'+id
                fetch(endpoint, {
                    method: 'DELETE',
                })
                    .then(response => response.json())
                    .then(data => window.location.href = data.redirect)
                    .catch(err => console.log(err))
            } else {
                swal("Cancelled", "Your record is safe :)", "error");
                return;
            }
        }
    );

    // let toDelete = confirm('Are you sure you want to delete this record ?!?\nWatch out! There is no way back once you clicked OK.\nAt your own risk :)')
    // //
    // if(!toDelete){return} // true if OK is pressed


}


