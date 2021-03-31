import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuid();
  const password = await hash('admin', 12);

  await connection.query(
    `INSERT INTO USERS(id, name, password, email, driver_license, "isAdmin", created_at)
      values('${id}', 'admin', '${password}', 'admin@rentx.com', 'D', true, 'now()')`,
  );

  await connection.close();
}

create().then(() => console.log('Admin user was created'));
