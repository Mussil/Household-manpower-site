

$(function() {
    $('input[name="daterange"]').daterangepicker({
        'alwaysShowCalendars': true,
        opens: 'left',
        minYear: 2021,
        maxYear: 2022,
        'autoUpdateInput': true,
        'autoApply': false,
        'locale': {
            'format': 'MM/DD/YYYY'
        }

    }, async function(start, end) {
        console.log('A new date selection was made: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'))

        const datesAdded = document.querySelector('.dates.added')

        try {
            const res = await fetch('/leavePeriodContractor', {
                method: 'POST',
                body: JSON.stringify({start,end}),
                headers: {'Content-Type': 'application/json'}
            })
            const data = await res.json()
            console.log(data)
            if (data.err) {
                datesAdded.textContent = 'try again'
            }
            if(data.user) { //successful
                datesAdded.textContent = 'dates has been added successfully'
            }
        }
        catch (err) {
            console.log(err)
           datesAdded.textContent = 'try again'

        }




    })
})