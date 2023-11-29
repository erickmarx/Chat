import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { EntityModel } from './entity.model';

@Schema({ collection: 'enemy' })
export class EnemyModel extends EntityModel {}

export const EnemySchema = SchemaFactory.createForClass(EnemyModel);
