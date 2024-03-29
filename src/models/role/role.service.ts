import { InjectRepository } from "@nestjs/typeorm";
import { QueryService } from "@ptc-org/nestjs-query-core";
import { TypeOrmQueryService } from "@ptc-org/nestjs-query-typeorm";
import { FindOptionsWhere, In, Repository } from "typeorm";
import { RoleEntity } from "./entities/role.entity";
import { Roles } from "./enums/roles.enum";

@QueryService(RoleEntity)
export class RoleService extends TypeOrmQueryService<RoleEntity> {
  constructor(@InjectRepository(RoleEntity) repo: Repository<RoleEntity>) {
    super(repo);
  }

  public findManyByCodes(codes: Roles[], opts?: FindOptionsWhere<RoleEntity>): Promise<RoleEntity[]> {
    return this.repo.find({ where: { code: In(codes), ...opts }, relations: { permissions: true } });
  }
}
