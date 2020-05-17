const express=require("express"),
      bodyParser=require("body-parser"),
      mongoose=require("mongoose");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
require('dotenv').config();
stuff=process.env.lolksw;
mongoose.set('useUnifiedTopology', true);
mongoURL=process.env.MONGODB_URI || "mongodb+srv://sarthakm21:"+stuff+"@cluster0-xvsfa.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoURL, {useNewUrlParser: true});

var userSchema = new mongoose.Schema({
    email: String,
    password: String
});

var mail="";
var pwd="";

const user = mongoose.model("user", userSchema);

var postSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    created: {type: Date, default: Date.now}
});

const post = mongoose.model("post", postSchema);

// post.create({
//     title: "Coded for 2 hrs",
//     author: "Sarthak",
//     content: "I did 5 questions on codeforces"
// });

//home
app.get("/home", (req,res)=>{
    
    // if(mail==="" || pwd ===""){
    //     res.redirect("/login");
    // }

    res.render("home");
});

//index route
app.get("/posts", (req,res)=>{
    
    // if(mail==="" || pwd ===""){
    //     res.redirect("/login");
    // }

    post.find({}, (err,posts)=>{
        if(err)
        console.log(err);

        else{
            res.render("index", {posts: posts});
        }
    });
});

// app.get("/login", (req,res)=>{
//     res.render("login");
// });

// app.post("/login", (req,res)=>{
//     user.find(req.body.login.email, (err,found)=>{
//         if(err){
//             user.create(req.body.login, (err,done)=>{
//                 if(err)
//                 res.redirect("/login");

//                 else{
//                     mail=req.body.login.email;
//                     pwd=req.body.login.password;
//                     res.redirect("/home");
//                 }
                
//             });
//         }

//         else{
//             user.find(req.body.login, (err,foundAll)=>{
//                 if(err)
//                 alert("Wrong Password!");

//                 else{
//                     mail=req.body.login.email;
//                     pwd=req.body.login.password;
//                     res.redirect("/home");
//                 }
//             });
            
//         }
//     });
// });

// app.get("/", (req,res)=>{
//     res.redirect("/login");
// });

//new route
app.get("/posts/new", (req,res)=>{
    
    // if(mail==="" || pwd ===""){
    //     res.redirect("/login");
    // }   

    res.render("new");
});

//create route
app.post("/posts", (req,res)=>{
    post.create(req.body.posts, (err,post)=>{
        if(err)
        res.redirect("/posts");

        else
        res.redirect("/posts");
    });
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Tuned into port 3000");
});
