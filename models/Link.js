import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LinkSchema = new Schema({
  shortLink: { type: String },
  url: { type: String },
  tags: { type: String },
  count: { type: Number },
  createdAt: { type: Date },
});

mongoose.model('Link', LinkSchema);
