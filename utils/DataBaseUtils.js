import mongoose from 'mongoose';
import '../models/Link';
import createHash from './CreateHash';
import { dbUrl } from '../etc/config.json';

const Link = mongoose.model('Link');
const hashLen = 3;
const baseUrl = 'http://localhost:8080';

export function setUpConnection() {
  mongoose.Promise = global.Promise;
  mongoose.connect(dbUrl);
}

export function listLinks() {
  return Link.find();
}

export function createLink(data) {
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

export function redirectUrl(id) {
  const query = { shortLink: `${baseUrl}/${id}` };
  const count = { $inc: { count: 1 } };

  return Link.findOneAndUpdate(query, count);
}
