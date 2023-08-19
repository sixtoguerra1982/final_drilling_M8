###Final Drilling M8
## Sixto Felipe Guerra Urbina
__________________

Install Project:
```
$ npm install
```

```
1) Create environment variables by file ./.env.sample
2) Create database named db_bootcamp in PostrgeSQL
3) $ npm run sync-db
```

| METHOD | END POINT | Function Controller | Method Model |
| ------ | ------   | ---------| ---------| 
| post | /user?first_name=Sixto&last_name=Guerra&email=sixto.guerra1982@gmail.com | createUser() | create() |
| get | /users/ | findAllUser() | findall() |
| get | /user/:id | findUserById() | findByPk() |
| put | /user/10?email=guerrasoft@gmail.com&first_name=Felipe&last_name=Guerra | updateUserById() | update() |
| delete | /user/:id | deleteUserById() | destroy() |
| post | /bootcamp?title=JS27&cue=100&description=HTML, CCS, JS , POSTGRESQL | createBootcamp() | create() |
| get | /bootcamp/:id | findBootcampById() | findByPk() |
| get | /bootcamps/ | findAllBootcamp() | findAll() |
| post | /bootcamp/adduser/idbootcamp/:idBootcamp/iduser/:idUser | addUserToBootcamp() | addUser() |
