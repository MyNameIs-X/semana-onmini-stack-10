import { Document } from 'mongoose';
export interface IUser extends Document{
  _id: String,
  bio: String,
  githubUserName: String,
  name: String,
  pictureUrl: String,
  techs: Array<String>
}