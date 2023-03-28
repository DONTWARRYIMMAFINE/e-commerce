import { Module } from "@nestjs/common";
import { EmailAddressConfirmationModule } from "./email-address-confirmation/email-address-confirmation.module";
import { EmailAddressModule } from "./email-address/email-address.module";
import { LanguageModule } from "./language/language.module";
import { TranslationModule } from "./translation/translation.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [UserModule, LanguageModule, TranslationModule, EmailAddressModule, EmailAddressConfirmationModule],
})
export class ModelsModule {}
