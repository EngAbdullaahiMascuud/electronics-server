// -- Active: 1715258325547@@mysql-28b30871-abdullaahimascuud123-1cee.h.aivencloud.com@16309

// NOTE halkaan waxaa ku qeexan (database config) isticmaal database si aad 
// u isticmashid mysql, sameey database _name oo u bixi (fast_food_db)
const mysql= require('mysql2');

// const connection= mysql.createConnection({
//     host: "localhost",
//     user: "root",  // if you are using custom username use your own custom username here
//     password: "", // if your are using custom password use your own custom password here
//     database: "electronics"   // make sure to create this database
// })

const connection= mysql.createConnection({
    port: 16309,
        host: "mysql-28b30871-abdullaahimascuud123-1cee.h.aivencloud.com",
        user: "avnadmin",  // if you are using custom username use your own custom username here
        password: "AVNS_d4u9WH2JBmGHPfpqSn8", // if your are using custom password use your own custom password here
        database: "eletronics"   // make sure to create this database
    })
connection.connect((err)=>{
    if(err) throw err;

})

module.exports.getConnection=connection;