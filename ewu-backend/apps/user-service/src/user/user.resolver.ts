import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ChangePasswordInput } from './dto/change-password.input';
import {
  GCodeData,
  GoogleLoginInput,
  LoginInput,
  UpdatePasswordDate,
} from './dto/login.input';
import { Auth, GCode } from './entities/auth.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAll(@Args('page') page: number, @Args('limit') limit: number) {
    return await this.userService.findAll(page, limit);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  forgotPassword(@Args('email') email: string) {
    return this.userService.forgotPassword(email);
  }

  @Mutation(() => User)
  changePassword(
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
  ) {
    return this.userService.changePassword(changePasswordInput);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
  @Mutation(() => Auth)
  async login(@Args('data') data: LoginInput) {
    return await this.userService.login(data);
  }

  @Mutation(() => Auth)
  async googleLogin(@Args('data') data: GoogleLoginInput) {
    return await this.userService.googleLogin(data);
  }

  // updatePasswordLastUpdated
  @Mutation(() => User)
  async updatePasswordLastUpdated(@Args('data') data: UpdatePasswordDate) {
    return await this.userService.updatePasswordLastUpdated(data);
  }

  // checkGmailCode
  @UseGuards(AuthGuard)
  @Mutation(() => GCode)
  async checkGmailCode(@Args('data') data: GCodeData) {
    return await this.userService.checkGmailCode(data);
  }
}
