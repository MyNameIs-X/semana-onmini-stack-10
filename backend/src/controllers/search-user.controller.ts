import { Get, JsonController, QueryParam } from 'routing-controllers';
import { SearchUserService } from '../services';
import { OutErrorDto, OutUserDto } from '../dto';
import { plainToClass } from 'class-transformer';

@JsonController('/searchUser')
export class SearchUserController{

  constructor(
    private readonly searchUserService: SearchUserService
  ){}

  @Get('')
  async all(
    @QueryParam('longitude') longitude: number,
    @QueryParam('latitude') latitude: number,
    @QueryParam('techs') techs: String
  ){
    const users = await this.searchUserService.all({
      latitude,
      longitude,
      techs
    });

    if(users){
      const outUsers = users.map((user) => {
        return plainToClass(OutUserDto, user, { excludeExtraneousValues: true });
      });

      return { ok: true, users: outUsers }
    }else{
      return plainToClass(OutErrorDto, { ok: false, message: "REQUEST_ERROR" }, {
        excludeExtraneousValues: true
      })
    }
  }
}