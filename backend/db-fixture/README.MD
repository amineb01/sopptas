This containers sole purpose is to import seed data into the database.

dump/sopptas1/

mongorestore --host 0.0.0.0 --db db_name ./dump/sopptas1/
mongodump --host=0.0.0.0 --port=27017 --db=sopptas