import * as Yup from 'yup';
import Training from '../models/Traning';
import ExercisesTrainings from '../models/ExercisesTrainings';

class TrainingController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      executions: Yup.number(),
      exercises: Yup.array().of(
        Yup.object().shape({
          id: Yup.string().required(),
          series: Yup.number()
            .required()
            .min(1),
          repetitions: Yup.string().required(),
          rest: Yup.number().required(),
        })
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, executions = 0 } = req.body;

    const { id: training_id } = await Training.create({ name, executions });

    const { exercises } = req.body;
    exercises.forEach(async exercise => {
      const { id, series, repetitions, rest } = exercise;
      await ExercisesTrainings.create({
        series,
        repetitions,
        rest,
        exercise_id: id,
        training_id,
      });
    });

    return res.status(200).json({ message: 'Sucess' });
  }
}

export default new TrainingController();
