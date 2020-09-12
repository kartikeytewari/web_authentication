const express=require("express");
let app=express();

app.set("view engine", "pug");

app.get("/", (req,res) => {
    res.render("index");
});

app.get("/register", (req,res) => {
    res.render("register");
});

app.get("/login", (req,res) => {
    res.render("login");
});

app.get("/dashboard", (req,res) => {
    res.render("dashboard");
});

app.listen(3000);