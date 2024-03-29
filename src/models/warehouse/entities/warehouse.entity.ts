import { SortDirection } from "@ptc-org/nestjs-query-core";
import { FilterableField, FilterableRelation, FilterableUnPagedRelation } from "@ptc-org/nestjs-query-graphql";
import { Column, Index, JoinColumn, OneToMany, OneToOne, Unique } from "typeorm";
import { Entity, ObjectType } from "../../../common/decorators";
import { Authorize } from "../../../common/decorators/graphql/authorize.decorator";
import { AddressEntity } from "../../address/entities/address.entity";
import { BaseEntity } from "../../base.entity";
import { WarehouseItemEntity } from "../../warehouse-item/entities/warehouse-item.entity";
import { WarehouseStatus } from "../enums/warehouse-status.enum";

@Authorize()
@FilterableRelation("address", () => AddressEntity, { nullable: true })
@FilterableUnPagedRelation("warehouseItems", () => WarehouseItemEntity, { defaultSort: [{ field: "createdAt", direction: SortDirection.DESC }] })
@ObjectType()
@Unique("UNQ_warehouse_code", ["code"])
@Index("INX_warehouse_status", ["status"])
@Entity()
export class WarehouseEntity extends BaseEntity {
  @FilterableField()
  @Column({ length: 6 })
  code!: string;

  @FilterableField()
  @Column({ length: 32 })
  name!: string;

  @FilterableField()
  @Column({
    type: "enum",
    enum: WarehouseStatus,
    default: WarehouseStatus.ACTIVE,
  })
  status!: WarehouseStatus;

  @OneToOne(() => AddressEntity, {
    cascade: true,
    nullable: true,
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  })
  @JoinColumn()
  address?: AddressEntity;

  @OneToMany(() => WarehouseItemEntity, warehouseItem => warehouseItem.warehouse, { cascade: true })
  warehouseItems!: WarehouseItemEntity[];
}
