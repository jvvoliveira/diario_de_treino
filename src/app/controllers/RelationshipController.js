import * as Yup from 'yup';
import Relationship from '../models/Relationship';
import User from '../models/User';
import File from '../models/File';

const PER_PAGE = 5;
class RelationshipController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const relationshipInstructors = await Relationship.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['id'],
      limit: PER_PAGE,
      offset: (page - 1) * PER_PAGE,
      include: [
        {
          model: User,
          as: 'instructor',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(relationshipInstructors);
  }

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

    const alreadyExists = await Relationship.findOne({
      where: {
        user_id: req.userId,
        instructor_id,
      },
    });

    if (alreadyExists) {
      return res.status(401).json({ error: 'Instructor has been added' });
    }

    const relationship = await Relationship.create({
      user_id: req.userId,
      instructor_id,
    });

    return res.json(relationship);
  }
}

export default new RelationshipController();