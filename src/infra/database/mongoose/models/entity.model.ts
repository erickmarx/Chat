import { Prop } from '@nestjs/mongoose';
import { BaseModel } from './base.model';

export class EntityModel extends BaseModel {
  @Prop()
  name!: string;

  @Prop()
  position!: string; //x, y, z
}
