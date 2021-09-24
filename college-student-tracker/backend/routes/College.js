const router = require('express').Router();
let College = require('../models/college.model')

router.route('/').get((req, res) => {
    College.find()
        .then(college => res.json(college))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {

    const ID = req.body.ID;
    const Name = req.body.Name;
    const Year_Founded = Number(req.body.Year_Founded);
    const City = req.body.City;
    const State = req.body.State;
    const Country = req.body.Country;
    const Number_Of_Students = Number(req.body.Number_Of_Students);
    const Courses = req.body.Courses;

    const newCollege = new College({
        ID,
        Name,
        Year_Founded,
        City,
        State,
        Country,
        Number_Of_Students,
        Courses,
    });

    newCollege.save()
        .then(() => res.json('New College added ! '))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').get((req, res) => {
    College.findById(req.params.id)
        .then(college => res.json(college))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req,res) => {
    College.findByIdAndDelete(req.params.id)
        .then(() => res.json('College Deleted !'))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/update/:id').post((req,res) => {
    College.findById(req.params.id)
        .then(college => {
            college.ID = req.body.ID;
            college.Name = req.body.Name;
            college.Year_Founded = Number(req.body.duration);
            college.City = req.body.City;
            college.State = req.body.State;
            college.Country = req.body.Country;
            college.Number_Of_Students = Number(req.body.Number_Of_Students);
            college.Courses = req.body.Courses;
        

            college.save()
                .then(() => res.json('College updated !'))
                .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;