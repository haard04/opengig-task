const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const taskRoutes = require('./routes/taskRoutes');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(cors({origin: 'http://localhost:3000'}));

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
const MongoURI = 'mongodb+srv://haardshah04:DXgGxtfdQnzlg4gR@cluster0.3htwx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(
    MongoURI,{
        useNewUrlParser: true,useUnifiedTopology: true
    }
).then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.log('MongoDB connection error', err);
});

app.use('', taskRoutes);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

