import { readSqlFile } from '../../connect';

const createTable = async () => readSqlFile(`${__dirname}/schema.sql`);
const createTriggers = async () => {
  await readSqlFile(`${__dirname}/delete-old-steps-i18n-on-update-content.sql`);
  await readSqlFile(`${__dirname}/create-slug-on-insert-trigger.sql`);
};
export default {
  createTable,
  createTriggers,
};
