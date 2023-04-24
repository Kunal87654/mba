const Movie = require("../models/movie.model");

/**
 * Get the list of all movies
 */

exports.getAllMovies = async(req, res) => {

    const queryObj = {};

    if(req.query.name != undefined) {
        queryObj.name = req.query.name;
    }

    const movies = await Movie.find(queryObj);
    res.status(200).send(movies);
}

exports.getMovie = async(req, res) => {

    const movie = await Movie.findOne({
        _id: req.params.id
    });

    res.status(200).send(movie);
}

exports.createMovie = async(req, res) => {

    const movieObject = {
        name: req.body.name,
        description: req.bdoy.description.Movie,
        casts: req.body.casts,
        director: req.body.director,
        trailerUrl: req.body.trailerUrl,
        posterUrl: req.body.posterUrl,
        language: req.body.language,
        releaseDate: req.body.releaseDate,
        releaseStatus: req.body.releaseStatus
    }

    const movie = await Movie.create(movieObject);
    res.status(201).send(movie);
}

exports.updateMovie = async (req, res) => {

    const savedMovie = await Movie.findOne({_id: req.params.id});

    if(!savedMovie){
        res.status(400).send({
            message: "Movie being updated doesn't exist"
        })
    }

    savedMovie.name = req.body.name != undefined? req.body.name: savedMovie.name;
    savedMovie.description = req.body.description != undefined? req.body.description: savedMovie.description;
    savedMovie.casts = req.body.casts != undefined? req.body.casts: savedMovie.casts;
    savedMovie.director = req.body.director != undefined? req.body.director: savedMovie.director;
    savedMovie.trailerUrl = req.body.trailerUrl != undefined? req.body.trailerUrl: savedMovie.trailerUrl;
    savedMovie.posterUrl = req.body.posterUrl != undefined? req.body.posterUrl: savedMovie.posterUrl;
    savedMovie.language = req.body.language != undefined? req.body.language: savedMovie.language;
    savedMovie.releaseDate = req.body.releaseDate != undefined? req.body.releaseDate: savedMovie.releaseDate;
    savedMovie.releaseStatus = req.body.releaseStatus != undefined? req.body.releaseStatus: savedMovie.releaseStatus;

    var updateMovie = await savedMovie.save();

    res.status(200).send(updateMovie);
}