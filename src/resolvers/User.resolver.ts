import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { User, UserUpdateInput } from '../entities/User';

@Resolver(of => User)
export class UserResolver {
  
  @Query(returns => [User])
  @Transaction()
  public async users(
    @TransactionRepository(User) userRepository: Repository<User>,
  ) {
    return await userRepository.find();
  }

  @Query(returns => User, { nullable: true })
  @Transaction()
  public async user(
    @TransactionRepository(User) userRepository: Repository<User>,
    @Arg('userId') userId: number,
  ) {
    return userRepository.findOne({ id: userId });
  }

  @Mutation(returns => User, { nullable: true })
  @Transaction()
  public async createUser(
    @TransactionRepository(User) userRepository: Repository<User>,
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('age') age: number,
  ) {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.age = age;

    return await userRepository.insert(user)
  }

  @Mutation(returns => User)
  @Transaction()
  public async updateUser(
    @TransactionRepository(User) userRepository: Repository<User>,
    @Arg('userId') userId: number,
    @Arg('userInput') userInput: UserUpdateInput,
  ) {
    await userRepository.update(userId, userInput);
    return await userRepository.findOneOrFail({ id: userId });
  }

  @Mutation(returns => User)
  @Transaction()
  public async deleteUser(
    @TransactionRepository(User) userRepository: Repository<User>,
    @Arg('userId') userId: number,
  ) {
    const user = await userRepository.findOneOrFail({ id: userId });
    await userRepository.delete({ id: userId });
    return user;
  }
}
