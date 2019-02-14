const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());
var courses = [
    {
        id:1,name:'course1',auth:'auth1',price:1000
    },
    {
        id:2,name:'course2',auth:'auth2',price:2000
    },
    {
        id:3,name:'course3',auth:'auth3',price:1000
    }
];
app.get('/courses',(req,res) => {
    res.send(courses);
});

app.get('/courses/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
        res.status(404).send(`no course found with id ${req.params.id} `); 
    
        res.send(course);
        
});

app.post('/courses',(req,res) => {
    const schema = {
        name: Joi.string().min(3).required(),
        auth: Joi.string().min(3).required(),
        price: Joi.optional()
    };
    const result = Joi.validate(req.body,schema);
    if(result.error)
    {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: (courses.length+1),
        name: req.body.name,
        auth: req.body.auth,
        price: req.body.price
    };
    courses.push(course);
    res.send(course);
});

app.put('/courses/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
    {
        res.status(404).send(`no course found with id ${req.params.id} `); 
        return;
    }
    
    const schema = {
        name: Joi.string().min(3).required(),
        auth: Joi.string().min(3).required(),
        price: Joi.optional()
    };
    const result = Joi.validate(req.body,schema);
    if(result.error)
    {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    course.name= req.body.name;
    course.auth= req.body.auth;
    course.price= req.body.price;
    res.send(course);
});

app.delete('/courses/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
        res.status(404).send(`no course found with id ${req.params.id} `); 
    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course); 
        
});




const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}...`))


