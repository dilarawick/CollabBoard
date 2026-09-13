
const tasksService = require('../../../server/services/tasksService');
const tasksRepository = require('../../../server/repositories/tasksRepository');

jest.mock('../../../server/repositories/tasksRepository');

describe('tasksService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return all tasks', async () => {
    const tasks = [
      { id: '1', title: 'Task 1' },
      { id: '2', title: 'Task 2' }
    ];

    tasksRepository.getAllTasks.mockResolvedValue(tasks);

    const result = await tasksService.listTasks();

    expect(tasksRepository.getAllTasks).toHaveBeenCalled();
    expect(result).toEqual(tasks);
  });

  test('should return a task by id', async () => {
    const task = { id: '1', title: 'Task 1' };

    tasksRepository.getTaskById.mockResolvedValue(task);

    const result = await tasksService.getTask('1');

    expect(tasksRepository.getTaskById).toHaveBeenCalledWith('1');
    expect(result).toEqual(task);
  });

  test('should create a task when title is provided', async () => {
    const taskData = {
      title: 'Test Task',
      status: 'To Do',
      priority: 'medium',
      position: 0
    };

    const createdTask = {
      id: '123',
      ...taskData
    };

    tasksRepository.createTask.mockResolvedValue(createdTask);

    const result = await tasksService.addTask(taskData);

    expect(tasksRepository.createTask).toHaveBeenCalledWith(taskData);
    expect(result).toEqual(createdTask);
  });

  test('should reject a task when title is missing', async () => {
    const taskData = {
      status: 'To Do',
      priority: 'medium'
    };

    await expect(tasksService.addTask(taskData))
      .rejects
      .toThrow('Missing required fields');

    expect(tasksRepository.createTask).not.toHaveBeenCalled();
  });

  test('should update an existing task', async () => {
    const existingTask = { id: '1', title: 'Old Task' };
    const updates = { title: 'Updated Task' };
    const updatedTask = { id: '1', title: 'Updated Task' };

    tasksRepository.getTaskById.mockResolvedValue(existingTask);
    tasksRepository.updateTask.mockResolvedValue(updatedTask);

    const result = await tasksService.modifyTask('1', updates);

    expect(tasksRepository.getTaskById).toHaveBeenCalledWith('1');
    expect(tasksRepository.updateTask).toHaveBeenCalledWith('1', updates);
    expect(result).toEqual(updatedTask);
  });

  test('should reject updating a task that does not exist', async () => {
    tasksRepository.getTaskById.mockResolvedValue(null);

    await expect(
      tasksService.modifyTask('999', { title: 'Updated Task' })
    ).rejects.toThrow('Task not found');

    expect(tasksRepository.updateTask).not.toHaveBeenCalled();
  });

  test('should delete an existing task', async () => {
    const existingTask = { id: '1', title: 'Task 1' };

    tasksRepository.getTaskById.mockResolvedValue(existingTask);
    tasksRepository.deleteTask.mockResolvedValue(true);

    const result = await tasksService.removeTask('1');

    expect(tasksRepository.getTaskById).toHaveBeenCalledWith('1');
    expect(tasksRepository.deleteTask).toHaveBeenCalledWith('1');
    expect(result).toBe(true);
  });

  test('should reject deleting a task that does not exist', async () => {
    tasksRepository.getTaskById.mockResolvedValue(null);

    await expect(
      tasksService.removeTask('999')
    ).rejects.toThrow('Task not found');

    expect(tasksRepository.deleteTask).not.toHaveBeenCalled();
  });
});


