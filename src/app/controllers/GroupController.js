import * as Yup from 'yup';
import moment from 'moment';
import Group from '../models/Group';
import User from '../models/User';

class GroupController {
  async index(req, res) {
    const groups = await Group.findAll({
      where: { user_id: req.userId },
    });

    return res.json(groups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      executions: Yup.number(),
      goal: Yup.number(),
      validity: Yup.date()
        .test('date is before', '', function(value) {
          return moment(value).isAfter(new Date());
        })
        .required(),
      user_id: Yup.number(),
      instructor_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (req.body.user_id) {
      if (req.body.user_id === req.userId) {
        return res.status(401).json({
          error: 'You can´t be instructor to yourself',
        });
      }
      const isInstructor = await User.findOne({
        where: {
          id: req.userId,
          instructor: true,
        },
      });
      if (!isInstructor) {
        return res.status(401).json({
          error:
            'You can only add training to another user if you be a instructor',
        });
      }
      req.body.instructor_id = req.userId;
    } else {
      req.body.user_id = req.userId;
    }

    const newGroup = await Group.create(req.body);

    return res.json(newGroup);
  }
}

export default new GroupController();
