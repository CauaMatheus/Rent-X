import { Specification } from '@cars/infra/typeorm/entities/Specification';

import { ICreateSpecificationsDTO, ISpecificationsRepository } from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  private repository: Specification[] = []

  async create({ name, description }: ICreateSpecificationsDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, { name, description });

    this.repository.push(specification);
    return specification;
  }
  async list(): Promise<Specification[]> {
    return this.repository;
  }
  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.find((specification) => specification.name === name);
    return specification;
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.repository
      .filter((specification) => ids.includes(specification.id));

    return specifications;
  }
}
export { SpecificationsRepositoryInMemory };
