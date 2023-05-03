import { NestjsQueryGraphQLModule } from "@nestjs-query/query-graphql";
import { NestjsQueryTypeOrmModule } from "@nestjs-query/query-typeorm";
import { Module } from "@nestjs/common";
import { AccessGuard } from "../../providers/security/casl/access.guard";
import { Actions } from "../../providers/security/casl/actions.enum";
import { CheckAbility } from "../../providers/security/casl/decorators/check-ability";
import { CreatePermissionInput } from "./dto/create-permission.input";
import { UpdatePermissionInput } from "./dto/update-permission.input";
import { PermissionEntity } from "./entities/permission.entity";
import { PermissionService } from "./permission.service";

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([PermissionEntity])],
      services: [PermissionService],
      resolvers: [
        {
          DTOClass: PermissionEntity,
          EntityClass: PermissionEntity,
          CreateDTOClass: CreatePermissionInput,
          UpdateDTOClass: UpdatePermissionInput,
          ServiceClass: PermissionService,
          guards: [AccessGuard],
          read: {
            decorators: [CheckAbility(Actions.READ, PermissionEntity)],
          },
          create: {
            decorators: [CheckAbility(Actions.CREATE, PermissionEntity)],
            many: { disabled: true },
          },
          update: {
            decorators: [CheckAbility(Actions.UPDATE, PermissionEntity)],
            many: { disabled: true },
          },
          delete: {
            decorators: [CheckAbility(Actions.DELETE, PermissionEntity)],
            many: { disabled: true },
          },
        },
      ],
    }),
  ],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}