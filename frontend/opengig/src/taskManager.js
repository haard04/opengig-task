import React,{useEffect,useState} from "react";

import axios from "axios";

const TaskManager = () => {
    const [tasks, setTasks] = useState([{
        "_id": "6763e9b8aefbffe568991cfd",
        "startTime": "2024-12-19T09:39:04.682Z",
        "isActive": true,
        "taskName": "task2",
        "isCompleted": false,
        "__v": 0
    }]);
    const [loading, setLoading] = useState(false);
    const [newTaskName, setNewTaskName] = useState("");

    const fetchTasks = async () => {
        setLoading(true);
        try{
        const res = await axios.get("http://127.0.0.1:6000/tasks");
        setTasks(res.data);
        setLoading(false);
        }
        catch(error){
            console.log("error fetching tasks",error);
            setLoading(false);

        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const createTask = async () => {
        try{
        await axios.post("http://127.0.0.1:6000/tasks", {
            taskName: newTaskName,
            startTime: Date.now(),
        });
        }
        catch(error){
            console.log("error creating task",error);
        }
    };

    const updateTask = async (task) => {
        try{
        await axios.put(`http://127.0.0.1:6000/tasks/${task._id}`, {
            isCompleted: false,
        });
        }
        catch(error){
            console.log("error updating task",error);
        }
    };
    const CompleteTask = async (task) => {
        try{
        await axios.put(`http://127.0.0.1:6000/tasks/${task._id}`, {
            isCompleted: true,
        });
        }
        catch(error){
            console.log("error updating task",error);
        }
    };
    return (
        <div className="task-manager">
          <style>
            {`
              .task-manager {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                font-family: Arial, sans-serif;
              }
    
              .header {
                background-color: #f8f9fa;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 30px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
    
              .header h1 {
                margin: 0;
                color: #2c3e50;
                font-size: 28px;
                margin-bottom: 20px;
              }
    
              .task-input {
                display: flex;
                gap: 10px;
              }
    
              .task-input input {
                flex: 1;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 16px;
              }
    
              .task-input input:focus {
                outline: none;
                border-color: #3498db;
              }
    
              button {
                background-color: #3498db;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.2s;
              }
    
              button:hover {
                background-color: #2980b9;
              }
    
              .loading {
                text-align: center;
                padding: 20px;
                color: #666;
              }
    
              .task-list {
                display: grid;
                gap: 20px;
              }
    
              .task-card {
                background-color: white;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                transition: transform 0.2s;
              }
    
              .task-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
    
              .task-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 15px;
              }
    
              .task-title {
                font-size: 20px;
                color: #2c3e50;
                margin: 0;
              }
    
              .task-actions {
                display: flex;
                gap: 10px;
              }
    
              .task-actions button {
                font-size: 12px;
                padding: 8px 16px;
              }
    
              .task-info {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
                font-size: 14px;
              }
    
              .info-item label {
                display: block;
                color: #666;
                margin-bottom: 4px;
              }
    
              .info-item p {
                margin: 0;
                color: #2c3e50;
              }
    
              .status {
                font-weight: 600;
              }
    
              .status.completed {
                color: #27ae60;
              }
    
              .status.in-progress {
                color: #3498db;
              }
            `}
          </style>
    
          <div className="header">
            <h1>Task Manager</h1>
            <div className="task-input">
              <input
                type="text"
                placeholder="Enter Task Name"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
              />
              <button onClick={createTask}>Create Task</button>
            </div>
          </div>
    
          {loading ? (
            <div className="loading">Loading tasks for you...</div>
          ) : (
            <div className="task-list">
              {tasks.map((task) => (
                <div key={task._id} className="task-card">
                  <div className="task-header">
                    <h3 className="task-title">{task.taskName}</h3>
                    <div className="task-actions">
                      <button onClick={() => updateTask(task)}>
                        {task.isActive ? "Pause Task" : "Resume Task"}
                      </button>
                      {!task.isCompleted && (
                        <button onClick={() => CompleteTask(task)}>
                          Complete Task
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="task-info">
                    <div className="info-item">
                      <label>Start Time</label>
                      <p>{new Date(task.startTime).toLocaleString()}</p>
                    </div>
                    {task.endTime && (
                      <div className="info-item">
                        <label>End Time</label>
                        <p>{new Date(task.endTime).toLocaleString()}</p>
                      </div>
                    )}
                    {task.totalTime && (
                      <div className="info-item">
                        <label>Total Time</label>
                        <p>{task.totalTime + (Date.now() - Date(task.startTime))}</p>
                      </div>
                    )}
                    <div className="info-item">
                      <label>Status</label>
                      <p className={`status ${task.isCompleted ? 'completed' : 'in-progress'}`}>
                        {task.isCompleted ? 'Completed' : 'In Progress'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );


};

export default TaskManager;