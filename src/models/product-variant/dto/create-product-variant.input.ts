import { Field, InputType } from "@nestjs/graphql";
import { Allow } from "class-validator";
import { Id } from "../../../common/types/id.type";
import { IsBigIntI18N } from "../../../providers/i18n/i18n.decorators";
import { UpdatePriceInput } from "../../price/dto/update-price.input";
import { PriceEntity } from "../../price/entities/price.entity";
import { ProductVariantEntity } from "../entities/product-variant.entity";

@InputType()
export class CreateProductVariantInput implements Partial<ProductVariantEntity> {
  @IsBigIntI18N()
  @Field()
  productId!: Id;

  @IsBigIntI18N()
  @Field()
  colorId!: Id;

  @Allow()
  @Field(() => UpdatePriceInput)
  price!: PriceEntity;
}
