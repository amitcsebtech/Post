const express=require("express");
const app=express();
const port=3000;
const path=require("path");
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
// creating for unique id
const {v4:uuidv4}=require('uuid');

app.use(express.urlencoded({extended:true}));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"Amit",
        content:"This is my first post.",
    },
    {
        id:uuidv4(),
        username:"Ballu",
        content:"I love coding.",
    },
    {
        id:uuidv4(),
        username:"Balram",
        content:"I am a software engineer.",
    }
];

app.get("/",(req,res)=>{
    res.redirect("/post");
})

app.get("/post",(req,res)=>{
    res.render("index.ejs",{posts});
});

//show only one post
app.get("/post/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((post)=>post.id===id);
    res.render("show.ejs",{post});
});

// show form to create a new post
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

// add a new post
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.unshift({id,username,content});
    res.redirect("/post");
});

// edit a post
app.patch("/post/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((post)=>post.id===id);
    post.content=newContent;
    res.redirect("/post");
});

// show form to edit a post
app.get("/post/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((post)=>post.id===id);
    res.render("edit",{post});
});

// delete a post
app.delete("/post/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((post)=>post.id!=id);
    res.redirect("/post");
});


app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});
