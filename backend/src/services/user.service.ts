import { Service } from 'typedi';
import { InUserDto } from '../dto';
import { parseStringToArray } from '../utils';
import axios from 'axios';
import User from '../models/user.model';

@Service()
export class UserService{

  // Cadastro de Usuario
  async store(inUserDto: InUserDto){
    try{

      let user = await User.findOne({ githubUsername: inUserDto.githubUsername });

      if(!user){
        const techs = parseStringToArray(inUserDto.techs);
        const response = await axios.get(`https://api.github.com/users/${inUserDto.githubUsername}`);
        
        const location = {
          type: "Point",
          coordinates: [inUserDto.longitude, inUserDto.latitude]
        };
        
        user = await User.create({
          bio: response.data.bio,
          githubUsername: inUserDto.githubUsername,
          name: inUserDto.name,
          pictureUrl: response.data.avatar_url,
          techs,
          location
        });
      }

      return user;
    }catch (err){
      return false;
    }
  }

  async all(){
    try{
      return User.find();
    }catch(err){
      return false;
    }
  }
}