const API_BASE_URL = window.location.origin;

export interface User {
  _id: string;
  email: string;
  username: string;
}

export interface Task {
  _id: string;
  title: string;
  body: string;
  user: string;
}

export interface AuthResponse {
  user: User;
  message?: string;
}

export interface TasksResponse {
  message: string;
  userId: string;
  userEmail: string;
  tasksCount: number;
  tasks: Task[];
}

// Auth API functions
export const authAPI = {
  register: async (email: string, username: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  },
};

// Tasks API functions
export const tasksAPI = {
  addTask: async (title: string, body: string, email: string): Promise<{ message: string; list: Task }> => {
    const response = await fetch(`${API_BASE_URL}/api/v2/addTask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add task');
    }

    return response.json();
  },

  getTasks: async (userId: string): Promise<TasksResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v2/tasks/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch tasks');
    }

    return response.json();
  },

  updateTask: async (taskId: string, title: string, body: string): Promise<{ message: string; task: Task }> => {
    const response = await fetch(`${API_BASE_URL}/api/v2/updateTask/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update task');
    }

    return response.json();
  },

  deleteTask: async (taskId: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/api/v2/deleteTask/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete task');
    }

    return response.json();
  },
};
