const router = require('express').Router();
let Student = require('../models/student.model');

router.route('/').get((req, res) => {
    Student.find()
        .then(student => res.json(student))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
    const ID = req.body.ID;
    const Name = req.body.Name;
    const Year_Of_Batch = Number(req.body.Year_Of_Batch);
    const College_ID = req.body.College_ID;
    const Skills = req.body.Skills;
    const Date_Of_Birth = Date.parse(req.body.Date_Of_Birth);

    const newStudent = new Student({
        ID,
        Name,
        Year_Of_Batch,
        College_ID,
        Skills,
        Date_Of_Birth,
    });
    newStudent.save()
        .then(() => res.json('New Student added ! '))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').get((req, res) => {
    Student.findById(req.params.id)
        .then(student => res.json(student))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req,res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(() => res.json('Student Deleted !'))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/update/:id').post((req,res) => {
    Student.findById(req.params.id)
        .then(student => {
            student.ID = req.body.ID;
            student.Name = req.body.Name;
            student.Year_Of_Batch = Number(req.body.Year_Of_Batch);
            student.College_ID = req.body.College_ID;
            student.Skills = req.body.Skills;
            student.Date_Of_Birth = Date.parse(req.body.Date_Of_Birth);
        

            student.save()
                .then(() => res.json('Student updated !'))
                .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: '+ err));
});



module.exports = router;