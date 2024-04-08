const validateQueryRequest = joiSchema => async (req, res, next) => {
    try {
        await joiSchema.validateAsync(req.query);

        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export { validateQueryRequest };