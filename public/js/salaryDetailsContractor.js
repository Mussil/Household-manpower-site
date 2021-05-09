

window.onload = function() {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let date = new Date()

    document.getElementById('date').innerHTML += months[date.getMonth()] + ' ' + date.getFullYear()
}

$(function() {
    $('input[name="daterange"]').daterangepicker({
        opens: 'left'
    }, async function(start, end) {
        console.log('A new date selection was made: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'))
        const salaryRange = document.querySelector('.salary.range')
        const salaryRangeError = document.querySelector('.salary.range.error')

        salaryRange.textContent = ''
        salaryRangeError.textContent = ''

        try {
            const res = await fetch('/salaryDetailsContractor', {
                method: 'POST',
                body: JSON.stringify({start,end}),
                headers: {'Content-Type': 'application/json'}
            })
            const data = await res.json()
            console.log(data)
            if (data.err) {
                salaryRangeError.textContent = (data.err)
            }
            if(data.sal) { //successful
                console.log('suc')
                salaryRange.textContent = data.sal
            }
        }
        catch (err) {
            console.log(err)
            salaryRangeError.textContent = 'try again'

        }

    })
})