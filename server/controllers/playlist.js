import mongo from 'mongodb';

var MongoClient = mongo.MongoClient;
var url = 'mongodb://localhost:27017/peoples-party-playlist';

export const addToPlaylist = (req, res, next) => {
  const uri = req.body.uri;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('peoples-party-playlist');
    var myobj = { uri: uri };
    dbo.collection('tracks').insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log('1 document inserted');
      db.close();
    });
    // });

    res.send({ resp: 'ye' });
    // connect to client
    // add track with zero votes
  });
};

export const addVote = (req, res, next) => {
  const uri = req.body.uri;
  const userId = req.body.userId;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('peoples-party-playlist');
    var myobj = { uri, userId };
    dbo.collection('votes').insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log('1 document inserted');
      db.close();
    });
    // });

    res.send({ resp: 'ye' });
    // connect to client
    // add track with zero votes
  });
};

export const getVotes = (req, res, next) => {
  // db.votes.find({uri: 'spotify:track:6d7o84YjY7nVU0idOz4hLL'})

  const uri = req.query.uri;
  // console.log('bpdyy', req.query)
  // const userId = req.body.userId;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('peoples-party-playlist');
    var myobj = { uri };
    dbo.collection('votes').count(myobj, function(err, resp) {
      if (err) throw err;
      // console.log(myobj)
      // console.log('respppp', resp)
      res.json({ votes: resp });
      // console.log('1 document inserted');
      db.close();
    });
    // });

    // res.json({ votes: votes });
    // connect to client
    // add track with zero votes
  });
};

export const howFarToMove = (req, res, next) => {
  const votes = req.query.votes;
  // console.log('bpdyy', req.query)
  // const userId = req.body.userId;

  MongoClient.connect(url, function(err, db) {
    console.log('VOTES', votes);
    if (err) throw err;
    var dbo = db.db('peoples-party-playlist');
    // var myobj = { uri };
    // dbo.collection('votes').count(dbo.votes.aggregate([{
    //   '$group': {
    //     '_id': {'uri': '$uri'},
    //     'count': {'$sum': 1},
    //     // 'data': {'$addToSet': '$$ROOT'}

    //   }
    // }, {
    //   '$match': {
    //     'count': {'$gte': 1}
    // }}]), function(err, resp) {
    //   if (err) throw err;
    //   console.log(myobj)
    //   console.log('respppp', resp)
    //   res.json({ votes: resp });
    //   // console.log('1 document inserted');
    //   db.close();
    // });
    // });
    dbo.collection('votes').aggregate(
      [
        {
          $group: {
            _id: { uri: '$uri' },
            count: { $sum: 1 },
          }
        },
        {
          $match: {
            'count': { $gt: parseInt(votes, 10) }
          }
        },

      ],
      function(err, db) {
        // console.log('DB', db);
        db.toArray(function(err, documents) {
          res.json({ offset: documents.length });

          // callback(documents);
        });
      }
    );

    // res.json({ votes: votes });
    // connect to client
    // add track with zero votes
  });
};

// db.votes.aggregate([{
//   '$group': {
//     '_id': {'uri': '$uri'},
//     'count': {'$sum': 1},
//     // 'data': {'$addToSet': '$$ROOT'}

//   }
// }, {
//   '$match': {
//     'count': {'$gte': 1}
// }}]).count()
