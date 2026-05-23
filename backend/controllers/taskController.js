const Task = require('../models/Task');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const { search, priority, status, sort, page = 1, limit = 10 } = req.query;

  const query = { user: req.user._id };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (priority && priority !== 'All') {
    query.priority = priority;
  }

  if (status && status !== 'All') {
    query.status = status;
  }

  let sortQuery = {};
  if (sort === 'newest') sortQuery = { createdAt: -1 };
  else if (sort === 'oldest') sortQuery = { createdAt: 1 };
  else if (sort === 'dueSoon') sortQuery = { dueDate: 1 };
  else sortQuery = { createdAt: -1 };

  const skip = (page - 1) * limit;

  const tasks = await Task.find(query)
    .sort(sortQuery)
    .skip(skip)
    .limit(Number(limit));

  const total = await Task.countDocuments(query);

  res.json({
    tasks,
    page: Number(page),
    pages: Math.ceil(total / limit),
    total,
  });
});

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, status, dueDate, tags } = req.body;

  if (!title || !description || !dueDate) {
    res.status(400);
    throw new Error('Please provide title, description and due date');
  }

  const task = await Task.create({
    user: req.user._id,
    title,
    description,
    priority,
    status,
    dueDate,
    tags,
  });

  // Emit socket event for real-time update
  const io = req.app.get('socketio');
  if (io) {
    io.to(req.user._id.toString()).emit('task_created', task);
  }

  res.status(201).json(task);
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Check if user owns task
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  // Emit socket event for real-time update
  const io = req.app.get('socketio');
  if (io) {
    io.to(req.user._id.toString()).emit('task_updated', updatedTask);
  }

  res.json(updatedTask);
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Check if user owns task
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await task.deleteOne();

  // Emit socket event for real-time update
  const io = req.app.get('socketio');
  if (io) {
    io.to(req.user._id.toString()).emit('task_deleted', req.params.id);
  }

  res.json({ message: 'Task removed' });
});

// @desc    Get task statistics
// @route   GET /api/tasks/stats
// @access  Private
const getTaskStats = asyncHandler(async (req, res) => {
  const stats = await Task.aggregate([
    { $match: { user: req.user._id } },
    {
      $group: {
        _id: null,
        totalTasks: { $sum: 1 },
        completedTasks: {
          $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] },
        },
        pendingTasks: {
          $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] },
        },
        inProgressTasks: {
          $sum: { $cond: [{ $eq: ['$status', 'In Progress'] }, 1, 0] },
        },
        highPriority: {
          $sum: { $cond: [{ $eq: ['$priority', 'High'] }, 1, 0] },
        },
        dueSoon: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $ne: ['$status', 'Completed'] },
                  { $lte: ['$dueDate', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)] },
                ],
              },
              1,
              0,
            ],
          },
        },
      },
    },
  ]);

  res.json(stats[0] || {
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    highPriority: 0,
    dueSoon: 0,
  });
});

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
};
