const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const List = require('../models/list');

router.post('/addTask', async (req, res) => {
  try {
    const { title, body, email } = req.body;

    // Validate required fields
    if (!title || !body || !email) {
      return res.status(400).json({ message: "Title, body, and email are required" });
    }

    // Find the user by email
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new list/task
    const list = new List({ title, body, user: existingUser._id });
    await list.save();

    // Push to user's lists array
    existingUser.lists.push(list._id);
    await existingUser.save();

    res.status(200).json({ message: "Task created successfully", list });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all tasks for a user
router.get('/tasks/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Clean and validate userId
    const cleanUserId = userId.trim();
    console.log('Getting tasks for user ID:', cleanUserId);
    
    if (!mongoose.Types.ObjectId.isValid(cleanUserId)) {
      return res.status(400).json({ 
        message: "Invalid user ID format",
        providedId: userId,
        cleanedId: cleanUserId
      });
    }
    
    const user = await User.findById(cleanUserId).populate('lists');
    if (!user) {
      return res.status(404).json({ 
        message: "User not found",
        searchedId: cleanUserId
      });
    }
    
    res.status(200).json({ 
      message: "Tasks retrieved successfully",
      userId: user._id,
      userEmail: user.email,
      tasksCount: user.lists.length,
      tasks: user.lists 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a task
router.put('/updateTask/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, body } = req.body;
    
    // Clean and validate taskId
    const cleanTaskId = taskId.trim();
    if (!mongoose.Types.ObjectId.isValid(cleanTaskId)) {
      return res.status(400).json({ message: "Invalid task ID format" });
    }
    
    const task = await List.findByIdAndUpdate(
      cleanTaskId,
      { title, body },
      { new: true }
    );
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a task
router.delete('/deleteTask/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    
    // Clean and validate taskId
    const cleanTaskId = taskId.trim();
    if (!mongoose.Types.ObjectId.isValid(cleanTaskId)) {
      return res.status(400).json({ message: "Invalid task ID format" });
    }
    
    const task = await List.findById(cleanTaskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    // Remove task from user's lists array
    await User.findByIdAndUpdate(
      task.user,
      { $pull: { lists: cleanTaskId } }
    );
    
    // Delete the task
    await List.findByIdAndDelete(cleanTaskId);
    
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Debug endpoint to check if user exists (remove in production)
router.get('/debug/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const cleanUserId = userId.trim();
    
    console.log('Looking for user with ID:', cleanUserId);
    
    if (!mongoose.Types.ObjectId.isValid(cleanUserId)) {
      return res.status(400).json({ 
        message: "Invalid user ID format",
        providedId: userId,
        cleanedId: cleanUserId
      });
    }
    
    const user = await User.findById(cleanUserId);
    if (!user) {
      return res.status(404).json({ 
        message: "User not found",
        searchedId: cleanUserId
      });
    }
    
    res.status(200).json({ 
      message: "User found",
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        listsCount: user.lists.length
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Debug endpoint to check all users (remove in production)
router.get('/debug/users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude passwords
    res.status(200).json({ 
      users, 
      count: users.length,
      message: "All users in database"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
