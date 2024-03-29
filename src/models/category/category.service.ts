import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmQueryService } from "@ptc-org/nestjs-query-typeorm";
import { FindOptionsWhere, TreeRepository } from "typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { Categories } from "./enums/category.enum";

@Injectable()
export class CategoryService extends TypeOrmQueryService<CategoryEntity> {
  constructor(@InjectRepository(CategoryEntity) readonly repo: TreeRepository<CategoryEntity>) {
    super(repo);
  }

  public async findCategoryTree() {
    return this.repo.findTrees();
  }

  public findOneByCode(code: Categories, opts?: FindOptionsWhere<CategoryEntity>): Promise<CategoryEntity> {
    return this.repo.findOneBy({ code, ...opts });
  }
}
