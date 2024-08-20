import { UserRegisterDto } from './dto/user.register.dto';
import { User } from './user.entity';

export interface IUserService {
	createUser(body: UserRegisterDto): Promise<User | null>;
	validate(email: string): Promise<boolean>;
}
