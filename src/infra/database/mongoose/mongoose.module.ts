import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './models/user.model';
import { CharModel, CharSchema } from './models/char.model';
import { EnemyModel, EnemySchema } from './models/enemy.model';
require('dotenv').config();

const mongooseModule: DynamicModule = MongooseModule.forFeature([
  { name: UserModel.name, schema: UserSchema },
  { name: CharModel.name, schema: CharSchema },
  { name: EnemyModel.name, schema: EnemySchema },
]);

@Module({
  imports: [
    MongooseModule.forRoot(process.env['MONGO_URL']!, { dbName: 'app' }),
    mongooseModule,
  ],
  exports: [mongooseModule],
})
export class MongoModule {}
