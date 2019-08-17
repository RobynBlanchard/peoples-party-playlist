import mongo from 'mongodb';

// TODO: session started reverts back to false when page refresh

// tODO: - link date, started time etc., playlist id
export const updateSession = (req, res, next) => {
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
      // updatedAt: new Date().toISOString(),
      removed: false,
      locked: false
    };
    dbo.collection('session').insertOne(myobj, function(err, resp) {
      if (err) throw err;
      res.sendStatus(201);
      // could return new track
      console.log('1 document inserted');
      db.close();
    });
  });
};