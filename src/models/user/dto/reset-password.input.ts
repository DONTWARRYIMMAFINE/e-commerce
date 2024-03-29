import { ArgsType, InputType, PickType } from "@nestjs/graphql";
import { MutationArgsType, UpdateOneInputType } from "@ptc-org/nestjs-query-graphql";
import { UserEntity } from "../entities/user.entity";
import { CreateUserInput } from "./create-user.input";

@InputType()
export class ResetPassword extends PickType(CreateUserInput, ["password", "passwordConfirmation"]) {}

@InputType()
export class ResetPasswordInputType extends UpdateOneInputType(UserEntity, ResetPassword) {}

@ArgsType()
export class ResetPasswordArgsType extends MutationArgsType(ResetPasswordInputType) {}
