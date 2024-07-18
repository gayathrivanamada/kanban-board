import React, { useState } from 'react';
import BoardSection from './BoardSection';
import './board.css';
// The main KanbanBoard component
const KanbanBoard = () => {
// Initial set of tasks for the Kanban board
    const initialTasks = [
        { id: 1, title: 'Task 1', description: 'Description for Task 1', status: 'todo' },
        { id: 2, title: 'Task 2', description: 'Description for Task 2', status: 'inProgress' },
        { id: 3, title: 'Task 3', description: 'Description for Task 3', status: 'peerReview' },
        { id: 4, title: 'Task 4', description: 'Description for Task 4', status: 'done' },
    ];
 // State hooks for tasks, search query, adding task, new task title, and new task description
    const [tasks, setTasks] = useState(initialTasks);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
// Handle handle Drag event for tasks
    const handleDragStart = (event, task) => {
        event.dataTransfer.setData('task', JSON.stringify(task));
        event.dataTransfer.setData('source', task.status);
    };
 // Handle saving edited task
    const handleSaveEdit = (taskId, updatedTask) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, ...updatedTask } : task
        );
        setTasks(updatedTasks);
    };
     // Handle task deletion
    const handleDeleteTask = taskId => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
    };
   // Handle search query change
    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };
 // Handle adding a new task
    const handleAddTask = () => {
        setIsAddingTask(true);
    };
// Handle creating a new task
    const handleCreateTask = () => {
        const newTask = {
            id: tasks.length + 1,
            title: newTaskTitle,
            description: newTaskDescription,
            status: 'todo',
        };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        setIsAddingTask(false);
        setNewTaskTitle('');
        setNewTaskDescription('');
    };

    return (
        <div className="kanban-board">
            <div className="board-header">
                <input
                    type="text"
    // Search Bar and searching tasks
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-bar"
                />
                <div className="add-task-container">
                    <button className="add-task-button" onClick={handleAddTask} disabled={isAddingTask}>
                        + Add Task
                    </button>
                    {isAddingTask && (
                        <div className="task-card">
                            <input
                                type="text"
                                placeholder="Task Title"
                                value={newTaskTitle}
                                onChange={e => setNewTaskTitle(e.target.value)}
                            />
                            <textarea
                                placeholder="Task Description"
                                value={newTaskDescription}
                                onChange={e => setNewTaskDescription(e.target.value)}
                            />
                            <button onClick={handleCreateTask}>Add Task</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="board-sections">
                <div className="board-column">
                    <BoardSection
                        title="To Do"
                        tasks={tasks.filter(
                            task =>
                                task.status === 'todo' &&
                                task.title.toLowerCase().includes(searchQuery.toLowerCase())
                        )}
                        onDragStart={handleDragStart}
                        onDeleteTask={handleDeleteTask}
                        onSaveEdit={handleSaveEdit}
                    />
                </div>
                <div className="board-column">
                    <BoardSection
                        title="In Progress"
                        tasks={tasks.filter(
                            task =>
                                task.status === 'inProgress' &&
                                task.title.toLowerCase().includes(searchQuery.toLowerCase())
                        )}
                        onDragStart={handleDragStart}
                        onDeleteTask={handleDeleteTask}
                        onSaveEdit={handleSaveEdit}
                    />
                </div>
                <div className="board-column">
                    <BoardSection
                        title="Peer Review"
                        tasks={tasks.filter(
                            task =>
                                task.status === 'peerReview' &&
                                task.title.toLowerCase().includes(searchQuery.toLowerCase())
                        )}
                        onDragStart={handleDragStart}
                        onDeleteTask={handleDeleteTask}
                        onSaveEdit={handleSaveEdit}
                    />
                </div>
                <div className="board-column">
                    <BoardSection
                        title="Done"
                        tasks={tasks.filter(
                            task =>
                                task.status === 'done' &&
                                task.title.toLowerCase().includes(searchQuery.toLowerCase())
                        )}
                        onDragStart={handleDragStart}
                        onDeleteTask={handleDeleteTask}
                        onSaveEdit={handleSaveEdit}
                    />
                </div>
            </div>
        </div>
    );
};

export default KanbanBoard;
