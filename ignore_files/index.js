const express = require('express');
const app = express();
const path = require('path');   
const session = require('express-session'); 
const flash = require("connect-flash");

const sessionOptions ={
    secret: "secretId",
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionOptions));
app.use(flash());

app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded ({extended:true}));

app.get("/test", (req,res) => {
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    req.flash("success", "Session created successfully");
    res.redirect("/newTest");
})

app.get("/newTest", (req,res) => {
    console.log(req.session.name);
    res.render("page.ejs", {name: req.session.name});
}); 


// app.get("/count", (req,res) => {
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count = 1;
//     }
//     res.send(`No. of times page visited: ${req.session.count}`);
// })

app.listen(3000, () => {
    console.log("Server running ");
})