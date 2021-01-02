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

