## 2021 second semester TeamProject1
- - -
## Project name  
명지하철(Myong ji ha chul)
- - -
## Description  
A website where you can find out the shortest distance and minimum subway transfer distance.
- - -
## Running this website at the localhost
- - -
I ignored node_modules, .env of docker, client and servers. These files involve 
DB information, JWT secrete, client and server origin. Therefore, you have to  
install modules and create .env file and set it first.
- - -
## Used skills
Backend: Express, Typescript, JWT  
Frontend: React, Javascript  
Database: mysql, typeorm(ORM)  
Infra: Docker, Nginx
- - -
## Project Directory structure
metro-map-production/  
├─ data/  
│ ├─ certbot/  
│ ├─ nginx/  
│ │ ├─ app.conf  
│ ├─ thumbnail.png  
├─ frontend/  
├─ backend/  
├─ docker-compose.yml  
├─ init-letsencrypt.sh  
├─ init.sql  
├─ README.md  
- - -
## develop repository link
[frontend](https://github.com/skullkim/metro-map-front)  
[backend](https://github.com/skullkim/metro-map-backend)  
[document](https://github.com/skullkim/metro-map-docu)
- - -
## License
This project is licensed under the terms of the MIT license.

