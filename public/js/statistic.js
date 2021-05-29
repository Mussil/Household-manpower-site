
var genderfilter=0
var experiencefilter=0
var jobfilter=0
var educationfilter=0
// eslint-disable-next-line no-unused-vars
function getDetails(gender,dictexperience,job,educ){

    genderfilter=gender
    experiencefilter=dictexperience
    jobfilter=job
    educationfilter=educ
}

window.onload = function() {

    var chart = new CanvasJS.Chart("gender", {
    animationEnabled: true,
    title: {
    text: "Gender"
},
    data: [{
        type: "column",
        // showInLegend: true,
        // legendMarkerColor: "grey",
    dataPoints: [
        {y: genderfilter.male, label: "male"},
        {y: genderfilter.female, label: "female"}

    ]
}]
})


    var cha = new CanvasJS.Chart("experience", {


        animationEnabled: true,
        title: {
            text: "experience"
        },
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",
            dataPoints: [
                {y: experiencefilter.max5, label: "up to five years"},
                {y: experiencefilter.max15, label: "6-15 years"},
                {y: experiencefilter.max30, label: "16-30 years"},
                {y: experiencefilter.max1, label: "Over 31 years"}

            ]
        }]
    })


    var chjobs = new CanvasJS.Chart("jobs", {
        animationEnabled: true,
        title: {
            text: "jobs"
        },
        data: [{
            type: "doughnut",
            startAngle: 60,
            //innerRadius: 60,
            indexLabelFontSize: 17,
            indexLabel: "{label} - #percent%",
            toolTipContent: "<b>{label}:</b> {y} (#percent%)",
            dataPoints: [
                {y: jobfilter.baby, label: "babysitting"},
                {y: jobfilter.iron, label: "ironing"},
                {y: jobfilter.clean1, label: "cleaning"},
                {y: jobfilter.cook, label: "cooking"},
                {y: jobfilter.garden, label: "gardening"},
                {y: jobfilter.pet, label: "pet care"}


            ]
        }]
    })


    var cheducation = new CanvasJS.Chart("education", {
        animationEnabled: true,
        title: {
            text: "education"
        },
        data: [{
            type: "bar",
            indexLabel: "{y}",
            dataPoints: [
                {y: educationfilter.elementary, label: "elementary"},
                {y: educationfilter.highSchool, label: "high school"},
                {y: educationfilter.higher, label: "higher"}
            ]
        }]
    })
    cheducation.render()
    chjobs.render()
    cha.render()
    chart.render()
}
