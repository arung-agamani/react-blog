const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
// const bcrypt = require('bcrypt');
require('dotenv').config();

const mongo_url = process.env.MONGO_URL;

mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology : true })
	.then(() => { console.log('Connected to MongoDB'); })
	.catch(err => { console.error('Something went wrong', err); });

const PostSchema = new mongoose.Schema({
    title : String,
    datePosted : {
        type : Date,
        default : new Date()
    },
    author : String,
    description : String,
    imageheader : String,
    blogContent : String,
    link : String,
});

const PostModel = mongoose.model('Post', PostSchema);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(express.static(__dirname + '/dist'));
app.options('*', cors());

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.post('/post', async (req, res) => {
    const posts = await PostModel.find({}).sort('-datePosted');
    res.send(posts);
});

app.post('/crudPost', (req, res) => {
    if (req.body.action == "UPDATE") {
        if (req.body.password == process.env.HARUKA_PASSWORD) {
            PostModel.findByIdAndUpdate(req.body.id, req.body.postData, (err, update) => {
                if (err)
                    res.send({status : "FAILED", message : "Database error"})
                else
                    res.send({status : "SUCCESS"})
            });
        } else {
            res.send({status : "UNAUTHORIZED", message : "Unknown User"});
        }
    } else if (req.body.action == "CREATE") {
        if (req.body.password == process.env.HARUKA_PASSWORD) {
            PostModel.create(req.body.postData, (err, create) => {
                if (err)
                    res.send({status : "FAILED", message : "Database error"})
                else
                    res.send({status : "SUCCESS"})
            })
        } else {
            res.send({status : "UNAUTHORIZED", message : "Unknown User"});
        }
    } else {
        res.send({status : "FAILED", message : 'Unknown Action'});
    }
})

app.post('/post/single', async (req, res) => {
    console.log(req.body);
    const post = await PostModel.findOne({ link : req.body.title});
    res.send(post);
});

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});