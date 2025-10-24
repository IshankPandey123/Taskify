const mongoose = require('mongoose');

const conn = async () => {
    try {
        await mongoose.connect('mongodb+srv://ishankpandey_db_user:Ishu%401234@cluster0.x25a9zn.mongodb.net/todoapp?retryWrites=true&w=majority');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = conn;