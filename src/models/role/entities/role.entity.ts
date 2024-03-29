import { FilterableField, FilterableUnPagedRelation } from "@ptc-org/nestjs-query-graphql";
import { Column, JoinTable, ManyToMany, Unique } from "typeorm";
import { Entity, ObjectType } from "../../../common/decorators";
import { Authorize } from "../../../common/decorators/graphql/authorize.decorator";
import { BaseEntity } from "../../base.entity";
import { PermissionEntity } from "../../permission/entities/permission.entity";
import { Roles } from "../enums/roles.enum";

@Authorize()
@FilterableUnPagedRelation("permissions", () => PermissionEntity)
@ObjectType()
@Unique("UNQ_role_code", ["code"])
@Entity()
export class RoleEntity extends BaseEntity {
  @FilterableField(() => Roles)
  @Column({
    type: "enum",
    enum: Roles,
  })
  code!: Roles;

  @FilterableField()
  @Column({ length: 128 })
  name!: string;

  @ManyToMany(() => PermissionEntity, {
    eager: true,
    cascade: true,
  })
  @JoinTable({ name: "role_permission" })
  permissions!: PermissionEntity[];
}
