insert into BOOK (ID, TITLE, AUTHOR, PRICE_IN_EUR)
values (nextval('BOOK_SEQ'), 'Oryx and Crake', 'Margaret Atwood', 22); /*1*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'The year of the flood', 'Margaret Atwood');/*2*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'MaddAddam', 'Margaret Atwood');/*3*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), '1Q84', 'Haruki Murakami');/*4*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'De opwindvogelkronieken', 'Haruki Murakami');/*5*/

insert into BOOK (ID, TITLE, AUTHOR)
values (nextval('BOOK_SEQ'), 'Design Patterns', 'Erich Gamma et. al.');/*6*/


insert into AUTHOR (ID, NAME)
values (nextval('AUTHOR_SEQ'), 'Margaret Atwood'); /*1*/

insert into AUTHOR (ID, NAME)
values (nextval('AUTHOR_SEQ'), 'Haruki Murakami'); /*2*/

insert into AUTHOR (ID, NAME)
values (nextval('AUTHOR_SEQ'), 'Erich Gamma'); /*3*/

insert into AUTHOR (ID, NAME)
values (nextval('AUTHOR_SEQ'), 'Richard Helm'); /*4*/

insert into AUTHOR (ID, NAME)
values (nextval('AUTHOR_SEQ'), 'Ralph Johnson'); /*5*/

insert into AUTHOR (ID, NAME)
values (nextval('AUTHOR_SEQ'), 'John Vlissides'); /*6*/


insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (1, 1);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (2, 1);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (3, 1);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (4, 2);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (5, 2);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (6, 3);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (6, 4);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (6, 5);
insert into BOOK_AUTHORS (BOOKS_ID, AUTHORS_ID)
values (6, 6);

insert
into GENRE
    (ID, NAME)
values (nextval('GENRE_SEQ'), 'fantasy');

insert into GENRE
    (ID, NAME)
values (nextval('GENRE_SEQ'), 'non-fiction');

insert into GENRE
    (ID, NAME)
values (nextval('GENRE_SEQ'), 'programming');

