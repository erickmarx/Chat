import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from './base.model';

@Schema({ collection: 'user' })
export class UserModel extends BaseModel {
  @Prop()
  username!: string;

  @Prop()
  uuid!: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
