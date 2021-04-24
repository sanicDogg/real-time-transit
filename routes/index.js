var express = require('express');
var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var fetch = require('node-fetch');
var router = express.Router();

// // Эмуляция
// var fs = require('fs').promises;
// function timeout(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

router.get('/getEntities', async function (req, res){
  let q = req.query;
  let url = `http://transport.orgp.spb.ru/Portal/transport/internalapi/gtfs/realtime/stopforecast?stopID=${q.stopId}`;
  let response = await fetch(url);
  let buffer = response.body._readableState.buffer.head.data;
  let feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buffer).entity;
  // // Эмуляция
  // await timeout(200);
  // // res.json - пример декодированного ответа
  // let feed = await fs.readFile('res.json');
  // feed = JSON.parse(feed);
  // // Конец эмуляции
  res.send(feed);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
