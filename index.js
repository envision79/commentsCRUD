//http://localhost:3000/tacos

const { ESRCH } = require('constants');
const { text } = require('express');
const express = require('express');
const app = express();
const path = require('path');
const { v4 : uuid } = require('uuid');
const methodOverride = require('method-override');

//app.use(express.json());
//this will the body as url encoded data
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    {
        id : uuid(),
        username : 'Todd',
        comment : 'lol that is so funny!'
    },
    {
        id : uuid(),
        username : 'Skyler',
        comment : 'I go to birdwatching with my dog'
    },
    {
        id : uuid(),
        username : 'Sk8erBoi',
        comment : 'Plzz delete your account, Todd'
    },
    {
        id : uuid(),
        username : 'onlysayswoof',
        comment : 'woof woof woof'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', {comments});
})
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})
app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    comments.push({username, comment, id: uuid()});
    //res.send('it worked');
    res.redirect('/comments');
})
app.get('/comments/:id', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', {comment});
})
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})
app.patch('/comments/:id', (req, res) => {
    //put-> will replace all
    //patch->partially modify somepart
    const {id} = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id != id);
    res.redirect('/comments');
})


app.get('/tacos', (req,res) => {
    //req is the object made for using the HTTP request
    res.send("Get/tacos response");
})
app.post('/tacos', (req, res) => {
    console.log(req.body);
    const {txt, num} = req.body;
    //const {meat, qty} = req.body;
    //the above doesn't work
    res.send(`Okay here are your ${num} ${txt} tacos`);
    //res.send("Get/tacos response");
})
app.listen(3000, () => {
    console.log("On port 3000");
})

