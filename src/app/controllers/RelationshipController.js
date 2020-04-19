import * as Yup from 'yup';
import Relationship from '../models/Relationship';
import User from '../models/User';

class RelationshipController {
  async store(req, res) {
    const schema = Yup.object().shape({
      instructor_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { instructor_id } = req.body;

    const isInstructor = await User.findOne({
      where: {
        id: instructor_id,
        instructor: true,
      },
    });

    if (!isInstructor) {
      return res.status(401).json({
        error: 'You can only add instructor with user is be instructor',
      });
    }

    const relationship = await Relationship.create({
      user_id: req.userId,
      instructor_id,
    });

    return res.json(relationship);
  }
}

export default new RelationshipController();
