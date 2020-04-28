import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const { userId } = req;

    const isInstructor = await User.findOne({
      where: {
        id: userId,
        instructor: true,
      },
    });

    if (!isInstructor) {
      return res.status(401).json({
        error: 'Only instructors can load notifications',
      });
    }

    const notifications = await Notification.find({
      user: userId,
    }).limit(10);

    return res.json(notifications);
  }

  async update(req, res) {
    const notificationId = req.params.id;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
