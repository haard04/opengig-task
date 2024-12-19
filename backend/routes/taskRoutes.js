const express = require('express');
const {createTask,getTasks,updateTask} = require('../controller/task');
const router = express.Router();

router.post('/tasks',createTask);
router.get('/tasks',getTasks);
router.put('/tasks/:_id',updateTask);

module.exports = router;