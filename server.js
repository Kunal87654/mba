const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbConfig = require('./configs/db.config');
const Movie = require('./models/movie.model');
const Theatre = require('./models/theatre.model');
const User = require('./models/user.model');
const bcrypt = require('bcryptjs');

// Initializing express
const app = express();

// Using the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * DB Connection initialization
 */
mongoose
  .connect(dbConfig.DB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    init();
  })
  .catch((err) => {
    console.log('Error:', err.message);
  });

/**
 * This function will initialize the initial state of the movie booking application
 */
async function init() {

    await Movie.collection.drop();
  try {
    // Creating few initial movies
    const movie1 = await Movie.create({
      name: 'Bachhan Pandey',
      description: 'Comedy Masala Movie',
      casts: ['Akshay Kumar', 'Jacqueline Fernandiz'],
      director: 'Farhad Samji',
      trailerUrl: 'http://bacchanpandey/trailers/1',
      posterUrl: 'http://bacchanpandey/posters/1',
      language: 'Hindi',
      releaseDate: '18-03-2022',
      releaseStatus: 'RELEASED'
    });

    const movie2 = await Movie.create({
      name: 'Jalsa',
      description: 'Intense Drama Movie',
      casts: ['Vidya Balan', 'Shefali Shah'],
      director: 'Suresh Triveni',
      trailerUrl: 'http://jalsa/trailers/1',
      posterUrl: 'http://jalsa/posters/1',
      language: 'Hindi',
      releaseDate: '18-03-2022',
      releaseStatus: 'RELEASED'
    });

    const movie3 = await Movie.create({
      name: 'Jhund',
      description: 'Comedy Drama Movie',
      casts: ['Amitabh Bachchan', 'Abhinay Raj'],
      director: 'Nagraj Manjule',
      trailerUrl: 'http://jhund/trailers/1',
      posterUrl: 'http://jhund/posters/1',
      language: 'Hindi',
      releaseDate: '04-03-2022',
      releaseStatus: 'RELEASED'
    });

    const movie4 = await Movie.create({
      name: 'Radhe Shyam',
      description: 'Comedy Drama Movie',
      casts: ['Prabhas', 'Pooja Hegde'],
      director: 'Radha Krishna Kumar',
      trailerUrl: 'http://RadheShyam/trailers/1',
      posterUrl: 'http://RadheShyam/posters/1',
      language: 'Hindi',
      releaseDate: '11-03-2022',
      releaseStatus: 'RELEASED'
    });

    const movie5 = await Movie.create({
        name: 'The Kashmir Files',
        description: 'Intense Movie',
        casts: ['Mithun Chakraborty', 'Anupam Kher'],
        director: 'Vivek Agnihotri',
        trailerUrl: 'http://TheKashmirFiles/trailers/1',
        posterUrl: 'http://TheKashmirFiles/posters/1',
        language: 'Hindi',
        releaseDate: '11-03-2022',
        releaseStatus: 'RELEASED'
      });

      console.log("movies inserted in the db");


      //creating few intial sets of Theatres
      await Theatre.collection.drop();
      await Theatre.create({
          name: "FunCinemas",
          city: "Bangalore",
          description: "Top class theatre",
          pinCode: 560052,
          movies : [movie1._id, movie2._id, movie3._id]

      });
      await Theatre.create({
          name: "PVR Cinemas - Kormangala",
          city: "Bangalore",
          description: "PVR franchise theatre",
          pinCode: 560095,
          movies : [movie1._id, movie2._id, movie4._id]

      });
      await Theatre.create({
          name: "IMax",
          city: "Bangalore",
          description: "IMax franchise theatre",
          pinCode: 560095,
          movies : [movie1._id, movie4._id]

      });
      await Theatre.create({
          name: "Vaibhav Theatre",
          city: "Bangalore",
          description: "Economical theatre",
          pinCode: 560094,
          movies : [movie5._id, movie4._id]

      });

      await Theatre.create({
          name: "Inox",
          city: "Pune",
          description: "Top class theatre",
          pinCode: 411001,
          movies : [movie5._id, movie2._id]

      });
      await Theatre.create({
          name: "Sonmarg Theatre",
          city: "Pune",
          description: "Economical theatre",
          pinCode: 411042,
          movies : [movie3._id, movie2._id]

      });
  
      // Rest of your code
      /**
     * Creating one ADMIN user at the server boot time
     */
     await User.collection.drop();
     try {

        user = await User.create({
            name: "riya",
            userId: "1", // It should be atleat 16, else will throw error
            email: "riya@gmail.com",  // If we don't pass this, it will throw the error
            userType: "ADMIN",
            password :bcrypt.hashSync("riya123", 8) //this field should be hidden from the end user

        });
        console.log("ADMIN user created");

    } catch (e) {
        console.log(e.message);
    }

 /**
 * Importing the routes
 */
require('./routes/movie.routes')(app);
require('./routes/theatre.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/booking.routes')(app);
require('./routes/payment.routes')(app);
  
      // Start the server
      const PORT = process.env.PORT || 8080;
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Initialization Error:', error);
    }
  }