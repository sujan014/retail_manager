import { db } from './src/prisma/db';

async function main() {
  console.log(`db url = ${process.env.DATABASE_URL}`);

  let users = await db.orm.public.User.all();

  console.log(users);

  await db.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
