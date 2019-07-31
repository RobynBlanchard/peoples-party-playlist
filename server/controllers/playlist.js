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
    var myobj = { uri, votes: 0, users: [], name, artist };
    dbo.collection('tracks').insertOne(myobj, function(err, resp) {
      if (err) throw err;
      res.sendStatus(201);
      console.log('1 document inserted');
      db.close();
    });
  });
};

export const patchTrack = (req, res, next) => {
  const uri = req.params.id;
  const userId = req.cookies['userId'];
  const vote = req.body.vote; // 1 for increment, -1 for decrement

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbase);

    // var updatedAt = new Date().toISOString();
    // console.log('updated at', updatedAt)

    var myquery = { uri: uri };
    dbo
      .collection('tracks')
      // .updateOne(
      //   myquery,
      //   // Update Timestamp too TODO:!!!
      //   { $push: { users: userId }, $inc: { votes: vote } },
      //   function(err, resp) {
      //     console.log('==============', resp)
      //     // console.log('==============', resp.toArray())
      //     console.log('==============', resp._id.getTimestamp())

      //     if (err) throw err;
      //     res.sendStatus(204);
      //     console.log('1 document updated');
      //     db.close();
      //   }
      // );
      .findAndModify(
        myquery,
        [['_id', 'asc']],
        {
          $push: { users: userId },
          $inc: { votes: vote },
          $set: { updatedAt: new Date().toISOString() }
        },
        { new: true },
        function(err, resp) {
          if (err) throw err;
          res
            .status(204)
            .json({
              track: { ...resp.value, timestamp: resp.value._id.getTimestamp() }
            });
          // res.sendStatus(204);
          db.close();
        }
      );
  });
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

export const getTracks = (req, res, next) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    var dbo = db.db(dbase);
    var mysort = { votes: -1 };
    dbo
      .collection('tracks')
      .find()
      .sort(mysort)
      .toArray(function(err, result) {

        if (err) throw err;

        const tracksWithTimeStamps = result.map(track => {
          return {
            ...track,
            timestamp: track._id.getTimestamp()
          };
        });

        res.status(200).json({ tracks: tracksWithTimeStamps });
        db.close();
        return;
      });
  });
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
