const express=require("express");
const body_parser=require("body-parser");
const mongoose=require("mongoose");
const sessions=require("client-sessions");
let app=express();

// body parser middleware
app.use(body_parser.urlencoded({
    extended: false
}));

app.use(sessions({
    cookieName: "session",
    secret: "really_something",
    duration: 30*60*1000
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
    let user = new User (req.body);

    user.save((err)=>{
        if (err)
        {
            let error="something bad happened! Please try again.";

            if (err.code===11000)
            {
                error="email already taken"
            }

            return res.render("register", {error: error});
        }

        res.redirect("/dashboard");
    })
});

app.get("/login", (req,res) => {
    res.render("login");
});

app.post("/login", (req,res) =>{
    User.findOne({ email: req.body.email}, (err,user) => {
        if (err || !user || req.body.password !== user.password){
            return res.render ("login", {
                error: "Incorrect email or password"
            });
        }

        req.session.user_id=user._id;
        res.redirect("/dashboard");
    });
});

app.get("/dashboard", (req,res,next) => {
    if (!(req.session && req.session.user_id)){
        return res.redirect("/login");
    }

    User.findById(req.session, user_id, (err,user) => {
        if (err) {
            return next(err);
        }

        if (!user){
            return res.redirect("/login");
        }

        res.render("dashboard");
    });
});

app.listen(3000);