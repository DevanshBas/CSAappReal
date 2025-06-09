import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, Plus, Play, Pause, Square, BarChart3, Settings, Bell, Focus, Trash2, Check, X } from 'lucide-react';

const StudyBuddy = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Math Homework - Chapter 5', subject: 'Mathematics', dueDate: '2025-06-05', priority: 'high', completed: false, studyTime: 0 },
    { id: 2, title: 'History Essay Draft', subject: 'History', dueDate: '2025-06-07', priority: 'medium', completed: false, studyTime: 45 },
    { id: 3, title: 'Chemistry Lab Report', subject: 'Chemistry', dueDate: '2025-06-04', priority: 'high', completed: true, studyTime: 120 }
  ]);
 
  const [activeTab, setActiveTab] = useState('planner');
  const [timerState, setTimerState] = useState({ minutes: 25, seconds: 0, isRunning: false, isBreak: false });
  const [focusMode, setFocusMode] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', subject: '', dueDate: '', priority: 'medium' });
  const [showAddTask, setShowAddTask] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);
  const [studyStats, setStudyStats] = useState({
    thisWeek: [120, 90, 150, 180, 60, 200, 45],
    totalHours: 84.5,
    tasksCompleted: 23,
    streak: 7
  });

  const timerRef = useRef(null);

  // Pomodoro Timer Logic
  useEffect(() => {
    if (timerState.isRunning) {
      timerRef.current = setInterval(() => {
        setTimerState(prev => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          } else {
            // Timer finished
            const isBreak = !prev.isBreak;
            return {
              minutes: isBreak ? 5 : 25,
              seconds: 0,
              isRunning: false,
              isBreak
            };
          }
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [timerState.isRunning]);

  const toggleTimer = () => {
    setTimerState(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetTimer = () => {
    setTimerState({ minutes: 25, seconds: 0, isRunning: false, isBreak: false });
  };

  const addTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        ...newTask,
        completed: false,
        studyTime: 0
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', subject: '', dueDate: '', priority: 'medium' });
      setShowAddTask(false);
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    // In a real app, you'd reorder tasks here
    setDraggedTask(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low': return 'bg-green-100 border-green-300 text-green-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getUpcomingTasks = () => {
    const today = new Date();
    const upcoming = tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      const diffTime = dueDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 7 && !task.completed;
    });
    return upcoming.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${focusMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      {/* Header */}
      <header className={`${focusMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SB</span>
              </div>
              <h1 className={`text-2xl font-bold ${focusMode ? 'text-white' : 'text-gray-800'}`}>StudyBuddy</h1>
            </div>
           
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setFocusMode(!focusMode)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  focusMode
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Focus size={18} />
                <span>{focusMode ? 'Exit Focus' : 'Focus Mode'}</span>
              </button>
             
              <div className="flex items-center space-x-2 text-sm">
                <Bell size={16} className={focusMode ? 'text-gray-300' : 'text-gray-600'} />
                <span className={focusMode ? 'text-gray-300' : 'text-gray-600'}>
                  {getUpcomingTasks().length} due soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Navigation Tabs */}
            <div className="flex space-x-1 mb-6">
              {[
                { id: 'planner', label: 'Daily Planner', icon: Calendar },
                { id: 'timer', label: 'Pomodoro Timer', icon: Clock },
                { id: 'stats', label: 'Study Stats', icon: BarChart3 }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? (focusMode ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 shadow-md')
                        : (focusMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 hover:bg-white/50')
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className={`${focusMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transition-colors duration-300`}>
              {activeTab === 'planner' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-xl font-semibold ${focusMode ? 'text-white' : 'text-gray-800'}`}>
                      Daily Planner
                    </h2>
                    <button
                      onClick={() => setShowAddTask(true)}
                      className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Plus size={18} />
                      <span>Add Task</span>
                    </button>
                  </div>

                  {/* Add Task Modal */}
                  {showAddTask && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Task</h3>
                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder="Task title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="Subject"
                            value={newTask.subject}
                            onChange={(e) => setNewTask({...newTask, subject: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                          <input
                            type="date"
                            value={newTask.dueDate}
                            onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                          <select
                            value={newTask.priority}
                            onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                          </select>
                        </div>
                        <div className="flex space-x-3 mt-6">
                          <button
                            onClick={addTask}
                            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                          >
                            Add Task
                          </button>
                          <button
                            onClick={() => setShowAddTask(false)}
                            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Task List */}
                  <div className="space-y-3" onDragOver={handleDragOver} onDrop={handleDrop}>
                    {tasks.map(task => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        className={`p-4 rounded-lg border-2 border-dashed border-transparent hover:border-indigo-300 transition-all cursor-move ${
                          task.completed
                            ? (focusMode ? 'bg-gray-700 opacity-60' : 'bg-gray-50 opacity-60')
                            : (focusMode ? 'bg-gray-700' : 'bg-gray-50')
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => toggleTask(task.id)}
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                task.completed
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 hover:border-indigo-500'
                              }`}
                            >
                              {task.completed && <Check size={12} />}
                            </button>
                            <div>
                              <h3 className={`font-medium ${
                                task.completed
                                  ? (focusMode ? 'text-gray-400 line-through' : 'text-gray-500 line-through')
                                  : (focusMode ? 'text-white' : 'text-gray-800')
                              }`}>
                                {task.title}
                              </h3>
                              <div className="flex items-center space-x-3 mt-1">
                                <span className={`text-sm ${focusMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {task.subject}
                                </span>
                                <span className={`text-sm px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                                  {task.priority}
                                </span>
                                <span className={`text-sm ${focusMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  Due: {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                                {task.studyTime > 0 && (
                                  <span className={`text-sm ${focusMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {task.studyTime}min studied
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className={`p-2 rounded-lg hover:bg-red-100 text-red-500 transition-colors ${
                              focusMode ? 'hover:bg-red-900' : ''
                            }`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'timer' && (
                <div className="text-center">
                  <h2 className={`text-xl font-semibold mb-6 ${focusMode ? 'text-white' : 'text-gray-800'}`}>
                    Pomodoro Timer
                  </h2>
                 
                  <div className={`w-64 h-64 mx-auto rounded-full border-8 flex items-center justify-center mb-8 ${
                    timerState.isBreak
                      ? 'border-green-300 bg-green-50'
                      : 'border-indigo-300 bg-indigo-50'
                  } ${focusMode ? 'border-opacity-30 bg-opacity-10' : ''}`}>
                    <div className="text-center">
                      <div className={`text-4xl font-bold mb-2 ${
                        focusMode ? 'text-white' : (timerState.isBreak ? 'text-green-600' : 'text-indigo-600')
                      }`}>
                        {String(timerState.minutes).padStart(2, '0')}:
                        {String(timerState.seconds).padStart(2, '0')}
                      </div>
                      <div className={`text-sm font-medium ${
                        focusMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {timerState.isBreak ? 'Break Time' : 'Focus Session'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <button
                      onClick={toggleTimer}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                        timerState.isRunning
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                      }`}
                    >
                      {timerState.isRunning ? <Pause size={20} /> : <Play size={20} />}
                      <span>{timerState.isRunning ? 'Pause' : 'Start'}</span>
                    </button>
                   
                    <button
                      onClick={resetTimer}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                        focusMode
                          ? 'bg-gray-700 hover:bg-gray-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      <Square size={20} />
                      <span>Reset</span>
                    </button>
                  </div>

                  <div className={`text-sm ${focusMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {timerState.isBreak
                      ? 'Take a short break to recharge your mind'
                      : 'Stay focused! Minimize distractions and concentrate on your task'
                    }
                  </div>
                </div>
              )}

              {activeTab === 'stats' && (
                <div>
                  <h2 className={`text-xl font-semibold mb-6 ${focusMode ? 'text-white' : 'text-gray-800'}`}>
                    Study Statistics
                  </h2>
                 
                  {/* Stats Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className={`p-4 rounded-lg ${focusMode ? 'bg-gray-700' : 'bg-indigo-50'}`}>
                      <div className={`text-2xl font-bold ${focusMode ? 'text-white' : 'text-indigo-600'}`}>
                        {studyStats.totalHours}h
                      </div>
                      <div className={`text-sm ${focusMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Total Study Time
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${focusMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                      <div className={`text-2xl font-bold ${focusMode ? 'text-white' : 'text-green-600'}`}>
                        {studyStats.tasksCompleted}
                      </div>
                      <div className={`text-sm ${focusMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Tasks Completed
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${focusMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
                      <div className={`text-2xl font-bold ${focusMode ? 'text-white' : 'text-orange-600'}`}>
                        {studyStats.streak}
                      </div>
                      <div className={`text-sm ${focusMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Day Streak
                      </div>
                    </div>
                  </div>

                  {/* Weekly Chart */}
                  <div className={`p-4 rounded-lg ${focusMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h3 className={`font-medium mb-4 ${focusMode ? 'text-white' : 'text-gray-800'}`}>
                      This Week's Study Hours
                    </h3>
                    <div className="flex items-end justify-between h-32 space-x-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                        <div key={day} className="flex flex-col items-center flex-1">
                          <div className="w-full bg-indigo-500 rounded-t-lg transition-all hover:bg-indigo-600"
                               style={{ height: `${(studyStats.thisWeek[index] / 200) * 100}%` }}>
                          </div>
                          <div className={`text-xs mt-2 ${focusMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {day}
                          </div>
                          <div className={`text-xs font-medium ${focusMode ? 'text-white' : 'text-gray-800'}`}>
                            {studyStats.thisWeek[index]}m
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Tasks */}
            <div className={`${focusMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transition-colors duration-300`}>
              <h3 className={`font-semibold mb-4 ${focusMode ? 'text-white' : 'text-gray-800'}`}>
                Upcoming Due Dates
              </h3>
              <div className="space-y-3">
                {getUpcomingTasks().slice(0, 5).map(task => (
                  <div key={task.id} className={`p-3 rounded-lg ${focusMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className={`font-medium text-sm ${focusMode ? 'text-white' : 'text-gray-800'}`}>
                      {task.title}
                    </div>
                    <div className={`text-xs ${focusMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                {getUpcomingTasks().length === 0 && (
                  <div className={`text-center py-4 text-sm ${focusMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No upcoming deadlines! 🎉
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`${focusMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transition-colors duration-300`}>
              <h3 className={`font-semibold mb-4 ${focusMode ? 'text-white' : 'text-gray-800'}`}>
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('timer')}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    focusMode
                      ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                      : 'hover:bg-indigo-50 text-gray-700 hover:text-indigo-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Clock size={16} />
                    <span className="text-sm">Start Study Session</span>
                  </div>
                </button>
                <button
                  onClick={() => setShowAddTask(true)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    focusMode
                      ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                      : 'hover:bg-indigo-50 text-gray-700 hover:text-indigo-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Plus size={16} />
                    <span className="text-sm">Add New Task</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    focusMode
                      ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                      : 'hover:bg-indigo-50 text-gray-700 hover:text-indigo-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <BarChart3 size={16} />
                    <span className="text-sm">View Progress</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyBuddy;