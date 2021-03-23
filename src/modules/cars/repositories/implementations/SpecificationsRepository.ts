import { Specification } from '../../models/Specification';
import { ISpecificationsRepository, ICreateSpecificationsDTO } from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications:Specification[]
  private static INSTANCE: SpecificationsRepository

  private constructor() {
    this.specifications = [];
  }

  public static getInstance():SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }
    return SpecificationsRepository.INSTANCE;
  }

  create({ name, description }:ICreateSpecificationsDTO):void {
    const specification = new Specification();
    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }

  findByName(name:string):Specification {
    const category = this.specifications.find((specification) => specification.name === name);
    return category;
  }

  list(): Specification[] {
    return this.specifications;
  }
}
export { SpecificationsRepository };