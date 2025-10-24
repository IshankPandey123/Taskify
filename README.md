# Taskify - Todo App

A modern full-stack todo application built with React, Node.js, Express, and MongoDB. Features user authentication, task management, and a beautiful UI.

![Taskify Logo](frontend/public/favicon.svg)

## 🚀 Features

- **User Authentication**: Secure registration and login system
- **Task Management**: Create, read, update, and delete tasks
- **Real-time Updates**: Instant task synchronization
- **Modern UI**: Clean and responsive design with Tailwind CSS
- **Secure**: Password hashing with bcrypt
- **Database**: MongoDB for data persistence

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing


## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up MongoDB**
   - Create a MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Update `backend/conn/conn.js` with your MongoDB URI

5. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on `http://localhost:3000`

6. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on `http://localhost:3001`

## 🌐 API Endpoints

### Authentication
- `POST /api/v1/register` - User registration
- `POST /api/v1/signin` - User login

### Tasks
- `POST /api/v2/addTask` - Create new task
- `GET /api/v2/tasks/:userId` - Get user's tasks
- `PUT /api/v2/updateTask/:taskId` - Update task
- `DELETE /api/v2/deleteTask/:taskId` - Delete task

## 🚀 Deployment

### Backend (Railway)
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Deploy the `backend` folder
4. Copy the generated URL

### Frontend (Vercel)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `frontend`
4. Add environment variable: `REACT_APP_API_URL` = `your-backend-url`
5. Deploy

## 🔧 Environment Variables

### Backend
- `MONGODB_URI` - MongoDB connection string

### Frontend
- `REACT_APP_API_URL` - Backend API URL

## 📱 Usage

1. **Register**: Create a new account with email, username, and password
2. **Login**: Sign in with your credentials
3. **Add Tasks**: Create new tasks with title and description
4. **Manage Tasks**: Edit or delete existing tasks
5. **Real-time Updates**: See changes instantly

## 🎨 UI Components

- **Landing Page**: Welcome screen with navigation
- **Authentication**: Login and registration forms
- **Todo App**: Main task management interface
- **Responsive Design**: Works on desktop and mobile

## 🔒 Security Features

- Password hashing with bcrypt
- Input validation
- CORS protection
- Secure API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ishank Pandey**
- GitHub: [@ishankpandey](https://github.com/ishankpandey)

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the database
- Tailwind CSS for the styling
- All open-source contributors

---

⭐ **Star this repository if you found it helpful!**
