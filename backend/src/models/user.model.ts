import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { PointSchema } from './utils/point.schema';

const userSchema: Schema = new mongoose.Schema({
    bio: { type: String, required: false },
    githubUserName: { type: String, required: true },
    name: { type: String, required: true },
    pictureUrl: { type: String, required: true },
    techs: { type: [String], required: true },
    location: { type: PointSchema, index: '2dsphere' }
});

export default mongoose.model<IUser>('User', userSchema);