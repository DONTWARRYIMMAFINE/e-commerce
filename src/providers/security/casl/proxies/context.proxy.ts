import { ExecutionContext, NotAcceptableException } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { AuthorizableRequest } from "../interfaces/request.interface";

export class ContextProxy {
  constructor(private readonly context: ExecutionContext) {}

  public static create(context: ExecutionContext): ContextProxy {
    return new ContextProxy(context);
  }

  public async getRequest(): Promise<AuthorizableRequest> {
    switch (this.context.getType<GqlContextType>()) {
      case "http":
      case "ws":
        return this.context.switchToHttp().getRequest();
      case "graphql": {
        const ctx = GqlExecutionContext.create(this.context);
        const request = ctx.getContext().req;
        request.params = {
          ...ctx.getArgs(),
          ...request.params,
        };
        return request;
      }
      default:
        throw new NotAcceptableException();
    }
  }
}
