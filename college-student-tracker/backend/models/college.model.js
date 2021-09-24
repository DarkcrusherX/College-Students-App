const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const collegeSchema = new Schema({
    ID : { type: String, required: true },
    Name : { type: String, required: true },
    Year_Founded: { type: Number, required: true },
    City: { type: String, required: true },
    State: { type: String, required: true },
    Country: { type: String, required: true },
    Number_Of_Students: { type: Number, required: true },
    Courses: { type: String, required: true },
}, {
    timestamps:true,
}
);

const College = mongoose.model('College',collegeSchema);

module.exports = College;