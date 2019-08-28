exports.createPostValidator = (req, res, next) => {
    // title
    req.check("title", "Post title is required").notEmpty();
    req.check("title", "Title must be between 4 to 150 characters").isLength({
        min: 4,
        max: 150
    });
    // title
    req.check("body", "Post body is required").notEmpty();
    req.check("body", "Body must be between 4 to 2000 characters").isLength({
        min: 4,
        max: 150
    });
    // check for errors
    const errors = req.validtionErrors();
    // show the first error
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    // proceed to the next middleware
    next();
}