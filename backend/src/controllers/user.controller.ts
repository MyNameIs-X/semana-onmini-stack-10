import { JsonController, Get, Post, Body } from 'routing-controllers';
import { InUserDto, OutErrorDto, OutUserDto } from '../dto';
import { UserService } from '../services';
import { plainToClass } from 'class-transformer';

@JsonController('/user')
export class UserController {

  constructor(
    private readonly userService: UserService
  ){}

  @Get('')
  async all(){
    const users = await this.userService.all();
    if(users){
      const outUsersDto: OutUserDto[] = users.map((user) => {
        return plainToClass(OutUserDto, user, {excludeExtraneousValues: true});
      });
      
      return {ok: true, users: outUsersDto};
    }else{
      return plainToClass(OutErrorDto, { ok: false, message: "REQUEST_ERROR" });
    }
    
  }

  @Post('')
  async store(
    @Body() inUserDto: InUserDto
  ){
    const user = await this.userService.store(inUserDto);
    if(user){
      const outUser = plainToClass(OutUserDto, user,
       {
        excludeExtraneousValues: true
      });

      return Object.assign(outUser, { ok: true})
    }else{
      return plainToClass(OutErrorDto, { ok: false, message: "REQUEST_ERROR" }, {
        excludeExtraneousValues: true
      })
    }
  } 
}