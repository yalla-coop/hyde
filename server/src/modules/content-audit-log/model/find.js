import { query } from '../../../database';

const getChangesLog = async () => {
  const sql = `
    SELECT
      cal.id,
      cal.user_id,
      cal.step_id,
      cal.step_slug,
      cal.landing_page_content_id,
      cal.type,
      cal.updated_content,
      cal.created_at,
      cal.updated_at,
      s.title,
      u.email
    FROM content_audit_log AS cal
    JOIN users AS u ON u.id=user_id 
    LEFT JOIN steps AS s ON s.id=step_id
    ORDER BY updated_at ASC
  `;
  const res = await query(sql);
  return res.rows;
};

export { getChangesLog };
