insert into BOOK
(ID, TITLE, AUTHOR)
values
(nextval('BOOK_SEQ'), 'Oryx and Crake', 'Margaret Atwood');

insert into BOOK
(ID, TITLE, AUTHOR)
values
(nextval('BOOK_SEQ'), 'The year of the flood', 'Margaret Atwood');

insert into BOOK
(ID, TITLE, AUTHOR)
values
(nextval('BOOK_SEQ'), 'MaddAddam', 'Margaret Atwood');

insert into BOOK
(ID, TITLE, AUTHOR)
values
(nextval('BOOK_SEQ'), '1Q84', 'Haruki Murakami');

insert into BOOK
(ID, TITLE, AUTHOR)
values
(nextval('BOOK_SEQ'), 'De opwindvogelkronieken', 'Haruki Murakami');


insert into GENRE
(ID, NAME)
values
(nextval('GENRE_SEQ'), 'fantasy');

insert into GENRE
(ID, NAME)
values
(nextval('GENRE_SEQ'), 'non-fiction');

insert into GENRE
(ID, NAME)
values
(nextval('GENRE_SEQ'), 'programming');

INSERT INTO BOOKSUSER (ID, USERNAME, PASSWORD, ROLE) VALUES
    (nextval('USER_SEQ'), 'admin',
    '$2a$10$9MIX8kYPkuB7uE/H5nHF8.KG6.YdjBA/voOnjSZnZDxLXL/2BIerS', 'ADMIN'); --admin

INSERT INTO BOOKSUSER (ID, USERNAME, PASSWORD, ROLE) VALUES
    (nextval('USER_SEQ'), 'marie',
    '$2a$10$9TeBFudS7HsgCa4sSvP//O627sMq.KiTFrOr8IzrVlYw5c8aoKzNm', 'USER'); --password

INSERT INTO BOOKSUSER (ID, USERNAME, PASSWORD, ROLE) VALUES
    (nextval('USER_SEQ'), 'vera',
    '$2y$12$KF3spKP4kgf59.6zYkmjyeYaW2.4ZxV16Grpw1FPsFnzYq68kswJ6', 'USER'); --vera


