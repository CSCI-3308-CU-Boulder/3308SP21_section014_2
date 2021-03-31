To start Buff Forums on Port 3000:
1. "docker-compose up" 

To close Buff Forums:
2. "docker-compose down"

If you want to run create.sql and insert.sql and test database setup on initialization. The database needs to be deleted after the container has been removed.
3. docker-volume list
4. docker volume rm  buff-forums_buff_forums_volume

