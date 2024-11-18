import { query } from '../../../database';

const getSteps = async (lng) => {
  const sql = `
    SELECT
      s.id,
      s.stage,
      s.step_order,
      s.title AS "s_en.title",
      s.slug,
      s.description AS "s_en.description",
      s.things_you_will_need AS "things_you_will_need",
      s.what_you_will_need_to_know AS "what_you_will_need_to_know",
      s_i18n.title AS "s_i18n.title",
      s_i18n.description AS "s_i18n.description",

      s.is_optional,
      s_i18n.all_fields_translated,
      s_i18n.language_code
    FROM steps AS s
    LEFT JOIN steps_i18n AS s_i18n
      ON s.id = s_i18n.step_id
      AND s_i18n.language_code = $1
    ORDER BY step_order ASC
  `;

  const res = await query(sql, [lng]);
  return res.rows.map((step) => {
    const _step = {
      ...step,
      ...(step.languageCode ? step.sI18n : step.sEn),
    };

    delete _step.sEn;
    delete _step.sI18n;
    return _step;
  });
};

const getStepById = async (id, lng) => {
  const sql = `
    SELECT
      s.id,
      s.stage,
      s.step_order,
      s.title AS "s_en.title",
      s.slug,
      s.description AS "s_en.description",
      s.page_title AS "s_en.page_title",
      s.page_description AS "s_en.page_description",
      s.how_long_does_it_take AS "s_en.how_long_does_it_take",
      s.where_do_you_need_to_go AS "s_en.where_do_you_need_to_go",
      s.things_you_will_need AS "s_en.things_you_will_need",
      s.what_you_will_need_to_know AS "s_en.what_you_will_need_to_know",
      s.top_tip AS "s_en.top_tip",
      s.other_tips AS "s_en.other_tips",

      COALESCE(s_i18n.title, s.title) AS "s_i18n.title",
      COALESCE(s_i18n.description, s.description) AS "s_i18n.description",
      COALESCE(s_i18n.page_title, s.page_title) AS "s_i18n.page_title",
      COALESCE(s_i18n.page_description, s.page_description) AS "s_i18n.page_description",
      COALESCE(s_i18n.how_long_does_it_take, s.how_long_does_it_take) AS "s_i18n.how_long_does_it_take",
      COALESCE(s_i18n.where_do_you_need_to_go, s.where_do_you_need_to_go) AS "s_i18n.where_do_you_need_to_go",
      COALESCE(s_i18n.things_you_will_need, s.things_you_will_need) AS "s_i18n.things_you_will_need",
      COALESCE(s_i18n.what_you_will_need_to_know, s.what_you_will_need_to_know) AS "s_i18n.what_you_will_need_to_know",
      COALESCE(s_i18n.top_tip, s.top_tip) AS "s_i18n.top_tip",
      COALESCE(s_i18n.other_tips, s.other_tips) AS "s_i18n.other_tips",
      
      s_i18n.language_code,
      s_i18n.all_fields_translated,
      s.is_optional
    FROM steps AS s
    LEFT JOIN steps_i18n AS s_i18n
      ON s.id = s_i18n.step_id AND s_i18n.language_code = $2
    WHERE s.id = $1
  `;

  const res = await query(sql, [id, lng]);
  const step = res.rows[0];
  if (!step) return null;

  const _step = {
    ...step,
    ...(step.languageCode ? step.sI18n : step.sEn),
  };

  delete _step.sEn;
  delete _step.sI18n;
  return _step;
};

const getStepBySlug = async (slug, lng) => {
  const sql = `
    SELECT
      s.id,
      s.stage,
      s.step_order,
      s.title AS "s_en.title",
      s.slug,
      s.description AS "s_en.description",
      s.page_title AS "s_en.page_title",
      s.page_description AS "s_en.page_description",
      s.how_long_does_it_take AS "s_en.how_long_does_it_take",
      s.where_do_you_need_to_go AS "s_en.where_do_you_need_to_go",
      s.things_you_will_need AS "s_en.things_you_will_need",
      s.what_you_will_need_to_know AS "s_en.what_you_will_need_to_know",
      s.top_tip AS "s_en.top_tip",
      s.other_tips AS "s_en.other_tips",

      COALESCE(s_i18n.title, s.title) AS "s_i18n.title",
      COALESCE(s_i18n.description, s.description) AS "s_i18n.description",
      COALESCE(s_i18n.page_title, s.page_title) AS "s_i18n.page_title",
      COALESCE(s_i18n.page_description, s.page_description) AS "s_i18n.page_description",
      COALESCE(s_i18n.how_long_does_it_take, s.how_long_does_it_take) AS "s_i18n.how_long_does_it_take",
      COALESCE(s_i18n.where_do_you_need_to_go, s.where_do_you_need_to_go) AS "s_i18n.where_do_you_need_to_go",
      COALESCE(s_i18n.things_you_will_need, s.things_you_will_need) AS "s_i18n.things_you_will_need",
      COALESCE(s_i18n.what_you_will_need_to_know, s.what_you_will_need_to_know) AS "s_i18n.what_you_will_need_to_know",
      COALESCE(s_i18n.top_tip, s.top_tip) AS "s_i18n.top_tip",
      COALESCE(s_i18n.other_tips, s.other_tips) AS "s_i18n.other_tips",
      
      s_i18n.language_code,
      s_i18n.all_fields_translated,
      s.is_optional
    FROM steps AS s
    LEFT JOIN steps_i18n AS s_i18n
      ON s.id = s_i18n.step_id AND s_i18n.language_code = $2
    WHERE s.slug = $1
  `;

  const res = await query(sql, [slug, lng]);
  const step = res.rows[0];
  if (!step) return null;

  const _step = {
    ...step,
    ...(step.languageCode ? step.sI18n : step.sEn),
  };

  delete _step.sEn;
  delete _step.sI18n;
  return _step;
};

export { getSteps, getStepById, getStepBySlug };
