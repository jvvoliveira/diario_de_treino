import ExercisesTrainings from '../models/ExercisesTrainings';
import Exercise from '../models/Exercise';

class ExercisesTrainingsController {
  async index(req, res) {
    const exercisesTraining = await ExercisesTrainings.findAll({
      where: { training_id: req.params.training },
      attributes: ['id', 'series', 'repetitions', 'rest'],
      include: [
        {
          model: Exercise,
          as: 'exercise',
          attributes: ['name', 'modality'],
        },
      ],
    });

    return res.json(exercisesTraining);
  }
}

export default new ExercisesTrainingsController();
