const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getTasks).post(protect, createTask);
router.get('/stats', protect, getTaskStats);
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
