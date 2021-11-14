# Assignment-Playo
 Node server to read data from a json file
# How it works
 - use `node app.js` to run the server.

# Some test case
 - `http://127.0.0.1:3000/filter?city=Bangalore` (key - city - String) - To get the data with city Bangalore.

 - `http://127.0.0.1:3000/filter?category=1` (key - category - Number, category=2 for bookable venues) - To get the data by category for bookable venues.

 - `http://127.0.0.1:3000/filter?avgRating=5` (key - avgRating) - To get the data with avgRating.

 - `http://127.0.0.1:3000/filter?city=Bangalore&&avgRating=5&&amenities=Drinking%20Water&amenities=Refreshments`(key - amenities - Array<String>) - To get the data having city = Bangalore, avgRating = 5 and amenities = containing Refreshments,Drinking Water.
 
 - `http://127.0.0.1:3000/filter?category=1&&search=Ban` (string match) by name, city and area - To get the data or venues with search string.
 
 - `http://127.0.0.1:3000/filter?city=Bangalore&&sortBy=avgRating` - To get the data in ascending order respect to avgRating (Default case).
 
 - `http://127.0.0.1:3000/filter?city=Bangalore&&sortBy=avgRating&&descending=true` rating (key - avgRating - Number) - To sort data in descending order respect to avgRating.
 
 - `http://127.0.0.1:3000/filter?city=Bangalore&&sortBy=ratingCount` - To get the data in ascending order respect to ratingCount (Default case).
 
 -`http://127.0.0.1:3000/filter?city=Bangalore&&sortBy=ratingCount&&descending=true` rating (key - ratingCount - Number) - To sort data in descending order respect to avgRating.
 

