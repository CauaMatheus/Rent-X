import { getRepository, Repository } from 'typeorm';

import { Specification } from '@cars/infra/typeorm/entities/Specification';
import { ISpecificationsRepository, ICreateSpecificationsDTO } from '@cars/repositories/ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>
  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationsDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }

  async list(): Promise<Specification[]> {
    const list = await this.repository.find();
    return list;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }
}
export { SpecificationsRepository };
