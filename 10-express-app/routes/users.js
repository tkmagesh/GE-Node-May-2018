var express = require('express');
var router = express.Router();

let users = [
	{
		id : 100,
		name : 'Magesh'
	},
	{
		id : 101,
		name : 'Suresh'
	},
	{
		id : 102,
		name : 'Ganesh'
	},
]
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({ users });
});

router.get('/:id', function(req, res, next) {
  let user = users.find(u => u.id === parseInt(req.params.id));
  if (user){
  	res.json({user})
  } else {
  	next();
  }
});

module.exports = router;
