const db = require('../lib/dbConnect');

function getAllPuppies(req, res, next) {

  db.any('SELECT * from puppies;')
    .then((puppies) => {
      res.puppies = puppies;
      next();
    })
    .catch(error => next(error));
}

function adoptPuppy(req, res, next) {
  // Implement adopting a puppy
  db.none(`INSERT INTO puppies (name, url)
    VALUES ($/name/, $/url/);`, req.body)
    .then(() => next());
}

function likePuppy(req, res, next) {
  // Implement increasing the likes value of the puppy by one
    var puppyID = parseInt(req.params.id);
  db.none(`
    UPDATE puppies
    SET likes = likes + 1
    WHERE id = $1;`, puppyID)
    .then(() => {
    next();
  })
  .catch(err => next(err));
}

function abandonPuppy(req, res, next) {
  // Implement abandoning the puppy :(
  var puppyID = parseInt(req.params.id);
  db.none(`
    DELETE FROM puppies
    WHERE id = $1;`, puppyID)
    .then(() => {
    next();
  })
  .catch(err => next(err));
// implement delete
}

module.exports = {
  getAllPuppies,
  adoptPuppy,
  likePuppy,
  abandonPuppy
};
