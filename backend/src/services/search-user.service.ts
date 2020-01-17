import { Service } from 'typedi';
import { parseStringToArray } from '../utils';
import User from '../models/user.model';

@Service()
export class SearchUserService{

  async all(options: {latitude: Number, longitude: Number, techs: String}){
    const techs = parseStringToArray(options.techs);
    try{
      return User.find({
        techs: {
          $in: techs
        },
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [options.longitude, options.latitude]
            },
            $maxDistance: 10000
          }
        }
      });
    }catch(err){
      return false
    }
  }
}