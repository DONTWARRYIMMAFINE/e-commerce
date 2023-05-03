import { NestjsQueryGraphQLModule } from "@nestjs-query/query-graphql";
import { NestjsQueryTypeOrmModule } from "@nestjs-query/query-typeorm";
import { Module } from "@nestjs/common";
import { AccessGuard } from "../../providers/security/casl/access.guard";
import { Actions } from "../../providers/security/casl/actions.enum";
import { CheckAbility } from "../../providers/security/casl/decorators/check-ability";
import { CommentService } from "./comment.service";
import { CreateCommentInput } from "./dto/create-comment.input";
import { UpdateCommentInput } from "./dto/update-comment.input";
import { CommentEntity } from "./entities/comment.entity";
import { CommentHook } from "./hooks/comment.hook";

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([CommentEntity])],
      services: [CommentService],
      resolvers: [
        {
          DTOClass: CommentEntity,
          EntityClass: CommentEntity,
          CreateDTOClass: CreateCommentInput,
          UpdateDTOClass: UpdateCommentInput,
          ServiceClass: CommentService,
          guards: [AccessGuard],
          read: {
            decorators: [CheckAbility(Actions.READ, CommentEntity)],
          },
          create: {
            decorators: [CheckAbility(Actions.CREATE, CommentEntity)],
            many: { disabled: true },
          },
          update: {
            decorators: [CheckAbility(Actions.UPDATE, CommentEntity, CommentHook)],
            many: { disabled: true },
          },
          delete: {
            decorators: [CheckAbility(Actions.DELETE, CommentEntity, CommentHook)],
            many: { disabled: true },
          },
        },
      ],
    }),
  ],
  providers: [CommentService, CommentHook],
  exports: [CommentService],
})
export class CommentModule {}