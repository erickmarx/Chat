import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { EntityModel } from './entity.model';

@Schema({ collection: 'char' })
export class CharModel extends EntityModel {}

export const CharSchema = SchemaFactory.createForClass(CharModel);

