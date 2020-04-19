import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import InstructorController from './app/controllers/InstructorController';

import authMiddlewares from './app/middlewares/auth';
import RelationshipController from './app/controllers/RelationshipController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);

routes.post('/add-instructor', RelationshipController.store);

routes.put('/users', UserController.update);

routes.get('/instructors', InstructorController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
