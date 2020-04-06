import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';
import ScheduleController from './app/controllers/ScheduleController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

/* Routes */

// Users
routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);

// Sessions
routes.post('/sessions', SessionController.store);

// Providers
routes.get('/providers', authMiddleware, ProviderController.index);
routes.get(
  '/providers/:providerId/available',
  authMiddleware,
  AvailableController.index
);

// Multer
routes.post(
  '/files',
  authMiddleware,
  upload.single('file'),
  FileController.store
);

// Appointments
routes.post('/appointments', authMiddleware, AppointmentController.store);
routes.get('/appointments', authMiddleware, AppointmentController.index);
routes.delete(
  '/appointments/:id',
  authMiddleware,
  AppointmentController.delete
);

// Schedule
routes.get('/schedule', authMiddleware, ScheduleController.index);

// Notifications
routes.get('/notifications', authMiddleware, NotificationController.index);
routes.put('/notifications/:id', authMiddleware, NotificationController.update);

export default routes;
