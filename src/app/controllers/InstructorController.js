import User from '../models/User';
import File from '../models/File';

class InstructorController {
  async index(req, res) {
    const instructors = await User.findAll({
      where: { instructor: true },
      attributes: ['id', 'name', 'email'],
      include: {
        model: File,
        as: 'avatar',
        attributes: ['name', 'path', 'url'],
      },
    });

    res.json(instructors);
  }
}

export default new InstructorController();
