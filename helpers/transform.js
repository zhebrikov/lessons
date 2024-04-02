module.exports = (lessons) => {

    if(!Array.isArray(lessons)){
        throw new Error('Arguments must be array')
    }

    return lessons.map( lesson => {

        const students = lesson.students ? [...new Set(lesson.students.split('|'))].map(s => {
            const [id, name, visit] = s.split('-');

            return {
                id,
                name,
                visit: visit === 'true'
            }
        }) : [];

        const teachers = lesson.teachers ? [...new Set(lesson.teachers.split('|'))].map(s => {
            const [id, name] = s.split('-');

            return {
                id,
                name
            }
        }) : [];

        return {
            ...lesson,
            students,
            teachers,
        }

    } )

}