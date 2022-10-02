import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { ParserModule } from './parser/parser.module';
import { ParserService } from './parser/parser.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    UsersModule,
    ParserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private parserService: ParserService,
    private usersService: UsersService,
  ) {}

  async onModuleInit() {
    const users = await this.parserService.parseUsers();
    const usersObjects = users.map((name) => ({ name }));

    await this.usersService.createUsers(usersObjects);
  }
}
