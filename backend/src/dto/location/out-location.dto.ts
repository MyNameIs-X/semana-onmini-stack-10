import { Expose } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class OutLocationDto{

  @Expose()
  @IsArray()
  @IsNotEmpty()
  coordinates: Array<Number>;

  @Expose()
  @IsString()
  @IsNotEmpty()
  type: String;

}
