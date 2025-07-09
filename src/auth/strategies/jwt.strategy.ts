// // src/auth/strategies/jwt.strategy.ts

// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: process.env.ACCES_TOKEN_KEY as string, // 👈 cast as string
//     });
//   }

//   async validate(payload: any) {
//     // This will be accessible as request.user
//     return {
//       id: payload.id,
//       email: payload.email,
//       is_active: payload.is_active,
//       roles: payload.roles, // ✅ used by RolesGuard
//     };
//   }
// }
