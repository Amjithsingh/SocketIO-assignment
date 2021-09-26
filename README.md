# SocketIO-assignment
Socket io assignment for toobler technologies

## Pre-requisites
* nodeJS - v10 and above
* MySQL - v5.6 above please use mysql_native_password plugin for creating user
## Configuration
* Clone the application and run  
``` npm install ```
* Create a MySQL database using command  
``` create database toobler ```  
* Update database ip address, username and password in config/config.json  
* run following script to create necessary tables in MySQL   
``` npx sequelize-cli db:migrate ``` 
* update database with initial data, a demo user with username and password as 'admin' will be created  
``` npx sequelize-cli db:seed:all ```
* start the application using below command  
``` npm start ```

## Default values
|Service          | port            |
|-----------------|-----------------|
|Express port     | 3000            |
|Web socket port  | 8000            |
|Web socket topic | toobler         |
|username         | admin           |
|password         | admin           |


