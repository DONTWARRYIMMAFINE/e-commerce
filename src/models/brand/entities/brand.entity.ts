import { ID } from "@nestjs/graphql";
import { FilterableField, FilterableRelation } from "@ptc-org/nestjs-query-graphql";
import { Column, ManyToOne, Unique } from "typeorm";
import { Entity, ObjectType } from "../../../common/decorators";
import { Authorize } from "../../../common/decorators/graphql/authorize.decorator";
import { Id } from "../../../common/types/id.type";
import { BaseEntity } from "../../base.entity";
import { UserEntity } from "../../user/entities/user.entity";

@Authorize()
@FilterableRelation("user", () => UserEntity)
@ObjectType()
@Unique("UNQ_brand_code", ["code"])
@Entity()
export class BrandEntity extends BaseEntity {
  @FilterableField()
  @Column({ length: 32 })
  code!: string;

  @FilterableField()
  @Column({ length: 32 })
  name!: string;

  @FilterableField(() => ID)
  @Column()
  userId!: Id;

  // TODO: refactor to m2m
  @ManyToOne(() => UserEntity, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  user!: UserEntity;
}
