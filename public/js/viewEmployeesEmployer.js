


var data
// eslint-disable-next-line no-unused-vars
function getDetails(dataHere){
    data = dataHere
}

const filterForm = document.querySelector('.filter')
filterForm.addEventListener('submit',(e)=>{
    console.log(filterForm)
    e.preventDefault()

    //langauge
    var hebrew = document.getElementById('hebrew')
    var english = document.getElementById('english')
    var arabic = document.getElementById('arabic')
    var russian = document.getElementById('russian')
    var amharic = document.getElementById('amharic')
    var chinese = document.getElementById('chinese')
    var portuguese = document.getElementById('portuguese')
    var french = document.getElementById('french')
    var romanian = document.getElementById('romanian')
    var polish = document.getElementById('polish')
    var spanish = document.getElementById('spanish')

    var arrLang = []
    if (hebrew.checked == true){
        arrLang.push('hebrew')
    }
    if (english.checked == true){
        arrLang.push('english')
    }
    if(arabic.checked == true){
        arrLang.push('arabic')
    }
    if (russian.checked == true){
        arrLang.push('russian')
    }
    if (amharic.checked == true){
        arrLang.push('amharic')
    }
    if(chinese.checked == true){
        arrLang.push('chinese')
    }
    if(portuguese.checked == true){
        arrLang.push('portuguese')
    }
    if (french.checked == true){
        arrLang.push('french')
    }
    if (romanian.checked == true){
        arrLang.push('romanian')
    }
    if(polish.checked == true){
        arrLang.push('polish')
    }
    if(spanish.checked == true){
        arrLang.push('spanish')
    }

    var flag=0
    data.forEach(con=>{
        flag=0
        con.languages.forEach(lanObj=>{
            var lan= lanObj.value
            // myLan.push(lan)
            if(arrLang.includes(lan)){
                console.log(con._id)
                //var element= document.getElementById(con._id)
                //element.style.display='block'
                flag=1
            }
        })
        if(flag==0){
            var element= document.getElementById(con._id)
            element.style.display='none'
        }

    })
    //end language


    filterBudget()



    //city
    const city = filterForm.city.value
    console.log(city)
    data.forEach(con=>{
        var element

        if (con.address.city!=city && city!='default'){
            element= document.getElementById(con._id)
            element.style.display='none'

        }

    })

    document.getElementById('submit_form').disabled = true


})



function clearLanguage(){
    $('input[type=checkbox]').each(function()
    {
        this.checked = true
    })
}

// eslint-disable-next-line no-unused-vars
function myClear(){
    data.forEach(con=>{
         var element= document.getElementById(con._id)
            element.style.display='block'
    })
    clearLanguage()

        $('.output').val('')
    .trigger('change')

   document.getElementById('city').value = 'default'

    document.getElementById('submit_form').disabled = false

}


$('#range').on('input', function() {
    $('.output').val(this.value +' $' )
}).trigger('change')



// eslint-disable-next-line no-unused-vars
function filterBudget(){
    var value=document.getElementById('budget').value
    value.substring(0, value.length - 1)
    console.log(value)
    if(!value){
        value=500
    }
    console.log(value)

    data.forEach(con=>{
        var element
        // console.log(con.hourlyRate)
        // console.log(parseInt(value, 10))
        if (con.hourlyRate<=parseInt(value, 10)){
             element= document.getElementById(con._id)
             // element.style.display='block'

        }
        else{
             element= document.getElementById(con._id)
            element.style.display='none'
        }
    })

}

const citiesArray =['eilat',
    'jerusalem',
    'nazareth' ,
    'haifa',
    'zikhron ya’akov ',
    'arad',
    'netanya',
    'nahariya',
    'kfar tavor',
    'hebron',
    'kinneret moshava',
    'holon',
    'bat shlomo',
    'bnei brak' ,
    'the negev desert ',
    'the lowlands',
    'abu snan',
    'julis',
    'maghar',
    'samia',
    'ein al-assad',
    'isfiya',
    'keysarya' ,
    'beer sheva',
    'sde boker',
    'yad moredechai',
    'rosh-pina' ,
    'kiryat shmona',
    'kiryat malachi',
    'ein gedi',
    'ein-hod' ,
    ' kfar nakhum',
    ' hazor haglilit',
    'metula' ,
    'harduf',
    'ashdod',
    'kfar kama',
    'abu gosh' ,
    'jezreel valley',
    ' the judean desert',
    'sea of galilee',
    'beit jann',
    'sajur',
    'rameh',
    'daliyat el-carmel',
    'the golan heights',
    'tiberias',
    'mitspe ramon',
    'akko',
    'katzerin',
    'nahalal',
    'kfar yasif',
    'hanita',
    'maalot tarshiha',
    'bat yam',
    'the hula valley' ,
    'hevel habsor',
    'the arava',
    'the galilee',
    'gush dan',
    'the nitzana region',
    'yanuh',
    'yarka',
    'kisra',
    'hurfeish',
    'shefa-amr',
    'the dead sea',
    'tel aviv jaffa',
    'tsefat' ,
    'tel-hai ',
    'ramla',
    'hertzeliya' ,
    'gush halav',
    'ashkelon' ,
    'beit shean' ,
    'cana' ,
    'jatt',
    'rehaniya',
    'degania',
'default']
function selectOne() {
    var select = document.getElementById('city')
    for (var i=citiesArray.length-1; i>=0; i--) {
        var x= citiesArray[i].charAt(0).toUpperCase() + citiesArray[i].slice(1)
        select.options[select.options.length] = new Option(x, citiesArray[i])
    }
}
selectOne()


const searchForm = document.querySelector('.search')
searchForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const name = searchForm.site_search.value
    data.forEach(con=> {
        var element

        if (con.firstName.includes(name) || con.lastName.includes(name) || con.email.includes(name)) {
            element = document.getElementById(con._id)
            element.style.display = 'block'

        } else {
            element = document.getElementById(con._id)
            element.style.display = 'none'
        }
    })
})