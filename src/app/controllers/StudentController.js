import Relationship from '../models/Relationship';
import User from '../models/User';
import File from '../models/File';

const PER_PAGE = 20;

class StudentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const checkUserInstructor = await User.findOne({
      where: { id: req.userId, instructor: true },
    });

    if (!checkUserInstructor) {
      return res.status(401).json({ error: 'User is not a instructor' });
    }

    const relationshipStudents = await Relationship.findAll({
      where: {
        instructor_id: req.userId,
      },
      attributes: ['id'],
      limit: PER_PAGE,
      offset: (page - 1) * PER_PAGE,
      include: [
        {
          model: User,
          as: 'user',
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

    return res.json(relationshipStudents);
  }
}

export default new StudentController();
