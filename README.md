# Run

    node webserver.js
    curl localhost:8080

    node fopen.js

    node freadFile.js

    node fobj.js

    node simpleJSON.js
    curl localhost:8080

    node simpleJSON-2.js
    curl localhost:8080

    node simpleJSON-2b.js
    curl localhost:8080/albums.json
    curl localhost:8080/albums/italy2012.json

    node simpleJSON-2c.js
    curl localhost:8080/albums/italy2012.json?page=0&page_size=3
    curl localhost:8080/albums/italy2012.json?page=1&page_size=2

    node post.js
    curl -i -X POST -H 'Content-Type: application/json' -d '{ "field1":"aaa", "field2":123 }' localhost:8080

    node postForm.js
    curl -i -X POST -d 'field1=aaa&field2=123' localhost:8080

    node rpntest.js