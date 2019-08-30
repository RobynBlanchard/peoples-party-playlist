import mongo from 'mongodb';

var MongoClient = mongo.MongoClient;
var url =
  process.env.MONGODB_URI || 'mongodb://localhost/peoples-party-playlist';
var dbase = process.env.DBASE || 'peoples-party-playlist';

export const removeTrack = (req, res, next) => {
  const uri = req.params.id;
  const query = { uri: uri };

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db(dbase);

    dbo.collection('tracks').deleteOne(query, function(err, obj) {
      if (err) throw err;
      res.sendStatus(202);
      console.log('1 document deleted');
      db.close();
    });
  });
};

export const addTrack = (req, res, next) => {
  const uri = req.body.uri;
  const name = req.body.name;
  const artist = req.body.artist;
  const updatedAt = req.body.updatedAt;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db(dbase);
    const myobj = {
      uri,
      votes: 0,
      users: [],
      name,
      artist,
      updatedAt: updatedAt || new Date().toISOString(),
      removed: false,
      locked: false
    };
    dbo.collection('tracks').insertOne(myobj, function(err, resp) {
      if (err) throw err;
      res.sendStatus(201);
      // could return new track
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
    const dbo = db.db(dbase);

    const query = { uri: uri };
    dbo
      .collection('tracks')
      .findAndModify(query, [['_id', 'asc']], update, { new: true }, function(
        err,
        resp
      ) {
        if (err) throw err;
        res.json({
          track: { ...resp.value }
        });
        db.close();
      });
  });
};

export const getTracks = (req, res, next) => {
  const query = req.query || null;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    const dbo = db.db(dbase);
    const mysort = { votes: -1, updatedAt: 1 };
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
