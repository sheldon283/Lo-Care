# Datebase Schema:

Database name: LoCare

Collections:
> Locations

``` json
uniqueid: string,  
timestamp: number,  
longitude: number,  
latitude: number
```

> Users

```json
username: string,  
uniqueid: number,  
primaryPhoneNumber: number
```

primaryPhoneNumber should not have dashes in it!

# API Schema:

GET Requests:
1) /api/getLoc?uniqueid=__STRING__
> Get all locations for a particular user
2) /api/getRangeLoc?uniqueid=__STRING__&startTime=__TIMESTAMP__&endTime=__TIMESTAMP__
> Get the locations for a user between two timestamps
3) /api/rawLoc?uniqueid=__STRING__
> Get all the raw locations for a user
4) /api/uniqueId?username=__STRING__
> Get the uniqueid for a particular username

POST Requests:
1) /api/newLoc
``` json
Content-type: application/json
Body:
{
  "uniqueid": STRING,
  "timestamp": NUMBER, 
  "longitude": NUMBER, 
  "latitude": NUMBER
}
```
> Insert a new location for the user
2) /api/newUser

```json
Content-type: application/json
Body:
{
  "username": STRING,
  "uniqueid": STRING,
  "primaryPhoneNumber": NUMBER
}
```

DELETE Requests:
1) /api/deleteAllLoc?uniqueid=__STRING__
> Delete all the locations for a particular user
2) /api/deleteUser?uniqueid=__STRING__
> Delete the user from the database, and all the locations for that user