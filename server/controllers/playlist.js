import mongo from 'mongodb';

var MongoClient = mongo.MongoClient;
// var url = 'mongodb://localhost:27017/peoples-party-playlist';
var url =
  process.env.MONGODB_URI || 'mongodb://localhost/peoples-party-playlist';
var dbase = process.env.DBASE || 'peoples-party-playlist';

// https://docs.mongodb.com/manual/reference/method/db.collection.findAndModify/#db.collection.findAndModify
export const addTrack = (req, res, next) => {
  const uri = req.body.uri;
  const name = req.body.name;
  const artist = req.body.artist;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbase);
    var myobj = { uri, votes: 0, users: [], name, artist, updatedAt: new Date().toISOString(), removed: false, locked: false } ;
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
  console.log('====== 1', update)

  const uri = req.params.id;
  console.log('====== 1')
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbase);
    console.log('====== 2')

    var myquery = { uri: uri };
    dbo
      .collection('tracks')
      .findAndModify(
        myquery,
        [['_id', 'asc']],
        update,
        { new: true },
        function(err, resp) {
          console.log('====== 3', resp)
          if (err) throw err;
          res.json({
            track: { ...resp.value }
          });
          // res.sendStatus(204);
          db.close();
        }
      );
  });


  // const uri = req.params.id;
  // const userId = req.cookies['userId'];
  // const shouldLock = req.body.lock || req.body.locked;
  // if (shouldLock) {
  //   MongoClient.connect(url, function(err, db) {
  //     if (err) throw err;
  //     var dbo = db.db(dbase);

  //     var myquery = { uri: uri };
  //     dbo
  //       .collection('tracks')
  //       .findAndModify(
  //         myquery,
  //         [['_id', 'asc']],
  //         {
  //           $set: { locked: true }
  //         },
  //         { new: true },
  //         function(err, resp) {
  //           console.log('======', resp.value)
  //           if (err) throw err;
  //           res.json({
  //             track: { ...resp.value }
  //           });
  //           // res.sendStatus(204);
  //           db.close();
  //         }
  //       );
  //   });
  // } else {
  //   const vote = req.body.vote; // 1 for increment, -1 for decrement

  //   MongoClient.connect(url, function(err, db) {
  //     if (err) throw err;
  //     var dbo = db.db(dbase);

  //     var myquery = { uri: uri };

  //     dbo
  //       .collection('tracks')
  //       .findAndModify(
  //         myquery,
  //         [['_id', 'asc']],
  //         {
  //           $push: { users: userId },
  //           $inc: { votes: vote },
  //           $set: { updatedAt: new Date().toISOString() }
  //         },
  //         { new: true },
  //         function(err, resp) {
  //           if (err) throw err;
  //           console.log('HERE 1')
  //           res.json({
  //             track: { ...resp.value, timestamp: resp.value._id.getTimestamp() }
  //           });
  //           // res.sendStatus(204);
  //           db.close();
  //         }
  //       );
  //   });
  // }
};

// export const decreaseVote = (req, res, next) => {
//   const uri = req.body.uri;
//   const userId = req.cookies['userId'];

//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db(dbase);

//     var myquery = { uri: uri };
//     dbo
//       .collection('tracks')
//       .updateOne(
//         myquery,
//         { $push: { users: userId }, $inc: { votes: -1 } },
//         function(err, resp) {
//           if (err) throw err;
//           res.json({ error: null });
//           console.log('1 document updated');
//           db.close();
//         }
//       );
//   });
// };


//
export const getTracks = (req, res, next) => {
  const query = req.query || null;
  console.log(req)
  console.log('QUERY', query)

  for (let i in query){
    if (query[i] === "true" || query[i] === "false"){
        query[i] = JSON.parse(query[i]);
    }
    else if (!isNaN(query[i])){
        query[i] = parseInt(query[i]);
    }
}
console.log('QUERY', query)


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

// TODO: one function takes params as find param - default to null

  // const removed = req.query.removed;
  // const locked = req.query.locked;


  // TODO: make apis better

  // if (removed && locked) {
  //   console.log('GET TRACKS (when fetching playlist to count spotify offset)')

  //   MongoClient.connect(url, function(err, db) {
  //     if (err) throw err;

  //     var dbo = db.db(dbase);
  //     var mysort = { votes: -1 };
  //     dbo
  //       .collection('tracks')
  //       .find({removed: true, locked: true })
  //       .sort(mysort)
  //       .toArray(function(err, result) {
  //         if (err) throw err;


  //         res.status(200).json({ res: result });
  //         db.close();
  //         return;
  //       });
  //   });
  // } else if (req.query.removed === false && req.query.locked === false) {
  //   console.log('GET TRACKS (when fetching playlist to count where new position of track is)')
  //   MongoClient.connect(url, function(err, db) {
  //     if (err) throw err;

  //     var dbo = db.db(dbase);
  //     var mysort = { votes: -1 };
  //     dbo
  //       .collection('tracks')
  //       // .find({removed: false, locked: false })
  //       .find({removed: false, locked: false })
  //       .sort(mysort)
  //       .toArray(function(err, result) {
  //         if (err) throw err;

  //         const tracksWithTimeStamps = result.map(track => {
  //           return {
  //             ...track,
  //             timestamp: track._id.getTimestamp()
  //           };
  //         });

  //         res.status(200).json({ tracks: tracksWithTimeStamps });
  //         db.close();
  //         return;
  //       });
  //   });
  // } else {
  //   console.log('GET TRACKS (when fetching playlist to render)')
  //   MongoClient.connect(url, function(err, db) {
  //     if (err) throw err;

  //     var dbo = db.db(dbase);
  //     var mysort = { votes: -1 };
  //     dbo
  //       .collection('tracks')
  //       // .find({removed: false, locked: false })
  //       .find({removed: false })
  //       .sort(mysort)
  //       .toArray(function(err, result) {
  //         if (err) throw err;

  //         const tracksWithTimeStamps = result.map(track => {
  //           return {
  //             ...track,
  //             timestamp: track._id.getTimestamp()
  //           };
  //         });

  //         res.status(200).json({ tracks: tracksWithTimeStamps });
  //         db.close();
  //         return;
  //       });
  //   });
  // }

};

// new track 0 votes
// export const getPosition = (req, res, next) => {
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db(dbase);
//     var mysort = { votes: -1 };
//     dbo
//       .collection('tracks')
//       .find({ votes: { $gte: 0 } })
//       .sort(mysort)
//       .toArray(function(err, result) {
//         if (err) throw err;
//         res.status(200).json({ position: result.length });
//         db.close();
//       });
//   });
// };

// TODO: if last updated at is less than 5 secs ago then focus on track
