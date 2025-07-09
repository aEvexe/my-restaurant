import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from "cookie-parser"
import { User } from './users/models/user.model';
import { Role } from './roles/models/role.model';
import { UserRole } from './user-role/models/user-role.model';

async function strap() {
  try {
    const PORT = process.env.PORT ?? 3030
    const app = await NestFactory.create(AppModule);

    User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' });
    Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' });


    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser())
    app.setGlobalPrefix("api")

    const config = new DocumentBuilder()
    .setTitle("MyRestaurant")
    .setDescription("MyRestaurant REST API")
    .setVersion("1.0")
    .addTag("AccesToken, RefreshToken, Cookie, SendMail, Guards")
    .addBearerAuth()
    .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("/api/docs", app, document)

  await app.listen(PORT, ()=> {
    console.log(`Server started at: http:localhost:${PORT}`)
  });
  } catch (error) {
    console.log(error)
  }
}
strap();