const db = require("../data/db-config");

module.exports = {
    findUsers
}

function findUsers(){
    return db("users")
}