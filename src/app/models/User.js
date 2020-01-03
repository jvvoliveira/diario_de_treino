import { mongoose } from 'mongoose';

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  instructor: {
    type: Boolean,
    required: true,
    default: false,
  },
});

mongoose.model('User', UserSchema);
