import React, { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Task, tasksAPI } from '../services/api';

export function TodoApp() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load tasks when component mounts or user changes
  useEffect(() => {
    if (user?._id) {
      loadTasks();
    }
  }, [user?._id]);

  const loadTasks = async () => {
    if (!user?._id) return;
    
    try {
      setLoading(true);
      const response = await tasksAPI.getTasks(user._id);
      setTasks(response.tasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !user?.email) return;

    try {
      setLoading(true);
      setError('');

      if (editingId !== null) {
        // Update existing task
        const response = await tasksAPI.updateTask(editingId, title, body);
        setTasks(tasks.map(task => 
          task._id === editingId 
            ? { ...task, title, body }
            : task
        ));
        setEditingId(null);
      } else {
        // Add new task
        const response = await tasksAPI.addTask(title, body, user.email);
        setTasks([...tasks, response.list]);
      }

      setTitle('');
      setBody('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task: Task) => {
    setTitle(task.title);
    setBody(task.body);
    setEditingId(task._id);
  };

  const handleDelete = async (taskId: string) => {
    try {
      setLoading(true);
      setError('');
      await tasksAPI.deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setBody('');
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Add Task Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="mb-6">{editingId ? 'Update Task' : 'Add New Task'}</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleAddTask} className="space-y-6">
            <div>
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 border-gray-300"
                placeholder="Enter task title"
                required
                disabled={loading}
              />
            </div>
            
            <div>
              <Label htmlFor="body">Task Body</Label>
              <Textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="mt-2 border-gray-300 min-h-24"
                placeholder="Enter task description"
                disabled={loading}
              />
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <Plus className="w-5 h-5" />
                {loading ? 'Saving...' : editingId ? 'Update Task' : 'Add Task'}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-6 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Task List */}
        {loading && tasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p>Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto mb-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1562616848-c8a979662d5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjByZWxheGluZyUyMHBlYWNlfGVufDF8fHx8MTc2MTMxMDkwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="All done"
                className="w-full h-auto grayscale rounded-lg"
              />
            </div>
            <h3 className="mb-2">All done! Your list is clear.</h3>
            <p className="text-gray-500">Add a new task to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map(task => (
              <div
                key={task._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="mb-2">{task.title}</h3>
                    {task.body && (
                      <p className="text-gray-600">{task.body}</p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(task)}
                      className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
                      title="Edit task"
                      disabled={loading}
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
                      title="Delete task"
                      disabled={loading}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
