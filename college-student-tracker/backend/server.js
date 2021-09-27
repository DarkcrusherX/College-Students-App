const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Mongoose } = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.Port || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI ;
mongoose.connect(uri, { useNewUrlParser: true ,useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open',() => {
    console.log("MongoDB database connection established successfully");
});

const StudentRouter = require('./routes/Student');
const CollegeRouter = require('./routes/College');

app.use('/Student', StudentRouter);
app.use('/College', CollegeRouter);

// Step 1:
app.use(express.static(path.resolve(__dirname, "./build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});