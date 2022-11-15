//======================dependencies
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const budgetData = require("./models/budget.js")
const bodyParser = require('body-parser')

//=============== router object
const router = express.Router

//================= APP object
const app = express()

//================= MIDDLEWARE
app.use(express.urlencoded({extended: true})) // parse data from form submissions into req.body
app.use(morgan("tiny")) //logging middleware
app.use(methodOverride("_method")) // middleware to swap the method if the url has query * ?_method=xxx *
app.use("/static", express.static("public"))

//===================== ROUTES/ROUTERS
//INDEX ROUTE
app.get("/budget/", (req, res) => {
    res.render("index.ejs", {
        budgetInfo:budgetData
    })
});
//=========== NEW ROUTE
app.get('/budget/new', (req, res) => {
    res.render("new.ejs")
});
// CREATE route is a POST route that creates a new soda, and redirects it to the index
app.post("/budget/new", (req, res) => {
    req.body = req.body
    budgetData.push(req.body)
    res.redirect("/budget") 
});
//===============SHOW ROUTE
app.get("/budget/:index", (req, res) => {
    res.render("show.ejs", {
        budgetItem: budgetData[req.params.index],
        index: req.params.index
    });
    //res.redirect("/budget/")
});


//===================== SERVER lISTENER

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`I am listening on port ${PORT}`)
});