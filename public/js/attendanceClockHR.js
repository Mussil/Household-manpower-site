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
                    }

                } catch (err) {
                    console.log(err)
                }

            }

            first.style.background = 'lightblue'
            second.style.background = 'lightblue'
        })



}

// eslint-disable-next-line no-unused-vars
function myDeleteFunction(g) {

    // document.getElementById("demo").innerHTML = "You are asking to delete a record # " + String(g)
    // alert('You chose to delete this record. There is no way back! Sorry ')

    let toDelete = confirm('Are you sure you want to delete this record ?!?\nWatch out! There is no way back once you clicked OK.\nAt your own risk :)')
    //
    if(!toDelete){return} // true if OK is pressed

    const id = data[g].transactionId

    ////////////////////////////////////////to add a qouestion if user want to delete !!!!!!!!

    const endpoint = '/attendanceClockHR/'+id
    fetch(endpoint, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => window.location.href = data.redirect)
        .catch(err => console.log(err))
}


