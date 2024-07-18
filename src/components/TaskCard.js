import React, { useState } from 'react';
import './TaskCard.css';
/**
 * TaskCard component represents a single task in the Kanban board.
 * It supports dragging, editing, and deleting tasks.
 * 
 * Props:
 * - task: The task object containing id, title, description, and status.
 * - onDragStart: Function to handle the drag start event.
 * - onDelete: Function to handle the deletion of the task.
 * - onSaveEdit: Function to handle saving the edited task.
 */
const TaskCard = ({ task, onDragStart, onDelete, onSaveEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    /**
     * Handles changes in the edit form inputs.
     * Updates the edited task state with new values.
     */
    const handleEditChange = e => {
        const { name, value } = e.target;
        setEditedTask(prevState => ({ ...prevState, [name]: value }));
    };


    /**
     * Handles saving the edited task.
     * Calls the onSaveEdit prop function with the updated task.
     */
    const handleSaveEdit = () => {
        onSaveEdit(task.id, editedTask);
        setIsEditing(false);
    };
   // Convert task status to a CSS class-friendly format
    const taskClass = task.status.toLowerCase().replace(' ', '');
/**
     * Handles the drag start event.
     * Sets the task data in the dataTransfer object for the drag event.
     */
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
