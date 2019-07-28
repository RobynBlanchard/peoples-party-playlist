import mongo from 'mongodb';

var MongoClient = mongo.MongoClient;
var url = 'mongodb://localhost:27017/peoples-party-playlist';

export const addVote = (req, res, next) => {
  const uri = req.body.uri;
  const userId = req.body.userId;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('peoples-party-playlist');
    var myobj = { uri, userId };

    dbo.collection('votes').count(myobj, function(err, resp) {
      if (err) throw err;

      if (resp > 5) {
        db.close();
        res.json({ error: 'already voted 5 times' });
      } else {
        dbo.collection('votes').insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log('1 document inserted');
          db.close();
        });
      }
    });
  });
};

export const getVotes = (req, res, next) => {
  const uri = req.query.uri;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('peoples-party-playlist');
    var myobj = { uri };
    dbo.collection('votes').count(myobj, function(err, resp) {
      if (err) throw err;
      res.json({ votes: resp });
      db.close();
    });
  });
};

export const howFarToMove = (req, res, next) => {
  const votes = req.query.votes;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('peoples-party-playlist');

    dbo.collection('votes').aggregate(
      [
        {
          $group: {
            _id: { uri: '$uri' },
            count: { $sum: 1 }
          }
        },
        {
          $match: {
            count: { $gt: parseInt(votes, 10) }
          }
        }
      ],
      function(err, db) {
        db.toArray(function(err, documents) {
          res.json({ offset: documents.length });
        });
      }
    );
  });
};
