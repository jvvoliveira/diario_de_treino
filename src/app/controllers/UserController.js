import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const { id, name, email, instructor } = await User.create(req.body);
    return res.json({ id, name, email, instructor });
  }
}

export default new UserController();
