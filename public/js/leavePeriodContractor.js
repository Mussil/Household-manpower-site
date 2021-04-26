

$(function() {
    $('input[name="daterange"]').daterangepicker({
        'alwaysShowCalendars': true,
        opens: 'left'
    }, async function(start, end) {
        console.log('A new date selection was made: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'))


        try {
            const res = await fetch('/leavePeriodContractor', {
                method: 'POST',
                body: JSON.stringify({start,end}),
                headers: {'Content-Type': 'application/json'}
            })
            const data = await res.json()
            console.log(data)

        }
        catch (err) {
            console.log(err)
        }



    })
})