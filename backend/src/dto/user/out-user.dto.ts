import { IsString, IsArray, IsNotEmpty } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { OutLocationDto } from '../location/out-location.dto';

export class OutUserDto{

  @Expose()
  id: String;

  @Expose()
  @IsString()
  @IsNotEmpty()
  bio: String;

  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  githubUsername: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  pictureUrl: String;

  @Expose()
  @IsArray()
  @IsNotEmpty()
  techs: Array<String>

  @Expose()
  @IsNotEmpty()
  @Type(() => OutLocationDto)
  location: OutLocationDto;
}