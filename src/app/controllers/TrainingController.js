import * as Yup from 'yup';
import Training from '../models/Traning';
import ExercisesTrainings from '../models/ExercisesTrainings';
import Group from '../models/Group';

class TrainingController {
  async index(req, res) {
    const trainings = await Training.findAll({
      where: { group_id: req.params.group },
    });

    return res.json(trainings);
  }

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

    const group_id = req.params.group;
    const existGroup = await Group.findOne({ where: { id: req.params.group } });
    if (!existGroup) {
      return res.status(400).json({ error: 'Group not exists' });
    }

    const { name, executions = 0 } = req.body;

    const { id: training_id } = await Training.create({
      name,
      executions,
      group_id,
    });

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

    return res.status(200).json();
  }
}

export default new TrainingController();
