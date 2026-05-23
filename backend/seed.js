const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Task = require('./models/Task');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});

    // Create Test User
    const user = await User.create({
      name: 'Alex Henderson',
      email: 'test@example.com',
      password: 'password123',
      jobTitle: 'Senior Project Manager',
      department: 'Product Operations',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    });

    console.log('Test User Created: test@example.com / password123');

    // Create some sample tasks
    const tasks = [
      {
        user: user._id,
        title: 'Finalize Q3 Design System',
        description: 'Complete the documentation for the new design tokens and component library.',
        priority: 'High',
        status: 'In Progress',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        tags: ['Design', 'Product']
      },
      {
        user: user._id,
        title: 'API Endpoint Documentation',
        description: 'Review and update the Swagger documentation for the new task routes.',
        priority: 'Medium',
        status: 'Pending',
        dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        tags: ['Engineering']
      },
      {
        user: user._id,
        title: 'Client Onboarding Emails',
        description: 'Send follow-up emails to the new enterprise clients.',
        priority: 'Low',
        status: 'Completed',
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday
        tags: ['Success']
      }
    ];

    await Task.insertMany(tasks);
    console.log('Sample Tasks Created!');

    mongoose.connection.close();
    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
