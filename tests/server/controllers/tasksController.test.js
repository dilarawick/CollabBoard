
const tasksController = require('../../../server/controllers/tasksController');
const tasksService = require('../../../server/services/tasksService');

jest.mock('../../../server/services/tasksService');

describe('tasksController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return all tasks with status 200', async () => {
    const tasks = [
      { id: '1', title: 'Task 1' },
      { id: '2', title: 'Task 2' }
    ];

    tasksService.listTasks.mockResolvedValue(tasks);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await tasksController.getTasks(req, res);

    expect(tasksService.listTasks).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(tasks);
  });

  test('should return 500 when getting tasks fails', async () => {
    tasksService.listTasks.mockRejectedValue(new Error('Database error'));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await tasksController.getTasks(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Database error'
    });
  });

  test('should create a task with status 201', async () => {
    const taskData = {
      title: 'New Task',
      status: 'To Do'
    };

    const createdTask = {
      id: '1',
      ...taskData
    };

    tasksService.addTask.mockResolvedValue(createdTask);

    const req = {
      body: taskData
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await tasksController.createTask(req, res);

    expect(tasksService.addTask).toHaveBeenCalledWith(taskData);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdTask);
  });

  test('should return 400 when creating a task fails', async () => {
    tasksService.addTask.mockRejectedValue(
      new Error('Missing required fields')
    );

    const req = {
      body: {}
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await tasksController.createTask(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Missing required fields'
    });
  });

  test('should update a task with status 200', async () => {
    const updates = {
      title: 'Updated Task'
    };

    const updatedTask = {
      id: '1',
      title: 'Updated Task'
    };

    tasksService.modifyTask.mockResolvedValue(updatedTask);

    const req = {
      params: { id: '1' },
      body: updates
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await tasksController.updateTask(req, res);

    expect(tasksService.modifyTask).toHaveBeenCalledWith('1', updates);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedTask);
  });

  test('should return 404 when updating a task fails', async () => {
    tasksService.modifyTask.mockRejectedValue(
      new Error('Task not found')
    );

    const req = {
      params: { id: '999' },
      body: { title: 'Updated Task' }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await tasksController.updateTask(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Task not found'
    });
  });

  test('should delete a task with status 200', async () => {
    tasksService.removeTask.mockResolvedValue(true);

    const req = {
      params: { id: '1' }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await tasksController.deleteTask(req, res);

    expect(tasksService.removeTask).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Task deleted'
    });
  });

  test('should return 404 when deleting a task fails', async () => {
    tasksService.removeTask.mockRejectedValue(
      new Error('Task not found')
    );

    const req = {
      params: { id: '999' }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await tasksController.deleteTask(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Task not found'
    });
  });
});


