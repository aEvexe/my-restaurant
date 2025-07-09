import { ApiProperty } from "@nestjs/swagger"

export class SigninUserDto {
    readonly email: string
    readonly password: string
}
