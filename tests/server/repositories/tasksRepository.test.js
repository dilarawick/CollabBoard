
const mongoose = require('mongoose');

jest.mock('../../../server/models/Task', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn()
}));

jest.mock('../../../server/models/Board', () => ({
  findOne: jest.fn()
}));

const Task = require('../../../server/models/Task');
const Board = require('../../../server/models/Board');
const tasksRepository = require('../../../server/repositories/tasksRepository');

describe('tasksRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mongoose.connection.readyState = 0;
  });

  test('should return mock tasks when database is not connected', async () => {
    const result = await tasksRepository.getAllTasks();

    expect(Array.isArray(result)).toBe(true);
  });

  test('should return a task by id from mock data', async () => {
    const allTasks = await tasksRepository.getAllTasks();

    if (allTasks.length > 0) {
      const result = await tasksRepository.getTaskById(allTasks[0].id);

      expect(result).toEqual(allTasks[0]);
    }
  });

  test('should return null when mock task does not exist', async () => {
    const result = await tasksRepository.getTaskById('does-not-exist');

    expect(result).toBeUndefined();
  });

  test('should create a task using mock data when database is not connected', async () => {
    const taskData = {
      title: 'Repository Test Task',
      assignee: 'Test User',
      status: 'To Do',
      priority: 'medium',
      position: 0
    };

    const result = await tasksRepository.createTask(taskData);

    expect(result).toEqual(
      expect.objectContaining({
        title: 'Repository Test Task',
        assignee: 'Test User',
        status: 'To Do',
        priority: 'medium'
      })
    );
  });

  test('should update an existing mock task', async () => {
    const allTasks = await tasksRepository.getAllTasks();

    if (allTasks.length > 0) {
      const taskId = allTasks[0].id;

      const result = await tasksRepository.updateTask(taskId, {
        title: 'Updated Repository Task'
      });

      expect(result).toEqual(
        expect.objectContaining({
          id: taskId,
          title: 'Updated Repository Task'
        })
      );
    }
  });

  test('should return null when updating a missing mock task', async () => {
    const result = await tasksRepository.updateTask(
      'does-not-exist',
      { title: 'Updated Task' }
    );

    expect(result).toBeNull();
  });

  test('should return true when deleting an existing mock task', async () => {
    const taskData = {
      title: 'Task To Delete',
      status: 'To Do',
      priority: 'medium',
      position: 0
    };

    const createdTask = await tasksRepository.createTask(taskData);

    const result = await tasksRepository.deleteTask(createdTask.id);

    expect(result).toBe(true);
  });

  test('should return false when deleting a missing mock task', async () => {
    const result = await tasksRepository.deleteTask('does-not-exist');

    expect(result).toBe(false);
  });
});


