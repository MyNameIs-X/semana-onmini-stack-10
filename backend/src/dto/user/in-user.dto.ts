import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class InUserDto{

  @IsNotEmpty()
  @IsString()
  githubUserName: String;

  @IsNotEmpty()
  @IsString()
  name: String;

  @IsString()
  @IsNotEmpty()
  techs: String;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

}