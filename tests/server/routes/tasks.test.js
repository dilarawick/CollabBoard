const express = require('express');
const request = require('supertest');

jest.mock('../../../server/middleware/authMiddleware', () => {
  return (req, res, next) => next();
});

jest.mock('../../../server/controllers/tasksController', () => ({
  getTasks: jest.fn((req, res) => res.status(200).json({ action: 'getTasks' })),
  createTask: jest.fn((req, res) => res.status(201).json({ action: 'createTask' })),
  updateTask: jest.fn((req, res) => res.status(200).json({ action: 'updateTask' })),
  deleteTask: jest.fn((req, res) => res.status(200).json({ action: 'deleteTask' }))
}));

const tasksRouter = require('../../../server/routes/tasks');

const app = express();
app.use(express.json());
app.use('/api/tasks', tasksRouter);

describe('tasks routes', () => {
  test('should route GET /api/tasks to getTasks controller', async () => {
    const response = await request(app)
      .get('/api/tasks');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ action: 'getTasks' });
  });

  test('should route POST /api/tasks to createTask controller', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ action: 'createTask' });
  });

  test('should route PATCH /api/tasks/:id to updateTask controller', async () => {
    const response = await request(app)
      .patch('/api/tasks/123')
      .send({ title: 'Updated Task' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ action: 'updateTask' });
  });

  test('should route DELETE /api/tasks/:id to deleteTask controller', async () => {
    const response = await request(app)
      .delete('/api/tasks/123');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ action: 'deleteTask' });
  });
});