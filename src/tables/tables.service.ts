import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Tables } from './models/table.model';

@Injectable()
export class TablesService {
  constructor(
    @InjectModel(Tables)
    private readonly tableModel: typeof Tables,
  ) {}

  async create(createTableDto: CreateTableDto) {
    return this.tableModel.create(createTableDto);
  }

  async findAll() {
    return this.tableModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const table = await this.tableModel.findByPk(id);
    if (!table) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }
    return table;
  }

  async update(id: number, updateTableDto: UpdateTableDto) {
    const [affectedCount, [updatedTable]] = await this.tableModel.update(updateTableDto, {
      where: { id },
      returning: true,
    });

    if (affectedCount === 0) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }

    return updatedTable;
  }

  async remove(id: number) {
    const deleted = await this.tableModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }
    return { message: `Table #${id} deleted successfully` };
  }
}
