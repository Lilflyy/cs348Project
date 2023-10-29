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
    teacher_id integer REFERENCES teacher(teacher_id) ON DELETE CASCADE
);

CREATE TABLE studentQuiz(
    student_id integer REFERENCES student(student_id),
    quiz_id integer REFERENCES quiz(quiz_id) ON DELETE CASCADE
);

CREATE TABLE studentTeacher(
    student_id integer REFERENCES student(student_id),
    teacher_id integer REFERENCES teacher(teacher_id) ON DELETE CASCADE
);

CREATE TABLE StudentQuizAttempt(attempt_id SERIAL PRIMARY KEY, 
quiz_id integer REFERENCES quiz(quiz_id) ON DELETE CASCADE, student_id integer REFERENCES student(student_id));

// stored procedure to assign quizzes to all students, avoid assigning to the same student

CREATE or REPLACE procedure assignQuizzes(IN quiz int)
LANGUAGE 'plpgsql'
AS $BODY$
declare cur_student_id refcursor;
declare student integer;
BEGIN
open cur_student_id FOR SELECT st.student_id from quiz q join studentteacher st on q.teacher_id = st.teacher_id where quiz_id = quiz AND st.student_id NOT IN (select student_id from studentquiz where quiz_id = quiz);
loop
    fetch cur_student_id INTO student;
    exit when not found;
    INSERT INTO studentQuiz(student_id, quiz_id)
    VALUES(student, quiz);
end loop;

close cur_student_id;
END;
$BODY$;

