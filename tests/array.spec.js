var expect = require('chai').expect
//צאי זה ספריה לבדיקות של השמה והשוואות
//מוקה זה ספריה לטסטים בצורה אינטאטויבית


// פונקציה שבודקת מחלקת אראי ובתוכה עוד פונקציות שבודקות אזורים אחרים.
//נצטרך לעשות בדיקות משלנו זה דוגמאות

describe('Array', () => {
    describe('#sort', () => {
        it('should sorting array by name', () => {
            var names = ['Daniel', 'Bob', 'vicrtor', 'Alice']
            expect(names.sort()).to.be.eql(['Alice', 'Bob', 'Daniel', 'vicrtor'])
            //מצפים שהמערך יהיה שווה למערך שהצבנו- בדיקה!
        })

        it('sorting number array', () => {
            expect([5, 2, 1, 6].sort()).to.be.eql([1, 2, 5, 6])
        })
    })

    describe('#fillter', () => {
        it('should filter value', () => {
            var arr = [1, 2, 3, 4, 5, 6]
            expect(arr.filter(value => value % 2 == 0)).to.be.eql([2, 4, 6])
        })
    })
})