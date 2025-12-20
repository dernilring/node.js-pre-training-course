// Express.js app with GET /todos/:id endpoint
const express = require('express');
const router = express.Router();

router.get('/todos/:id', (req, res)=>{
    const id= parseInt(req.params.id);
    const todo= todos.find(todo=> todo.id===id);
    
    if(!todos){
        res.status(404).json({
            success: false,
            message: 'todos are not found'
        })
    }
    res.json({
        success: true,
        data: todo
    })
})

module.exports = router; 