const express = require('express');
const app = express();
const port = 3000;  
var router = express.Router();

var database = require('./database');

// CORS Middleware
app.use(function (req, res, next) {
  // Enabling CORS
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization")
  next();
});
app.use(express.json());
app.use(express.urlencoded()); 


// GET home page. 
app.get('/', function(req, res, next) {
  res.render('./views/index', {title: 'GoalTrackingAPI'});
});


// GET Goals
app.get('/goals', function (req, res, next)
{
  var query = 'SELECT * FROM goals';
  database.query(query, function(error, data)
  {
    if (error)
      throw error;
    else 
      res.send(data);
  }); 
});


// GET Goal by Id
app.get('/goals/:id', function (req, res, next)
{
  var query = `SELECT GoalId, Title FROM goals WHERE GoalId = ${req.params.id}`;
  database.query(query, function(error, data)
  {
    if (error)
      throw error;
    else 
      res.send(data);
  });
});


// POST Goal
app.post('/goals', (req, res) =>
{  
  try 
  {
    var query = `INSERT INTO goals (Title) VALUES ('${req.body.title}')`;
    database.query(query, function(error, data)
    {
      if (error)
        throw error;
      else 
        res.status(200).send({"response": `Successful Insert of Goal: ${req.body.title}`});
    });
  }
  catch (error)
  {
    res.status(500).json({status: `${error}`})
  }
});


// PUT Goal by Id
app.put('/goals/:id', function (req, res)
{
  try 
  {
    var query = `UPDATE goals SET Title = '${req.body.title}' WHERE GoalId = ${req.params.id}`;
    database.query(query, function(error, data)
    {
      if (error)
        throw error;
      else 
        res.status(200).send({"response": `Successful Update of GoalId: ${req.params.id} to '${req.body.title}'`});
    });
  }
  catch (error)
  {
    res.status(500).json({status: `${error}`})
  }
});


// DELETE Goal by Id
app.delete('/goals/:id', function (req, res)
{
  var query = `DELETE FROM goals WHERE GoalId = ${req.params.id}`;
  database.query(query, function(error, data)
  {
    if (error)
      throw error;
    else 
      res.status(200).send({"response": `Successful Delete of GoalId: ${req.params.id}`});
  });
});


app.listen(port, () => {
  console.log(`We are now listen to GoalTrackingExpressAPI on port: ${port}`);
});

module.exports = router;