This containers sole purpose is to import seed data into the database.

dump/sopptas/

mongorestore --host 0.0.0.0 --db sopptas ./dump/sopptas/
mongodump --host=0.0.0.0 --port=27017 --db=sopptas
mongo sopptas --eval "db.dropDatabase()";