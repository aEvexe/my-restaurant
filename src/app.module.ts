import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { UserRoleModule } from "./user-role/user-role.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { User } from "./users/models/user.model";
import { UserRole } from "./user-role/models/user-role.model";
import { Role } from "./roles/models/role.model";
import { Notifications } from "./notifications/models/notification.model";
import { AuthModule } from "./auth/auth.module";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { Restaurants } from "./restaurants/models/restaurant.model";
import { TablesModule } from "./tables/tables.module";
import { Tables } from "./tables/models/table.model";
import { CategoriesModule } from "./categories/categories.module";
import { Categories } from "./categories/models/category.model";
import { MenusModule } from "./menus/menus.module";
import { Menus } from "./menus/models/menu.model";
import { MenuImagesModule } from "./menu-images/menu-images.module";
import { MenuOptionsModule } from "./menu-options/menu-options.module";
import { MenuImages } from "./menu-images/models/menu-image.entity";
import { MenuOptions } from "./menu-options/models/menu-option.model";
import { ReviewsModule } from "./reviews/reviews.module";
import { Reviews } from "./reviews/models/review.model";
import { FavoritesModule } from "./favorites/favorites.module";
import { CustomersModule } from "./customers/customers.module";
import { Favorites } from "./favorites/models/favorite.model";
import { Customers } from "./customers/models/customer.model";
import { ReservationsModule } from "./reservations/reservations.module";
import { Reservations } from "./reservations/models/reservation.model";
import { PaymentsModule } from './payments/payments.module';
import { Payments } from "./payments/models/payment.entity";
import { ManagersRestaurantsModule } from './managers-restaurants/managers-restaurants.module';
import { ManagersRestaurants } from "./managers-restaurants/models/managers-restaurant.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),

    // ServeStaticModule.forRoot({ rootPath: join(__dirname, "..", "static") }),

    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        User,
        UserRole,
        Role,
        Notifications,
        Restaurants,
        Tables,
        Categories,
        Menus,
        MenuImages,
        MenuOptions,
        Reviews,
        Favorites,
        Customers,
        Reservations,
        Payments,
        ManagersRestaurants
      ],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },
    }),

    UsersModule,

    RolesModule,

    UserRoleModule,

    NotificationsModule,

    AuthModule,

    RestaurantsModule,

    TablesModule,

    CategoriesModule,

    MenusModule,

    MenuImagesModule,

    MenuOptionsModule,

    ReviewsModule,

    FavoritesModule,

    CustomersModule,

    ReservationsModule,

    PaymentsModule,

    ManagersRestaurantsModule,
  ],
})
export class AppModule {}
