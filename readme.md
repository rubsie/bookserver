###demo eindresultaat
* https://vp-books.herokuapp.com/
* login with vera/vera, marie/password, admin/admin
* ... or signup to register as a new user 
  
###you need: 
  * server: java 1.15 (on PATH) 
  * frontend: npm (7.16) and node (v16.3) (on PATH)
* import this repo in intellij (as maven project)
* repo contains server (in .) and client (in ./src/main/frontend)    

###server
* start server 
  * in intellij --> BookserverApplication start 
  * or in cmd on dir bookserver:   
      ```
      ./mvnw package
      java  -jar target\bookserver-0.0.1-SNAPSHOT.jar be.thomasmore.bookserver.BookserverApplication
      ```
* try out: 
  * api GET request in browser: **GET http://localhost:8080/api/books**
  * api doc: http://localhost:8080/swagger-ui/
  * h2-in-mem-db: http://localhost:8080/h2-console/
      * jdbc url: jdbc:h2:mem:books
      * username: sa, no pw
  * postman: 
      * import collection Books.postman_collection.json
      * or... import swagger-doc in postman: http://localhost:8080/v2/api-docs
      * post/put/delete:
        * csrf-protection
        * copy value van XSRF-TOKEN Cookie in de Header X-XSRF-TOKEN
  * client is served by server 
      * on index.html:  http://localhost:8080/
      * but you must do a "maven compile" first to make this work
      
###client
* start client 
  * in intellij
  * or in cmd on dir bookserver/src/main/frontend: 
      ```
          npm run start 
      ```
* try out: http://localhost:3000
* (or with ip)   
* or connect this client to server on heroku: 
   * in package.json modify the proxy: 
      ```
        "proxy": "https://vp-books.herokuapp.com/",
      ```  
   * attention: this might nog work very well because on heroku versie3 is deployed
* login with vera/vera, marie/password, admin/admin
* ... or signup to register as a new user 
  