import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: "AuthHeader not given" });
    }

    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];
    if (bearer != "Bearer" || !token) {
      throw new UnauthorizedException({ message: "Token or Bearer not given" });
    } 

    let decodedPayload: any

    try {
        decodedPayload = this.jwtService.verify(token, {
    secret: process.env.ACCES_TOKEN_KEY || 'fallback_secret',
  })
    } catch (error) {
      throw new UnauthorizedException({message: "User not authorized", error: error})
    }

    req.user = decodedPayload

    return true;
  }
}
