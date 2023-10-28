CREATE DATABASE maindb;

CREATE TABLE teacher(
    teacher_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50)
);

CREATE TABLE student(
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50)
);

CREATE TABLE quiz (
    quiz_id SERIAL PRIMARY KEY,
    quiz_name VARCHAR(50),
    teacher_id integer REFERENCES teacher(teacher_id)
);

CREATE TABLE studentQuiz(
    student_id integer REFERENCES student(student_id),
    quiz_id integer REFERENCES quiz(quiz_id)
);

CREATE TABLE studentTeacher(
    student_id integer REFERENCES student(student_id),
    teacher_id integer REFERENCES teacher(teacher_id)
);

CREATE function getTeachers(IN student_id int) returns table(first_name VARCHAR, last_name VARCHAR, email VARCHAR)
LANGUAGE 'plpgsql'
AS $BODY$       
BEGIN
return QUERY
SELECT t.first_name, t.last_name, t.email from teacher t JOIN studentTeacher st on t.teacher_id = st.teacher_id;
END;
$BODY$;

