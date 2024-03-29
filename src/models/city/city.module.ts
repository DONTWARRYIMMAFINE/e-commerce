import { Module } from "@nestjs/common";
import { NestjsQueryGraphQLModule, PagingStrategies } from "@ptc-org/nestjs-query-graphql";
import { NestjsQueryTypeOrmModule } from "@ptc-org/nestjs-query-typeorm";
import { IsPublic } from "../../providers/security/auth/decorators/is-public.decorator";
import { AccessGuard } from "../../providers/security/casl/access.guard";
import { Actions } from "../../providers/security/casl/actions.enum";
import { CheckAbility } from "../../providers/security/casl/decorators/check-ability";
import { CountryModule } from "../country/country.module";
import { CityService } from "./city.service";
import { CreateCityInput } from "./dto/create-city.input";
import { UpdateCityInput } from "./dto/update-city.input";
import { CityEntity } from "./entities/city.entity";

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [CountryModule, NestjsQueryTypeOrmModule.forFeature([CityEntity])],
      services: [CityService],
      resolvers: [
        {
          DTOClass: CityEntity,
          EntityClass: CityEntity,
          CreateDTOClass: CreateCityInput,
          UpdateDTOClass: UpdateCityInput,
          ServiceClass: CityService,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [AccessGuard],
          read: {
            decorators: [IsPublic()],
          },
          create: {
            decorators: [CheckAbility(Actions.CREATE, CityEntity)],
            many: { disabled: true },
          },
          update: {
            decorators: [CheckAbility(Actions.UPDATE, CityEntity)],
            many: { disabled: true },
          },
          delete: {
            decorators: [CheckAbility(Actions.DELETE, CityEntity)],
            many: { disabled: true },
          },
        },
      ],
    }),
  ],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
