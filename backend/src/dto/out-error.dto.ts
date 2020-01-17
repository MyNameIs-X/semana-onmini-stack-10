import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { Expose } from 'class-transformer';

export class OutErrorDto{

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  ok: boolean;

  @Expose()
  @IsNotEmpty()
  @IsString()
  message: string;

}