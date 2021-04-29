//
// $(function() {
//     $('input[name="daterange"]').daterangepicker({
//         'singleDatePicker': true,
//         'showDropdowns': true,
//         'autoUpdateInput': false,
//         'alwaysShowCalendars': true,
//
//     }, async function(start) {
//         console.log('New date range selected: ' + start.format('YYYY-MM-DD') )
//
//         try {
//             const res = await fetch('/shiftReportContractor', {
//                 method: 'POST',
//                 body: JSON.stringify({start}),
//                 headers: {'Content-Type': 'application/json'}
//             })
//             const data = await res.json()
//             console.log(data)
//             ///לטפל בשעות
//
//         }
//         catch (err) {
//             console.log(err)
//         }
//
//
//     })
// })