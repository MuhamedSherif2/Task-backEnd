const TaskModel = require('../Model/TaskModel');

exports.createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required.' });
        }

        const newTask = await TaskModel.create({ title, description, status });
        return res.status(201).json({ message: 'Task created successfully.', data: newTask });
    } catch (error) {
        res.status(500).json({ message: 'Server error while creating task.', error: error.message });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        return res.status(200).json({ message: 'Tasks retrieved successfully.', data: tasks });
    } catch (error) {
        res.status(500).json({ message: 'Server error while retrieving tasks.', error: error.message });
    }
};

exports.getOneTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        return res.status(200).json({ message: 'Task retrieved successfully.', data: task });
    } catch (error) {
        res.status(500).json({ message: 'Server error while retrieving task.', error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const { id } = req.params;
        const { title, description, status } = req.body;

        const updatedTask = await TaskModel.findByIdAndUpdate(
            id,
            { title, description, status },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found for update.' });
        }

        return res.status(200).json({ message: 'Task updated successfully.', data: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating task.', error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const { id } = req.params;
        const deletedTask = await TaskModel.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found for deletion.' });
        }

        return res.status(200).json({ message: 'Task deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting task.', error: error.message });
    }
};