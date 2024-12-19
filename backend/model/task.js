const mongoose = require('mongoose');
const express = require('express');

const taskSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        
    },
    totalTime: {
        type: Number,
        
    },
    isActive: {
        type: Boolean,
        default: true
    },
    taskName:{
        type: String,
        required: true
    },
    isCompleted:{
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;