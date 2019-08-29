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
    const errors = req.validationErrors();
    // show the first error
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    // proceed to the next middleware
    next();
}


exports.userSignupValidator = (req, res, next) => {
    // name
    req.check("name", "Name is required").notEmpty();
    // email
    req.check("email", "Email must be between 3 and 30")
        .matches(/.+\@.+\..+/)
        .withMessage("email must contain @")
        .isLength({
            min: 4,
            max: 300
        })
    // password
    req.check("password", "Password is required").notEmpty();
    req.check("password").isLength({min: 6})
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number")
    // check for multiple errors
    const errors = req.validationErrors();
    // show the first error
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    // proceed to the next middleware
    next();
}