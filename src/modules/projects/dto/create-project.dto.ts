import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class CreateProjectDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  description: string

 @IsNotEmpty()
 @IsString()
  environment: string;
}