const handleErrors = (res, error) => {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
};


export {handleErrors}

