import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/models/user.model";
import { Response } from "express";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";
import { SigninUserDto } from "../users/models/signin-user.dto";
import { Role } from "../roles/models/role.model";
import { UserRole } from "../user-role/models/user-role.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    @InjectModel(Role) private readonly roleModel: typeof Role,
    @InjectModel(UserRole) private readonly userRoleModel: typeof UserRole
  ) {}

  async generateToken(user: any) {
    const roles = await user.$get('roles');

    const payload = {
      id: user.id,
      is_active: user.is_active,
      email: user.email,
      roles: roles.map((r) => r.name), 
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCES_TOKEN_KEY,
        expiresIn: process.env.ACCES_TOKEN_TIME,
      }),

      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);


    return {
      accessToken,
      refreshToken,
    };
  }



  async register(createUserDto: CreateUserDto, superToken?: string) {
    const { email, role } = createUserDto;

    const existingUser = await this.usersService.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictException("This user already exists");
    }

    if (role === "admin") {
      await this.validateSuperToken(superToken!, ["superadmin"]);
    } else if (role === "manager") {
      await this.validateSuperToken(superToken!, ["admin", "superadmin"]);
    }

    const newUser = await this.usersService.create(createUserDto);
    await this.usersService.assignRole(newUser.id, role);

    if (role !== "admin" && role !== "superadmin") {
      try {
        await this.mailService.sendMail(newUser);
      } catch (err) {
        console.log("Mail Error:", err);
      }
    }

    

    return newUser;
  }

  private async validateSuperToken(
    superToken: string,
    requiredRoles: ("admin" | "superadmin")[]
  ) {
    if (!superToken) {
      throw new ForbiddenException("Super token is required");
    }

    let decoded: any;
    try {
      decoded = await this.jwtService.verifyAsync(superToken, {
        secret: process.env.ACCES_TOKEN_KEY,
      });
    } catch (err) {
      throw new UnauthorizedException("Invalid or expired super token");
    }

    const user = await this.usersService.findOne(decoded.id);
    if (!user) {
      throw new UnauthorizedException("Token user not found");
    }

    const hasSuperadmin = await this.usersService.userHasRole(
      user.id,
      "superadmin"
    );
    const hasAdmin = await this.usersService.userHasRole(user.id, "admin");

    const isAllowed =
      (requiredRoles.includes("superadmin") && hasSuperadmin) ||
      (requiredRoles.includes("admin") && hasAdmin);

    if (!isAllowed) {
      throw new ForbiddenException("Insufficient role to perform this action");
    }

    return user;
  }

  async assignRole(userId: number, roleName: string) {
    const role = await this.roleModel.findOne({ where: { name: roleName } });
    if (!role) {
      throw new BadRequestException(`Role '${roleName}' not found`);
    }

    const existing = await this.userRoleModel.findOne({
      where: { userId, roleId: role.id },
    });
    if (existing) {
      throw new ConflictException("User already has this role");
    }

    return this.userRoleModel.create({
      userId: userId,
      roleId: role.id,
    });
  }

  async singin(signinUserDto: SigninUserDto, res: Response) {
    const user = await this.usersService.findUserByEmail(signinUserDto.email, {include: { all: true },});

    if (!user) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }

    const isMatched = await bcrypt.compare(
      signinUserDto.password,
      user.password
    );

    if (!isMatched) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateToken(user);
    user.refresh_token = await bcrypt.hash(refreshToken, 7);
    user.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { message: "Tizimga xush kelibsiz", id: user.id, accessToken };
  }

  async signout(refreshToken: string, res: Response) {
    let userData: any;

    try {
      userData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
    if (!userData) {
      throw new ForbiddenException("User not verified");
    }

    await this.usersService.updateRefreshToken(userData.id, "");

    res.clearCookie("refreshToken");
    return {
      message: "User Logged out succesfully",
    };
  }

  async refreshToken(
    userId: number,
    refreshTokenFromCookie: string,
    res: Response
  ) {
    const decodedToken = await this.jwtService.decode(refreshTokenFromCookie);

    if (userId !== decodedToken["id"]) {
      throw new ForbiddenException("Not allowed");
    }
    const user = await this.usersService.findOne(userId);

    if (!user || !user.refresh_token) {
      throw new NotFoundException("user not found");
    }

    const tokenMatch = await bcrypt.compare(
      refreshTokenFromCookie,
      user.refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } = await this.generateToken(user);

    const refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.usersService.updateRefreshToken(user.id, refresh_token);

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "User refreshed",
      userId: user.id,
      accessToken: accessToken,
    };
    return response;
  }
}
