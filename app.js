const express=require("express"),
      bodyParser=require("body-parser"),
      mongoose=require("mongoose");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://sarthakm21:VijPri_95@cluster0-xvsfa.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});

var userSchema = new mongoose.Schema({
    user: String,
    password: String
});

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
    res.render("home");
});

//index route
app.get("/posts", (req,res)=>{
    post.find({}, (err,posts)=>{
        if(err)
        console.log(err);

        else{
            res.render("index", {posts: posts});
        }
    });
});

app.get("/", (req,res)=>{
    res.redirect("/home");
});

//new route
app.get("/posts/new", (req,res)=>{
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


app.listen(3000, ()=>{
    console.log("Tuned into port 3000");
})