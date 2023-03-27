import { NestjsQueryTypeOrmModule } from "@nestjs-query/query-typeorm";
import { Module } from "@nestjs/common";
import { AppConfigModule } from "../../config/app/app.module";
import { EmailModule } from "../../providers/email/email.module";
import { CaslGraphQLModule } from "../../providers/security/authorization/casl-graphql.module";
import { EmailAddressModule } from "../email-address/email-address.module";
import { EmailAddressConfirmationController } from "./email-address-confirmation.controller";
import { EmailAddressConfirmationResolver } from "./email-address-confirmation.resolver";
import { EmailAddressConfirmationService } from "./email-address-confirmation.service";
import { EmailAddressConfirmationEntity } from "./entities/email-address-confirmation.entity";
import { UserCreatedListener } from "./listeners/user-create.listener";

@Module({
  imports: [
    CaslGraphQLModule.forFeature({
      imports: [AppConfigModule, EmailModule, EmailAddressModule, NestjsQueryTypeOrmModule.forFeature([EmailAddressConfirmationEntity])],
      services: [EmailAddressConfirmationService],
    }),
  ],
  controllers: [EmailAddressConfirmationController],
  providers: [EmailAddressConfirmationResolver, EmailAddressConfirmationService, UserCreatedListener],
  exports: [EmailAddressConfirmationService],
})
export class EmailAddressConfirmationModule {}
