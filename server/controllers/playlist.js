import mongo from 'mongodb';

var MongoClient = mongo.MongoClient;
var url = 'mongodb://localhost:27017/peoples-party-playlist';

export const addTrack = (req, res, next) => {
  const uri = req.body.uri;
  const name = req.body.name;
  const artist = req.body.artist;

  // const userId = req.body.userId;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('peoples-party-playlist');
    var myobj = { uri, votes: 0, users: [], name, artist };
    dbo.collection('tracks').insertOne(myobj, function(err, resp) {
      if (err) throw err;
      res.json({yeah: 'yeah'})
      console.log('1 document inserted');
      db.close();
    });
    // dbo.collection('votes').count(myobj, function(err, resp) {
    //   if (err) throw err;

    //   if (resp > 5) {
    //     db.close();
    //     res.json({ error: 'already voted 5 times' });
    //   } else {
    //     dbo.collection('votes').insertOne(myobj, function(err, res) {
    //       if (err) throw err;
    //       console.log('1 document inserted');
    //       db.close();
    //     });
    //   }
    // });
  });
};

export const addVote = (req, res, next) => {
  const uri = req.body.uri;
  const userId = req.body.userId;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('peoples-party-playlist');

    var myquery = { uri: uri };
    // var newvalues = {uri: uri, {$inc: { votes: 1 }}, { $push: { users: 123 } };
    // dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
    dbo.collection('tracks').updateOne(
      myquery,
      { $push: { users: 123 }, $inc: { votes: 1 } },
      // { $inc: { votes: 1 } },
      function(err, resp) {
        if (err) throw err;
        res.json({'error': null})
        console.log('1 document updated');
        db.close();
      }
    );

    // dbo.collection('tracks').update(
    //   {uri: uri},
    //   {uri: uri,  {$inc: { votes: 1 }}, { $push: { usesrs: 123 } },
    // {
    //   // upsert: <boolean>,
    //   multi: <boolean>,
    //   writeConcern: <document>,
    //   collation: <document>,
    //   arrayFilters: [ <filterdocument1>, ... ]
    // }
    //  )
  });

  // MongoClient.connect(url, function(err, db) {
  //   if (err) throw err;
  //   var dbo = db.db('peoples-party-playlist');
  //   var myobj = { uri, userId };

  //   dbo.collection('votes').count(myobj, function(err, resp) {
  //     if (err) throw err;

  //     if (resp > 5) {
  //       db.close();
  //       res.json({ error: 'already voted 5 times' });
  //     } else {
  //       dbo.collection('votes').insertOne(myobj, function(err, res) {
  //         if (err) throw err;
  //         console.log('1 document inserted');
  //         db.close();
  //       });
  //     }
  //   });
  // });
};

export const getVotes = (req, res, next) => {
  const uri = req.query.uri;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('peoples-party-playlist');
    var myobj = { uri };
    // dbo.collection('tracks').find(myobj, function(err, resp) {
    //   if (err) throw err;
    //   console.log('resp', resp)
    //   console.log('!!!!!!!!!!', resp.votes)
    //   console.log('!!!!!!!!!!', resp.toArray())
    //   resp.toArray(function(err, documents) {
    //     console.log('!!!!!!!!!!!!!!', documents)
    //     // res.json({ offset: documents.length });
    //   });

    //   res.json({ votes: resp.votes });
    //   db.close();
    // });
    dbo
      .collection('tracks')
      .find(myobj)
      .toArray(function(err, result) {
        if (err) throw err;
        res.json({votes: result[0].votes})
        db.close();
      });
  });
};

export const howFarToMove = (req, res, next) => {
  const votes = req.query.votes;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('peoples-party-playlist');
    dbo.collection('tracks').find({ votes: { $gt: parseInt(votes, 10) } }).count( function(err, resp) {
      if (err) throw err;
      // resp.toArray(function(err, documents) {
      //         console.log('!!!!!!!!!!!!!!', documents)
      //         // res.json({ offset: documents.length });
      //       });
      res.json({ pos: resp });
      db.close();

    })

    // dbo.collection('tracks').aggregate(
    //   [
    //     {
    //       $group: {
    //         _id: { uri: '$uri' },
    //         count: { $sum: 1 }
    //       }
    //     },
    //     {
    //       $match: {
    //         count: { $gt: parseInt(votes, 10) }
    //       }
    //     }
    //   ],
    //   function(err, db) {
        // db.toArray(function(err, documents) {
        //   console.log('!!!!!!!!!!!!!!', documents)
        //   res.json({ offset: documents.length });
        // });
    //   }
    // );
  });
};

// TODO:
// fetch playlist from db and order by votes
// poll to receive playlist with updated votes

export const fetchPlaylist = (req, res, next) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('peoples-party-playlist');
    var mysort = { votes: -1 };
    dbo
      .collection('tracks')
      .find()
      .sort(mysort)
      .toArray(function(err, result) {
        if (err) throw err;
        // console.log(result);
        res.json({playlist: result})
        db.close();
      });
  });
};


// TODO: if last updated at is less than 5 secs ago then focus on track