import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import InstructorController from './app/controllers/InstructorController';
import NotificationController from './app/controllers/NotificationController';

import authMiddlewares from './app/middlewares/auth';
import RelationshipController from './app/controllers/RelationshipController';
import StudentController from './app/controllers/StudentController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);

routes.get('/instructors', RelationshipController.index);
routes.post('/instructor', RelationshipController.store);
routes.delete('/instructor/:id', RelationshipController.delete);

routes.get('/students', StudentController.index);

routes.put('/users', UserController.update);

routes.get('/instructors', InstructorController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
