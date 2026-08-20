import { SetMetadata, applyDecorators, UseInterceptors } from "@nestjs/common";
import { SerializeInterceptor } from "../interceptors/serialize.interceptor";

export const SERIALIZE_KEY = 'serialize'
export function Serialize(dto: any){
  return applyDecorators(UseInterceptors(SerializeInterceptor), SetMetadata(SERIALIZE_KEY, dto))
}