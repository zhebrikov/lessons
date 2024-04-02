const filters = require("../../modules/db/helpers/filters");
const transform = require("../../helpers/transform");

module.exports = async (req, res, dependes = {}) => {
    const { db } = dependes;

    const page = req.query.page ?? 1;
    const lessonsPerPage = req.query.lessonsPerPage ?? 5;

    const { where, having } = filters(req.query);



    const offset = page === 1 ? 0 : lessonsPerPage * (page - 1);

    const query = `select l.*, 
	(
		select string_agg(s.id || '-' || s.name || '-' || ls.visit, '|') from students s 
	 	left join lesson_students ls on ls.student_id  = s.id
	 	where ls.lesson_id = l.id
	) as students, 
    (select 
    	string_agg(t.id || '-' || t.name, '|') from teachers t
		left join lesson_teachers lt on lt.teacher_id = t.id
		where lt.lesson_id = l.id
    ) as teachers,
    coalesce((select sum(1) from lesson_students ls 
	 	where ls.lesson_id = l.id and ls.visit = true), 0) as "visitCount"
 	 from lessons l`;

    const lessons = await db.raw(
        `${query} ${where ? 'where ' + where : ''} group by l.id ${having ? 'having ' + having : ''}  
        limit ${lessonsPerPage} offset ${offset}`
    );

    res.send(transform(lessons.rows));
}   