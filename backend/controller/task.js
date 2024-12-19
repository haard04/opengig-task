const mongoose = require('mongoose');
const express = require('express');
const Task = require('../model/task.js');

const createTask = async (req, res) => {

    let {startTime, taskName} = req.body;
    if(startTime==null){
        startTime = Date.now();
    }

    const task = new Task({
        startTime,
        isActive:true,
        taskName
    });

    try {
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getTasks = async (req, res) => {
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }

};

const updateTask = async (req, res) => {
    const taskid = req.params._id;
    const {isCompleted} = req.body;

    const task = await Task.findById(taskid);

    if(isCompleted==false){
    if(task.isActive){
        task.endTime = Date.now();
        task.totalTime += task.endTime - task.startTime;
        task.isActive = false;
    }
    else{
        task.isActive = true;
        task.startTime = Date.now();
        task.endTime = null;
    }}
    else{
        task.isCompleted = true;
        task.isActive = false;
    }

};

module.exports = {createTask, getTasks, updateTask};