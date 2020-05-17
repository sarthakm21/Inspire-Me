const express=require("express"),
      bodyParser=require("body-parser"),
      mongoose=require("mongoose");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.set('useUnifiedTopology', true);
mongoURL=process.env.MONGODB_URI || "mongodb://localhost:27017/test";
mongoose.connect(mongoURL, {useNewUrlParser: true});

var postSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    created: {type: Date, default: Date.now}
});

const post = mongoose.model("post", postSchema);

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

app.post("/posts", (req,res)=>{

    var title = req.body.posts.title;
    var author = req.body.posts.author;

    if(author==="" && title===""){
        res.redirect("/posts");
    }

    else if(author===""){
        post.find({title:title}, (err,posts)=>{
            if(err)
            console.log(err);
    
            else{
                res.render("index", {posts: posts})
            }
        });
    }

    else if(title==""){
        post.find({author:author}, (err,posts)=>{
            if(err)
            console.log(err);
    
            else{
                res.render("index", {posts: posts})
            }
        })
    }

    else{
        post.find({title:title , author:author}, (err,posts)=>{
            if(err)
            console.log(err);
    
            else{
                res.render("index", {posts: posts})
            }
        })
    }
    
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

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Tuned into port 3000");
});

module.exports=post;