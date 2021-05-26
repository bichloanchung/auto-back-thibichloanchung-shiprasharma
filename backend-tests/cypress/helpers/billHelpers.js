var faker = require('faker')

//functions
function createBill(){
    let billValue = {
        "value":faker.commerce.price()
    }
    return billValue
}

//exports
module.exports = {
    createBill
}