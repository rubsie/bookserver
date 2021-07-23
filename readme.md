###demo 
* https://vp-books.herokuapp.com/
  
###you need: 
  * server: java 1.15 (on PATH) 
  * frontend: npm (7.16) and node (v16.3) (on PATH)
* import repo in intellij (as maven project)
* repo contains server and client    

###server
* start server 
  * in intellij --> BookserverApplication start 
  * or in cmd on dir bookserver:   
  ```
  ./mvnw package
  java  -jar target\bookserver-0.0.1-SNAPSHOT.jar be.thomasmore.bookserver.BookserverApplication
  ```
* try out: 
  * api GET request in browser: http://localhost:8080/api/books
  * api doc: http://localhost:8080/swagger-ui/
  * h2-in-mem-db: http://localhost:8080/h2-console/
      * jdbc url: jdbc:h2:mem:books
      * username: sa, no pw
  * postman: 
      * import collection Books.postman_collection.json
      * post/put/delete:
        * csrf-beveiliging 
        * copy value van XSRF-TOKEN Cookie in de Header X-XSRF-TOKEN
  * client is served by server on index.html:  http://localhost:8080/
  * login in server with vera/vera

###client
* start client 
  * in intellij
  * or in cmd on dir bookserver/src/main/frontend: 
```
    npm run start 
```
* try out: http://localhost:3000
* or with ip   
* login in with vera/vera or register new user  


  