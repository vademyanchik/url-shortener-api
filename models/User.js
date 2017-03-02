import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  createdAt: { type: Date },
});

mongoose.model('User', UserSchema);
