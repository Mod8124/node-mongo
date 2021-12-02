const url = 'mongodb+srv://Mod812:elihan12@cluster0.g9q6p.mongodb.net/hola?retryWrites=true&w=majority';
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Blog = require('./models/blog');
app.set('view engine', 'ejs')
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));//catch request before to send to the server

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then((x)=> {
    console.log('connnected');
    app.listen(3000)
})
.catch((err)=> console.log(err));

//
app.get('/', (req, res)=> {
    const blog = new Blog({
        title:'new blog 2',
        snippet: 'about my new blog',
        body: 'asdfasdfaf'
    });
    blog.save()
    .then((result)=> {
        res.send(result);
    })
    .catch((err)=> {
        console.log(err);
    })
});


app.get('/blogs', (req, res)=> {
    Blog.find()
    .then((result)=> {
        res.send(result);
    })
    .catch((err)=> {
        console.log(err);
    })
})

app.get('/blog', (req, res)=> {
    Blog.findById('617c7c45dce11d1910da3cab')
    .then((x)=> {res.send(x)})
    .catch((err)=>{console.log(err)})
});

app.get('/hola', (req, res)=> {
    Blog.find()
    .then((result)=> res.render('index', {title: 'blog', blog: result}))
    .catch((err)=> console.log(err))
});

app.get('/blogs/create', (req, res)=> {
    res.render('create');
});

app.post('/blogs', (req, res)=> {
    const blog = new Blog(req.body);

    blog.save()
    .then((result)=> {
        res.redirect('/hola')
    })
    .catch((error)=>{
        console.log(error)
    })
});

app.get('/route/:id', (req, res)=> {
    const id = req.params.id;
    Blog.findById(id)
    .then((result)=> {
        res.render('details', {blog: result})
    }) 
    .catch((err)=> {
        console.log(err)
    })
});

app.delete('/route/:id', (req, res)=> {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then((result)=> {
        res.json({
            redirect:'/hola'
        })
    })
    .catch((err)=> {
        console.log(err)
    })
})


