const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var multer = require('multer');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")))


const storage  = multer.diskStorage({
    
    destination: function(req,file,cb){
        cb(null,'./client/public/upload-file/')
    },
    filename : function(req,file,cb){
        console.log('jai ram ji ki',file)
        cb(null,file.originalname);
        console.log('filefile',file);
    }
})
var upload = multer({storage:storage});

app.use((req, res, next) => {
    // res.status(200).send('Welcome to the egeage api');
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "*"
    );
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.get('/api', function(req, res){
    res.send("Hello world!");
 });

const userRoute = require('./API/routes/userRoutes');
app.use('/sellandleave',upload.single('image'),userRoute);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

module.exports = app;