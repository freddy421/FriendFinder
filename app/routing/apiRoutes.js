// LOAD DATA

var friends = require('../data/friends');

module.exports = function (app) {


	app.get('/api/friends', function (req, res) {
		res.json(friends);
	});


	// API POST Requests
	app.post('/api/friends', function (req, res) {


		// calculates the difference between each of the numbers and the user's numbers.
		// then choose the user with the least differences as the "best friend match."

		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000
		};

		//take the result of the user's survey POST.
		var userData = req.body;
		var userName = userData.name;
		var userPhoto = userData.photo;
		var userScores = userData.scores;

		var totalDifference = 0;

		// loop through all the friend possibilities in the database. 
		for (var i = 0; i < friends.length; i++) {

			console.log(friends[i].name);
			totalDifference = 0;

			//then loop scores thru friends.
			for (var j = 0; j < friends[i].scores[j]; j++) {

				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

				if (totalDifference <= bestMatch.friendDifference) {

					// Reset 
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.friendDifference = totalDifference;
				}
			}
		}

		//save users data
		friends.push(userData);

		// Return user's bestMatch.
		res.json(bestMatch);

	});

}