import { Module } from "@nestjs/common";
import { NestjsQueryGraphQLModule, PagingStrategies } from "@ptc-org/nestjs-query-graphql";
import { NestjsQueryTypeOrmModule } from "@ptc-org/nestjs-query-typeorm";
import { IsPublic } from "../../providers/security/auth/decorators/is-public.decorator";
import { AccessGuard } from "../../providers/security/casl/access.guard";
import { Actions } from "../../providers/security/casl/actions.enum";
import { CheckAbility } from "../../providers/security/casl/decorators/check-ability";
import { CountryService } from "./country.service";
import { CreateCountryInput } from "./dto/create-country.input";
import { UpdateCountryInput } from "./dto/update-country.input";
import { CountryEntity } from "./entities/country.entity";

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([CountryEntity])],
      services: [CountryService],
      resolvers: [
        {
          DTOClass: CountryEntity,
          EntityClass: CountryEntity,
          CreateDTOClass: CreateCountryInput,
          UpdateDTOClass: UpdateCountryInput,
          ServiceClass: CountryService,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [AccessGuard],
          read: {
            decorators: [IsPublic()],
          },
          create: {
            decorators: [CheckAbility(Actions.CREATE, CountryEntity)],
            many: { disabled: true },
          },
          update: {
            decorators: [CheckAbility(Actions.UPDATE, CountryEntity)],
            many: { disabled: true },
          },
          delete: {
            decorators: [CheckAbility(Actions.DELETE, CountryEntity)],
            many: { disabled: true },
          },
        },
      ],
    }),
  ],
  providers: [CountryService],
  exports: [CountryService],
})
export class CountryModule {}
