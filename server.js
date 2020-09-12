const express=require("express");
const body_parser=require("body-parser");
const mongoose=require("mongoose");
let app=express();

// body parser middleware
app.use(body_parser.urlencoded({
    extended: false
}));

// setting configuration
app.set("view engine", "pug");
mongoose.connect("mongodb://localhost/web_authentication");

// model configuration
let User=mongoose.model("User", new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}));

app.get("/", (req,res) => {
    res.render("index");
});

app.get("/register", (req,res) => {
    res.render("register");
});

app.post("/register", (req,res) => {
    res.json(req.body);
});

app.get("/login", (req,res) => {
    res.render("login");
});

app.get("/dashboard", (req,res) => {
    res.render("dashboard");
});

app.listen(3000);