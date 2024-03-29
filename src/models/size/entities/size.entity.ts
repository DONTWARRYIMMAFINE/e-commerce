import { FilterableField } from "@ptc-org/nestjs-query-graphql";
import { Column, Unique } from "typeorm";
import { Entity, ObjectType } from "../../../common/decorators";
import { Authorize } from "../../../common/decorators/graphql/authorize.decorator";
import { BaseEntity } from "../../base.entity";
import { Sizes } from "../enums/size.enum";

@Authorize()
@ObjectType()
@Unique("UNQ_size_code", ["code"])
@Entity()
export class SizeEntity extends BaseEntity {
  @FilterableField(() => Sizes)
  @Column({
    type: "enum",
    enum: Sizes,
  })
  code!: Sizes;

  @FilterableField()
  @Column({ length: 3 })
  name!: string;

  @FilterableField({ defaultValue: 0 })
  @Column({ default: 0 })
  priority!: number;
}
