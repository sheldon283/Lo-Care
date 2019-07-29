var express = require('express');
var router = express.Router();
var url = require('url');
var db = require('../mongo');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/*
*  Get endpoints
*/
// Get all locations for a user 
router.get('/getLoc', function (req, res, next) {
  let uniqueid = String(req.query.uniqueid);
  let currTimestamp = new Date().getTime();
  db.getRangeLocations(uniqueid, 0, currTimestamp, (err, result) => {
    if (err) {
      handleErrors(res, req, err, "", "");
    }
    else {
      res.json(result);
    }
  });
})

// Get range of locations for a user based on two timestamps
router.get('/getRangeLoc', function (req, res, next) {
  let uniqueid = String(req.query.uniqueid);
  let startTime = Number(req.query.startTime);
  let endTime = Number(req.query.endTime);
  db.getRangeLocations(uniqueid, startTime, endTime, (err, result) => {
    if (err) {
      handleErrors(res, req, err, "", "");
    }
    else {
      res.json(result);
    }
  });
})

// Get all raw locations from the database
router.get('/rawLoc', function (req, res, next) {
  let uniqueid = String(req.query.uniqueid);
  db.getRawLocations(uniqueid, (err, result) => {
    if (err) {
      handleErrors(res, req, err, "", "");
    }
    else {
      res.json(result);
    }
  });
})

// Get the uniqueid for a user
router.get('/uniqueId', function (req, res, next) {
  let username = String(req.query.username);
  // console.log(username);
  db.getUniqueId(username, (err, result) => {
    if (err) {
      hadleErrors(res, req, err, "", "");
    }
    else {
      res.status(200);
      res.send(String(result));
    }
  });
})

/*
*  Post endpoints
*/
// Send a new location to be added to the mongodb database
// Needs uniqueid, timestamp, longitude, latitude
router.post('/newLoc', function (req, res, next) {
  let reqVerification = verifyReq(req, "location");
  if (reqVerification != "") {
    handleErrors(res, "", "", 400, reqVerification);
  }
  else {
    let uniqueId = String(req.body.uniqueid);
    let timestamp = Number(req.body.timestamp);
    let longitude = Number(req.body.longitude);
    let latitude = Number(req.body.latitude);
    db.insertNewLocation(uniqueId, timestamp, longitude, latitude, (err, result) => {
      if (err) {
        handleErrors(res, req, err, "", "");
      }
      else {
        res.status(200);
        res.send("Sucessfully inserted new location");
      }
    })
  }
})

// Insert a new user into the users database
router.post('/newUser', function (req, res, next) {
  let reqVerification = verifyReq(req, "user");
  if (reqVerification != "") {
    handleErrors(res, "", "", 400, reqVerification);
  }
  else {
    let username = String(req.body.username);
    let uniqueId = String(req.body.uniqueid);
    let phoneNumber = Number(req.body.primaryPhoneNumber);
    db.insertNewUser(username, uniqueId, phoneNumber, (err, result) => {
      if (err) {
        handleErrors(res, req, err, "", "");
      }
      else {
        res.status(200);
        res.send("Sucessfully inserted new user");
      }
    })
  }
})

/*
*  Delete endpoints
*/
// Delete all locations for a database
router.delete('/deleteAllLoc', function (req, res, next) {
  let uniqueId = String(req.query.uniqueid);
  console.log(uniqueId);
  db.deleteAllLocations(uniqueId, (err, result) => {
    if (err) {
      handleErrors(res, req, err, "", "");
    }
    else {
      res.status(200);
      res.send("All locations for that user have been deleted");
    }
  })
})

// Delete a user from the database (warning, it will delete all locations too!)
router.delete('/deleteUser', function (req, res, next) {
  let uniqueId = String(req.query.uniqueid);
  db.deleteAllLocations(uniqueId, (err, result) => {
    if (err) {
      handleErrors(res, req, err, "", "");
    }
    else {
      db.deleteUser(uniqueId, (err, result) => {
        if (err) {
          handleErrors(res, req, err, "", "");
        }
        else {
          res.status(200);
          res.send("User is deleted as are all the locations for that particular user.");
        }
      })
    }
  })
})

function handleErrors(res, req, err, statusCode, msg) {
  let error = {};
  if (err === "") {
    res.status(statusCode);
    error.status = statusCode;
    res.send({ message: msg, error: error });
  }
  else {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send({ error: err });
  }
}

function verifyReq(req, reqType) {
  let contType = req.headers[ 'content-type' ];
  if (!contType || contType.indexOf('application/json') !== 0) {
    console.log("Please use application/json as the content-type");
    return "Please use application/json as the content-type";
  }
  if (reqType == "location") {
    console.log(JSON.stringify(req.body));
    if (req.body.uniqueid == null || req.body.timestamp == null || req.body.longitude == null || req.body.latitude == null) {
      console.log("Request body must have uniqueid, timestamp, longitude, and latitude!");
      return "Request body must have uniqueid, timestamp, longitude, and latitude!";
    }
  }
  else if (reqType == "user") {
    if (req.body.username == null || req.body.uniqueid == null || req.body.primaryPhoneNumber == null) {
      console.log("Request body must have username, uniqueid, and primaryPhoneNumber");
      return "Request body must have username, uniqueid, and primaryPhoneNumber";
    }
  }
  return "";
}

module.exports = router;