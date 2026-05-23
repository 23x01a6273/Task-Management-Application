import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const useSocket = (callback) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const socket = io('http://localhost:5000'); // In production, use your backend URL

    socket.on('connect', () => {
      socket.emit('join_user_room', user._id);
    });

    socket.on('task_created', (task) => {
      toast.success(`New Task: ${task.title}`);
      if (callback) callback('created', task);
    });

    socket.on('task_updated', (task) => {
      toast.success(`Task Updated: ${task.title}`);
      if (callback) callback('updated', task);
    });

    socket.on('task_deleted', (taskId) => {
      toast.error(`Task Deleted`);
      if (callback) callback('deleted', taskId);
    });

    return () => {
      socket.disconnect();
    };
  }, [user, callback]);
};

export default useSocket;
