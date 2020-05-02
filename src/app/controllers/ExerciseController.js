import * as Yup from 'yup';
import Exercise from '../models/Exercise';

class ExerciseController {
  async index(req, res) {
    const { modality } = req.params;
    const exercises = await Exercise.findAll({
      where: { modality },
      attributes: ['id', 'name'],
    });
    res.json(exercises);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      modality: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const exerciseExists = await Exercise.findOne({
      where: { name: req.body.name },
    });
    if (exerciseExists) {
      return res.status(400).json({ error: 'Exercise already exists' });
    }

    const { id, name, modality } = await Exercise.create(req.body);
    return res.json({ id, name, modality });
  }
}

export default new ExerciseController();
