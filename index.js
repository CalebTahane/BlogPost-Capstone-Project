import bodyParser from "body-parser"
import express from "express"

const app = express()
const port = 3000

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

// An array of posts
let posts = []
// unique id for post
let idCounter = 1

// Home Page
app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts })//Receiving the different posts on the home page(Body-parser)
})

// Create Post
app.get("/createPost", (req, res) => {
    res.render("createPost.ejs")
})

app.post("/createPost", (req, res) => {
    const post = {
        id: idCounter++,
        title: req.body.post_title,
        content: req.body.post_content 
    }

    posts.push(post)
    res.redirect("/")
})

// View a single Post
app.post("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id)
    const post = posts.find(p => p.id === postId)

    if (post) {
        res.render("post.ejs", { post })
    } else {
        res.status(404).send("Post not found! ") 
    }
})

// Edit post
app.get("/posts/:id/edit", (req, res) => {
    const postId = parseInt(req.params.id)
    const post = posts.find(p => p.id === postId)

    if (post) {
        res.render("editPost.ejs", { post })
    } else {
        res.status(404).send("Post not found! ")
    }
}) 

app.post("/posts/:id/edit", (req, res) => {
    const postId = parseInt(req.params.id)
    const post = post.find(p => p.id === postId)

    if (post) {
        post.title = req.body.post_title
        post.content = req.body.post_content
        res.redirect(`/posts/${postId}`)
    } else {
        res.status(404).send("post not found!")
    }
})  

// Delete Post
app.post("/posts/:id/delete", (req, res) => {
    const postId = parseInt(req.params.id)
    posts = posts.filter(p => p.id !== postId)
    res.redirect("/")
}) 

app.listen(port, () => {
    console.log(`App running at port ${port}`)
})