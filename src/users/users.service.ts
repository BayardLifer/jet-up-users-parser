import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Options } from './interfaces/options.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUsers(createUserDtoList: CreateUserDto[]) {
    const users = this.userRepository.create(createUserDtoList);
    return this.userRepository.save(users);
  }

  findAll(query: string) {
    const options: Options = {};

    if (query) {
      options.where = {
        name: Like(`%${query}%`),
      };
    }

    return this.userRepository.find(options);
  }
}
