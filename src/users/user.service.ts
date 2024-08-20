import { IUserService } from './user.service.interface';
import { UserRegisterDto } from './dto/user.register.dto';
import { User } from './user.entity';

export class UserService implements IUserService {
	async createUser({ name, email, password }: UserRegisterDto): Promise<User | null> {
		const user = new User(name, email);
		await user.setPassword(password);
		return user;
	}

	async validate(email: string): Promise<boolean> {
		return email === '';
	}
}
