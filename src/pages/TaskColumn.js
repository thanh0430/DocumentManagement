import React from "react";

const TaskColumn = ({ title, tasks, onAddTask, onTaskClick   }) => {
    console.log("task", tasks)
  return (
    <div className="flex flex-col flex-shrink-0 w-64">
      <div className="flex items-center flex-shrink-0 h-10 px-2">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
          {tasks.length}
        </span>
        <button
          onClick={onAddTask} 
          className="ml-2 text-blue-500 hover:text-blue-700 text-3xl"
        >
          +
        </button>
      </div>
      <div className="flex flex-col pb-2 overflow-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
            onClick={() => onTaskClick(task.id)}
          >
            <div>#{task.id}</div>
            <h4 className="mt-1 text-lg font-medium">{task.taskName}</h4>
            <div className="relative flex items-center mt-3">
                <span className="ml-1 leading-none text-xs">Assigned To: {task.fullName}</span>
              </div>
              <div className="relative flex items-center mt-3">
                <span className="ml-1 leading-none text-xs">Email: {task.assignedToEmail}</span>
              </div>
            <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
              <div className="flex items-center">
                <span className="ml-1 leading-none">{task.startDate.slice(0, 10)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
