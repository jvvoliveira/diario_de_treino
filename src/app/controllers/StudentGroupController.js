import * as Yup from 'yup';
import moment from 'moment';
import Group from '../models/Group';
import User from '../models/User';
import Relationship from '../models/Relationship';

class StudentGroupController {
  async index(req, res) {
    const { student_id } = req.params;
    const studentId = Number(student_id);
    const isInstructor = await User.findOne({
      where: {
        id: req.userId,
        instructor: true,
      },
    });

    if (!isInstructor) {
      return res.status(401).json({
        error: 'You can not list trainings of others users',
      });
    }

    const studentsByInstructor = await Relationship.findAll({
      where: {
        instructor_id: req.userId,
      },
    });

    const isStudentByInstructor = studentsByInstructor.find(
      relationship => relationship.user_id === studentId
    );

    if (!isStudentByInstructor) {
      return res.status(401).json({
        error: 'The user is not have you by your instructor',
      });
    }

    const groups = await Group.findAll({
      where: { user_id: studentId },
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
      user_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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

    const newGroup = await Group.create(req.body);

    return res.json(newGroup);
  }
}

export default new StudentGroupController();
