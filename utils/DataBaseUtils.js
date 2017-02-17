import mongoose from 'mongoose';
import '../models/Link';
import { dbUrl } from '../etc/config.json';

const Link = mongoose.model('Link');

export function setUpConnection() {
  mongoose.Promise = global.Promise;
  mongoose.connect(dbUrl);
}

export function listLinks() {
  return Link.find();
}
