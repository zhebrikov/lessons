module.exports = (query) => {
    let date = query?.date ?  query.date.split(',') : null;
    let teacherIds = query?.teacherIds ? query.teacherIds.split(',').map(c => Number(c)) : null;
    let  studentsCount = query?.studentsCount ? query.studentsCount.split(',').map(c => Number(c)) : null;

    if(Array.isArray(date) && date?.length === 1) {
        date = date[0];
    }

    if(Array.isArray(studentsCount) && studentsCount?.length === 1) {
        studentsCount = studentsCount[0];
    }

    if(Array.isArray(teacherIds) && teacherIds?.length === 1){
        teacherIds = teacherIds[0];
    }

    let where = '';

    let having = '';

    if(Array.isArray(date)) {
        where += `date between '${date[0]}' and '${date[1]}'`;
    }else if(!!date && !Array.isArray(date)){
        where += `date = '${date}'`;
    }

    if(Array.isArray(teacherIds)) {
        where += `lt.teacher_id in(${teacherIds.join(",")})`;
    }else if(!!teacherIds && !Array.isArray(teacherIds)){
        where += `lt.teacher_id = '${teacherIds}'`;
    }

    if(Array.isArray(studentsCount)) {
        having += `coalesce((select sum(1) from lesson_students ls 
        where ls.lesson_id = l.id and ls.visit = true), 0) between  ${studentsCount[0]}  and ${studentsCount[1]}`;
    }else if(!(studentsCount === null || studentsCount === undefined) && !Array.isArray(studentsCount)){
        having += `coalesce((select sum(1) from lesson_students ls 
        where ls.lesson_id = l.id and ls.visit = true), 0) = ${studentsCount}`;
    }

    return { where, having };
}