To start Application:

$ docker-compose up

To view Application:

Go to localhost:3000 in browser

To close Application:

$ docker-compose down

If you want to run create.sql and insert.sql and test database setup on initialization. The database needs to be deleted after the container has been removed.

$ docker-volume list

$ docker volume rm  buff-forums_buff_forums_volume

