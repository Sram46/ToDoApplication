const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Set up EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Sample data for To-Do tasks
let tasks = [
    { id: 1, description: 'Learn Node.js', completed: false },
    { id: 2, description: 'Build a To-Do app', completed: false }
];

// Home route to display the To-Do list
app.get('/', (req, res) => {
    res.render('index', { tasks: tasks });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
// Route to handle adding a new task
app.post('/add', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        description: req.body.task,
        completed: false
    };
    tasks.push(newTask);
    res.redirect('/');
});

// Route to handle editing a task
app.post('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.description = req.body.description;
        task.completed = req.body.completed === 'on';
    }
    res.redirect('/');
});

// Route to handle deleting a task
app.post('/delete/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.redirect('/');
});
