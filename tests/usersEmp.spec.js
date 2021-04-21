// const assert=require('assert')
// const mongoose=require('mongoose')
// const usersEmployer=require('../models/UsersEmployer')
//
//
// //Descripe the tests
// describe('Users Employer model',function() {
//     //Create tests
//     it('Creates an Employer with sub-documnets: Address', function (done) {
//
//         var pat = new usersEmployer({
//             email: 'myEmp@gmail.com',
//             password: 'Emp1234',
//             firstName: 'empl',
//             lastName: 'plon',
//             phoneNumber: 5726327172,
//             address: {
//                 city: 'telaviv',
//                 street: 'yafo',
//                 houseNumber: '12'
//             }
//         })
//
//         pat.save().then(function () {
//             usersEmployer.findOne({email: 'myEmp@gmail.com'}).then(function (record) {
//                 assert(record.address.city == 'telaviv')
//                 done()
//             })
//         }).catch(done)
//     })
// })