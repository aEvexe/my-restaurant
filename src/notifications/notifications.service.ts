import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Notifications } from './models/notification.model';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notifications) private notificationModel: typeof Notifications){}
  create(createNotificationDto: CreateNotificationDto) {
    return this.notificationModel.create(createNotificationDto);
  }

  findAll() {
    return this.notificationModel.findAll({include:{all: true}});
  }

  async findByUserId(userId: number) {
  return this.notificationModel.findAll({
    where: { userId },
  });
}

  findOne(id: number) {
    return this.notificationModel.findByPk(id);
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return this.notificationModel.update(updateNotificationDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.notificationModel.destroy({where:{id}});
  }
}
