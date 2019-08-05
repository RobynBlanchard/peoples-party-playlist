import mongo from 'mongodb';

var MongoClient = mongo.MongoClient;
// var url = 'mongodb://localhost:27017/peoples-party-playlist';
var url =
  process.env.MONGODB_URI || 'mongodb://localhost/peoples-party-playlist';
var dbase = process.env.DBASE || 'peoples-party-playlist';

export const removeTrack = (req, res, next) => {
  const uri = req.params.id;
  console.log('URI==', uri);
  console.log('req==', req);

  var myquery = { uri: uri };
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbase);
    // var myobj = { uri, votes: 0, users: [], name, artist, updatedAt: new Date().toISOString(), removed: false, locked: false } ;
    dbo.collection('tracks').deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      res.sendStatus(202);
      console.log('1 document deleted');
      db.close();
    });
  });
};

// https://docs.mongodb.com/manual/reference/method/db.collection.findAndModify/#db.collection.findAndModify
export const addTrack = (req, res, next) => {
  const uri = req.body.uri;
  const name = req.body.name;
  const artist = req.body.artist;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbase);
    var myobj = {
      uri,
      votes: 0,
      users: [],
      name,
      artist,
      updatedAt: new Date().toISOString(),
      removed: false,
      locked: false
    };
    dbo.collection('tracks').insertOne(myobj, function(err, resp) {
      if (err) throw err;
      res.sendStatus(201);
      console.log('1 document inserted');
      db.close();
    });
  });
};

export const patchTrack = (req, res, next) => {
  const update = req.body.update;
  const uri = req.params.id;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbase);

    var myquery = { uri: uri };
    dbo
      .collection('tracks')
      .findAndModify(myquery, [['_id', 'asc']], update, { new: true }, function(
        err,
        resp
      ) {
        if (err) throw err;
        res.json({
          track: { ...resp.value }
        });
        // res.sendStatus(204);
        db.close();
      });
  });
};

export const getTracks = (req, res, next) => {
  const query = req.query || null;

  for (let i in query) {
    if (query[i] === 'true' || query[i] === 'false') {
      query[i] = JSON.parse(query[i]);
    } else if (!isNaN(query[i])) {
      query[i] = parseInt(query[i]);
    }
  }

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    var dbo = db.db(dbase);
    var mysort = { votes: -1 };
    dbo
      .collection('tracks')
      .find(query)
      .sort(mysort)
      .toArray(function(err, result) {
        if (err) throw err;

        res.json({ tracks: result });
        db.close();
        return;
      });
  });
};
