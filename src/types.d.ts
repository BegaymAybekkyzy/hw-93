import { Request } from 'express';
import { UserDoc } from './schemas/user.schema';

export interface RequestWithUser extends Request {
  user: UserDoc;
}
