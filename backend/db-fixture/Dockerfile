FROM mongo

WORKDIR /db

COPY dump .
# CMD  mongorestore --host mongo --db sopptas ./dump/sopptas/
# CMD  mongorestore --host mongo --db sopptas ./dump/sopptas/
# CMD  mongorestore --host 0.0.0.0 --db sopptas ./dump/sopptas/
CMD [ "ls", "-a"]
CMD [ "mongorestore", "--host", "0.0.0.0", "--db", "sopptas", "dump/sopptas" ]
