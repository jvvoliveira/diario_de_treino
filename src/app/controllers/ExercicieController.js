import * as Yup from 'yup';
import Exercicie from '../models/Exercicie';

class ExercicieController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      modality: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const exercicieExists = await Exercicie.findOne({
      where: { name: req.body.name },
    });
    if (exercicieExists) {
      return res.status(400).json({ error: 'Exercicie already exists' });
    }

    const { id, name, modality } = await Exercicie.create(req.body);
    return res.json({ id, name, modality });
  }
}

export default new ExercicieController();
