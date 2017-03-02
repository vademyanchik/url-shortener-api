import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import '../models/Link';
import '../models/User';
import createHash from './CreateHash';
import { dbUrl } from '../etc/config.json';

const Link = mongoose.model('Link');
const User = mongoose.model('User');

export function setUpConnection() {
  mongoose.Promise = global.Promise;
  mongoose.connect(dbUrl);
}

export function listLinks() {
  return Link.find();
}

export function createUser(data) {
  const { username, email, password } = data;
  const passwordHash = bcrypt.hashSync(password, 10);
  const user = new User({
    username: username,
    email: email,
    password: passwordHash,
    createdAt: new Date(),
  });
  return user.save();
}

export function authUser(data) {
  return User.find({
    $or: [
      { username: data.identifier },
      { email: data.identifier },
    ],
  });
}

export function createLink(data) {
  const hashLen = 3;
  const baseUrl = 'http://localhost:8080';
  const uniqueID = createHash(hashLen);
  const link = new Link({
    shortLink: `${baseUrl}/${uniqueID}`,
    url: data.link,
    tags: data.tags,
    count: 0,
    createdAt: new Date(),
  });
  return link.save();
}

export function getLink(id) {
  const query = { _id: `${id}` };
  return Link.findOne(query);
}

export function updateLink(data, id) {
  const query = { _id: `${id}` };
  const dataLink = { $set: { url: data.link, tags: data.tags } };
  return Link.findOneAndUpdate(query, dataLink, { new: true });
}

export function deleteLink(id) {
  const query = { _id: `${id}` };
  return Link.remove(query);
}

export function redirectUrl(id) {
  const baseUrl = 'http://localhost:8080';
  const query = { shortLink: `${baseUrl}/${id}` };
  const count = { $inc: { count: 1 } };
  return Link.findOneAndUpdate(query, count);
}
