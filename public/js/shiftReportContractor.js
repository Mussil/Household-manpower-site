
$(function() {
    $('input[name="daterange"]').daterangepicker({
        'singleDatePicker': true,
        'showDropdowns': true,
        'autoUpdateInput': true,
        'alwaysShowCalendars': true,

    }, async function(start) {
        console.log('New date range selected: ' + start.format('YYYY-MM-DD') )
        document.getElementById('hoursForm').style.display = 'none'

        const dateMessage = document.querySelector('.date.messages.error')
        dateMessage.textContent=''

        if(start>new Date()){
            dateMessage.textContent='It is not possible to update a shift on a future date'
        }
        else {
            try {
                const res = await fetch('/shiftReportContractor', {
                    method: 'POST',
                    body: JSON.stringify({start}),
                    headers: {'Content-Type': 'application/json'}
                })
                const data = await res.json()
                console.log(data)
                if (data.msgError) {
                    dateMessage.textContent = data.msgError
                    document.getElementById('hoursForm').style.display = 'none'

                }
                if (data.result) {
                    // תקין אפשר להציג את השעות
                    document.getElementById('hoursForm').style.display = 'block'
                    afterHours(data.result)

                }
            } catch (err) {
                console.log(err)
            }

        }
    })
})




function afterHours(trans){
    const form = document.querySelector('form')
    const hourMessageError = document.querySelector('.hour.message.error')
    const hourMessageSuc = document.querySelector('.hour.message.suc')


    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        // reset errors
        hourMessageError.textContent = ''
        hourMessageSuc.textContent = ''

        // get values
        var startTime = form.startTime.value
        var endTime = form.endTime.value
        console.log('start hour chosen:'+startTime)
        console.log('end hour chosen:' +endTime)
        startTime = startTime.split(':')
        endTime = endTime.split(':')
        var startMin=parseInt(startTime[0])*60+parseInt(startTime[1])
        var endMin=parseInt(endTime[0])*60+parseInt(endTime[1])
        if(startMin>=endMin){
            hourMessageError.textContent='Final hour should be after the initial hour'
        }else {


            try {
                const res = await fetch('/shiftReportHoursContractor', {
                    method: 'POST',
                    body: JSON.stringify({trans, startMin, endMin}),
                    headers: {'Content-Type': 'application/json'}
                })
                const data = await res.json()
                console.log(data)
                if (data.msgError) {
                    hourMessageError.textContent = data.msgError
                }
                if (data.msg) {
                    hourMessageSuc.textContent = data.msg
                }

            } catch (err) {
                console.log(err)
            }

        }
    })


}