import { IsEmail, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateUserDto {
    @IsString()
    userName: string;
    
    @IsString()
    @IsEmail()
    email: string;
    
    @IsString()
    password: string;
    
    @IsString()
    @IsUrl()
    @IsOptional()
    profileImageUrl?: string;

}
