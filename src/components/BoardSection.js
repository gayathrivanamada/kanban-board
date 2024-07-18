import React from 'react';
import TaskCard from './TaskCard';
import './BoardSection.css';

const BoardSection = ({ title, tasks, onDragStart, onDeleteTask, onSaveEdit }) => {
    const handleDragOver = event => {
        event.preventDefault();
    };

    const handleDrop = (event, newStatus) => {
        event.preventDefault();
        const taskId = event.dataTransfer.getData('task');
        const source = event.dataTransfer.getData('source');

        // Prevent dropping in the same section
        if (source !== newStatus) {
            // Find the task being dragged
            const draggedTask = JSON.parse(taskId);

            // Update task status
            const updatedTask = { ...draggedTask, status: newStatus };
            onSaveEdit(draggedTask.id, updatedTask); // Ensure onSaveEdit updates state correctly
        }
    };

    return (
        <div
            className="board-section"
            onDragOver={handleDragOver}
            onDrop={event => handleDrop(event, title.toLowerCase().replace(' ', ''))}
        >
            <h2 className="section-title">{title}</h2>
            <div className="task-cards">
                {tasks.map(task => (
                    <TaskCard
                        key={task.id} // Ensure each TaskCard has a unique key
                        task={task}
                        onDragStart={onDragStart}
                        onDelete={onDeleteTask}
                        onSaveEdit={onSaveEdit}
                    />
                ))}
            </div>
        </div>
    );
};

export default BoardSection;
