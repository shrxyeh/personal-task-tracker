import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleComplete, onDeleteTask, onEditTask }) => {
  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <div className="bg-gray-800 text-gray-400 text-center py-12 rounded-lg border border-gray-700">
          <p className="text-lg">No tasks found.</p>
          <p className="text-sm mt-2">Create your first task above!</p>
        </div>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;