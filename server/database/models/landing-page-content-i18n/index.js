import { readSqlFile } from '../../connect';

const createTable = async () => readSqlFile(`${__dirname}/schema.sql`);

const createTriggers = async () => {
  await readSqlFile(
    `${__dirname}/delete-old-landing-page-content-i18n-on-update-content.sql`,
  );
};

export default {
  createTable,
  createTriggers,
};
