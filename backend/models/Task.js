const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    priority: {
      type: String,
      required: true,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'In Progress', 'Completed', 'On Hold'],
      default: 'Pending',
    },
    dueDate: {
      type: Date,
      required: [true, 'Please add a due date'],
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
