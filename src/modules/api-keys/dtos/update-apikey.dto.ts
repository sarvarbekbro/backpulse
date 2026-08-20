import { PartialType } from "@nestjs/mapped-types";
import { CreateApiKeyDto } from "./create-apikey.dto";

export class UpdateApiKeyDto extends PartialType(CreateApiKeyDto){}