import * as Yup from 'yup';
import moment from 'moment';
import Group from '../models/Group';

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
      goal: Yup.number(),
      validity: Yup.date()
        .test('date is before', '', function(value) {
          return moment(value).isAfter(new Date());
        })
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    req.body.user_id = req.userId;
    const newGroup = await Group.create(req.body);

    return res.json(newGroup);
  }

  async delete(req, res) {
    const { groupId } = req.params;

    const group = await Group.findByPk(groupId);

    if (!group) {
      return res.status(400).json({ error: 'This training group not exists' });
    }

    if (group.user_id !== req.userId) {
      return res.status(400).json({ error: 'You do not have permission' });
    }
    await group.destroy();
    return res.json(group);
  }
}

export default new GroupController();
