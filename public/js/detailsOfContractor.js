var contractorId=0
var typeCon=''

// eslint-disable-next-line no-unused-vars
function getDetails(myVar,typeOfJob){
    contractorId=myVar
    typeCon=typeOfJob
}

$(function() {
    $('input[name="daterange"]').daterangepicker({
        'singleDatePicker': true,
        'showDropdowns': true,
        'autoUpdateInput': true,
        'alwaysShowCalendars': true,

    }, async function(start) {
        console.log('New date selected: ' + start.format('YYYY-MM-DD') )
        document.getElementById('hoursForm').style.display = 'none'

        const dateMessage = document.querySelector('.date.messages.error')
        dateMessage.textContent=''

        if(start<new Date()){
            dateMessage.textContent='The date has already passed.'
        }
        else {
            try {
                const res = await fetch('/detailsOfContractor', {
                    method: 'POST',
                    body: JSON.stringify({start,contractorId}),
                    headers: {'Content-Type': 'application/json'}
                })
                const data = await res.json()
                console.log(data)
                if (data.msgError) {
                    dateMessage.textContent = data.msgError
                    document.getElementById('hoursForm').style.display = 'none'

                }
                else {
                    // תקין אפשר להציג את השעות
                    document.getElementById('hoursForm').style.display = 'block'
                    afterHours(data.contractorId,data.start1,data.employerId)

                }
            } catch (err) {
                console.log(err)
            }

        }
    })
})




function afterHours(contractorId,startDate,employerId){
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
        console.log('start hour chosen:'+startTime)
        console.log('end hour chosen:' +endTime)
        startTime = startTime.split(':')
        endTime = endTime.split(':')
        let startMin=parseInt(startTime[0])*60+parseInt(startTime[1])
        let endMin=parseInt(endTime[0])*60+parseInt(endTime[1])
        if(startMin>=endMin){
            hourMessageError.textContent='Final hour should be after the initial hour'
        }else {


            try {
                const res = await fetch('/detailsOfContractorHours', {
                    method: 'POST',
                    body: JSON.stringify({contractorId,startDate,employerId, startMin, endMin,typeCon}),
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