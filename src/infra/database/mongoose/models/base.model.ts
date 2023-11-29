import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ autoCreate: true, id: true, _id: true })
export class BaseModel {
  @Prop({ default: new Date() })
  createdAt!: Date;

  @Prop({ default: new Date() })
  updatedAt!: Date;

  @Prop({ default: null })
  deletedAt!: string;
}
