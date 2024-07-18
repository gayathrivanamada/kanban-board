import React, { useState } from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onDragStart, onDelete, onSaveEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    const handleEditChange = e => {
        const { name, value } = e.target;
        setEditedTask(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSaveEdit = () => {
        onSaveEdit(task.id, editedTask);
        setIsEditing(false);
    };

    const taskClass = task.status.toLowerCase().replace(' ', '');

    const handleDragStartInternal = event => {
        const taskData = JSON.stringify(task);
        event.dataTransfer.setData('task', taskData);
        event.dataTransfer.setData('source', task.status);
        onDragStart(event, task); // Ensure to pass event and task data to the parent handler
    };

    return (
        <div
            className={`task-card ${taskClass}`}
            draggable
            onDragStart={handleDragStartInternal}
        >
            {isEditing ? (
                <div className="edit-form">
                    <input
                        type="text"
                        name="title"
                        value={editedTask.title}
                        onChange={handleEditChange}
                    />
                    <textarea
                        name="description"
                        value={editedTask.description}
                        onChange={handleEditChange}
                    />
                    <div className="edit-buttons">
                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <div className="task-card-buttons">
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={() => onDelete(task.id)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskCard;
