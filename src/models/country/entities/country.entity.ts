import { FilterableField, FilterableUnPagedRelation } from "@ptc-org/nestjs-query-graphql";
import { Column, OneToMany, Unique } from "typeorm";
import { Entity, ObjectType } from "../../../common/decorators";
import { Authorize } from "../../../common/decorators/graphql/authorize.decorator";
import { BaseEntity } from "../../base.entity";
import { CityEntity } from "../../city/entities/city.entity";
import { Country } from "../enums/country.enum";

@Authorize()
@FilterableUnPagedRelation("cities", () => CityEntity)
@ObjectType()
@Unique("UNQ_country_code", ["code"])
@Entity()
export class CountryEntity extends BaseEntity {
  @FilterableField()
  @Column({
    type: "enum",
    enum: Country,
  })
  code!: Country;

  @FilterableField()
  @Column({ length: 128 })
  name!: string;

  @OneToMany(() => CityEntity, city => city.country, { cascade: true })
  cities!: CityEntity[];
}
