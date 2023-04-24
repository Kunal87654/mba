const constants = require("../utils/constants");


validateMovieRequestBody = async (req, res, next) => {

    if(!req.body.name) {
        return res.status(400).send({
            message: "Failed! Movie name is not provided !"
        });
    }

    if(!req.body.releaseStatus) {
        return res.status(400).send({
            message: "Failed! Movie release status is not provided !"
        });
    }

    const releaseStatus = req.body.releaseStatus;
    const releaseStatusTypes = [constants.releaseStatus.released, constants.releaseStatus.blocked, constants.releaseStatus.unreleased]
    if(!releaseStatusTypes.includes(releaseStatus)) {
        return res.status(400).send({
            message: "Movie release status provided is invalid. Possible values UNRELEASED | RELEASED | BLOCKED"
        });
    }

    if(!req.body.releaseDate) {
        return res.status(400).send({
            message: "Failed! Movie relese date is not provided."
        })
    }

    if(!req.body.director) {
        return res.status(400).send({
            message: "Failed! Movie director is not provided !"
        });

    }

    next();
}

const verifyMovieReqBody = {
    validateMovieRequestBody: validateMovieRequestBody
};

module.exports = verifyMovieReqBody;