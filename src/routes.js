import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import InstructorController from './app/controllers/InstructorController';
import NotificationController from './app/controllers/NotificationController';
import ExerciseController from './app/controllers/ExerciseController';
import TrainingController from './app/controllers/TrainingController';

import authMiddlewares from './app/middlewares/auth';
import RelationshipController from './app/controllers/RelationshipController';
import StudentController from './app/controllers/StudentController';
import GroupController from './app/controllers/GroupController';
import ExercisesTrainingsController from './app/controllers/ExercisesTrainingsController';
import StudentGroupController from './app/controllers/StudentGroupController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);

routes.get('/instructors', RelationshipController.index);
routes.post('/instructor', RelationshipController.store);
routes.delete('/instructor/:id', RelationshipController.delete);

routes.get('/students', StudentController.index);

routes.get('/users/:user_id', UserController.index);
routes.put('/users', UserController.update);

routes.get('/instructors', InstructorController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.get('/exercise/:modality', ExerciseController.index);
routes.post('/exercise', ExerciseController.store);
routes.post('/training/:group', TrainingController.store);
routes.get('/training/:group', TrainingController.index);
routes.get('/exercises/:training', ExercisesTrainingsController.index);

routes.post('/group', GroupController.store);
routes.get('/group', GroupController.index);
routes.post('/group/student', StudentGroupController.store);
routes.get('/group/student/:student_id', StudentGroupController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
