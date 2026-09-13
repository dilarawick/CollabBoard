const Task = require('../../../server/models/Task');

describe('Task model', () => {
  test('should create a valid task', () => {
    const task = new Task({
      title: 'Test Task',
      status: 'To Do',
      priority: 'medium',
      position: 0
    });

    const error = task.validateSync();

    expect(error).toBeUndefined();
  });

  test('should require title', () => {
    const task = new Task({
      status: 'To Do',
      priority: 'medium',
      position: 0
    });

    const error = task.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.title).toBeDefined();
  });

  test('should require status', () => {
    const task = new Task({
      title: 'Test Task',
      priority: 'medium',
      position: 0
    });

    const error = task.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.status).toBeDefined();
  });

  test('should require priority', () => {
    const task = new Task({
      title: 'Test Task',
      status: 'To Do',
      position: 0
    });

    const error = task.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.priority).toBeDefined();
  });

  test('should require position', () => {
    const task = new Task({
      title: 'Test Task',
      status: 'To Do',
      priority: 'medium'
    });

    const error = task.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.position).toBeDefined();
  });

  test('should use default version of 0', () => {
    const task = new Task({
      title: 'Test Task',
      status: 'To Do',
      priority: 'medium',
      position: 0
    });

    expect(task.version).toBe(0);
  });
});
