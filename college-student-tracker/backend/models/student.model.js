const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const studentSchema = new Schema({
    ID : { type: String, required: true },
    Name : { type: String, required: true },
    Year_Of_Batch: { type: Number, required: true },
    College_ID: { type: String, required: true },
    Skills: { type: String, required: true },
    Date_Of_Birth: { type: Date, required: true },

}, {
    timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;