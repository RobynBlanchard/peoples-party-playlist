import mongo from 'mongodb';

var MongoClient = mongo.MongoClient;
var url = 'mongodb://localhost:27017/peoples-party-playlist';

export const addToPlaylist = (req, res, next) => {
  console.log('test!!');
  const uri = req.body.uri;
  // console.log(req)

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
