import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateErrorLogDto{
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  @IsString()
  stack: string;

  @IsString()
  @IsNotEmpty()
  method: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsNotEmpty()
  @IsNumber()
  statusCode: number;
}