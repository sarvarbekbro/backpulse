import { CanActivate, ConflictException, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ApiKeysService } from "../api-keys.service";
import { match } from "assert";


@Injectable()

export class ApiKeyGuard implements CanActivate{
 constructor(private readonly apiKeyService: ApiKeysService){}
 async canActivate(context: ExecutionContext):Promise<boolean> {
const request = context.switchToHttp().getRequest()
const apiKey = request.headers['x-api-key']
if (!apiKey){
  throw new UnauthorizedException('API key is required')
}
const matchedApiKey = await this.apiKeyService.validateApiKey(apiKey)
if(!matchedApiKey){
  throw new UnauthorizedException('Invalid API key')
}
if(!matchedApiKey.isActive ){
  throw new UnauthorizedException('API key is inactive ')
}

if(matchedApiKey.expiresAt){
  if(matchedApiKey.expiresAt < new Date()){
 throw new UnauthorizedException('API key expired')


  }
}
request.project = matchedApiKey.project
return true;





  }
}