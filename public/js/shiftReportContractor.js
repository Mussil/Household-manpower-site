

$(function() {
    $('input[name="daterange"]').daterangepicker({
        'alwaysShowCalendars': true,
        singleDatePicker: true,
        timePicker:true,
        opens: 'left',
        minYear: 2021,
        maxYear: 2022,
         'autoUpdateInput': true,
        'autoApply': false,
        timePickerSeconds:false,
        'locale': {
            'format': 'MM/DD/YYYY  hh:mm A'
        }

    }, async function(start) {
        console.log('A new date selection was made: ' + start.format('DD-MM-YYYY hh:mm A') )
        try {
            const res = await fetch('/shiftReportContractor', {
                method: 'POST',
                body: JSON.stringify({start}),
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