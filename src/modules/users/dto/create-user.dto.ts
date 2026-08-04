import { IsEmail, IsString, MinLength, IsNotEmpty,  } from "class-validator";
export class CreateUserDto{
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

}