const mongoose=require('mongoose')

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
    'degania']

// address model
var addressSchema = new mongoose.Schema({
    city: {
        type: String,
        lowercase: true,
        enum: citiesArray,

    },
    street: {
        type: String
    },
    houseNumber: {
        type: String
    }
})


addressSchema=mongoose.model('address',addressSchema ,'address' )
module.exports = addressSchema


