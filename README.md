###Final Drilling M8
## Sixto Felipe Guerra Urbina
__________________

Install Project:
```
$ npm install
```

1) Create environment variables by file ./.env.sample
2) Create database named db_bootcamp in PostrgeSQL
3) $ npm run sync-db


<a href="./FINAL_DRILLING_M8.postman_collection.json" target="blank" >Postman_Collection</a>

| METHOD | END POINT | PUBLIC |
| ------ | ------   | ---------| 
| post | http://localhost:3000/api/signup | [x] | 
| post | http://localhost:3000/api/signin | [x] |
| get | http://localhost:3000/api/user | |
| get | http://localhost:3000/api/user/7 | | 
| put | http://localhost:3000/api/user/4 |  |
| delete | http://localhost:3000/api/user/6 | | 
| get | http://localhost:3000/api/bootcamp | [x] |
| post | http://localhost:3000/api/bootcamp?title=JS27&cue=100&description=HTML%20CCS,%20JS,%20POSTGRESQL | |
| get | http://localhost:3000/api/bootcamp/3 |  |
| post | http://localhost:3000/api/bootcamp/adduser/idbootcamp/10/iduser/7 | |
