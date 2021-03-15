import { Request, Response, Router } from 'express';
import { v4 as uuid } from 'uuid';

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;

  categories.push({
    name,
    description,
    id: uuid(),
    created_at: new Date(),
  });
  return response.status(201).send();
});

export { categoriesRoutes };
