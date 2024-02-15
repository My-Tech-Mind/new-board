

const userDetails = async (req, res) => {
    const {authorization} = req.headers

    const user = req.user;
    if (!user) {
        return res.status(404).json("User not found");
    }
    
    try {
        
        const {id, name, email} = user

        return res.status(200).json({id, name, email});
    } catch (error) {

        
        return res.status(500).json({message: error.message});
    }

}

export {userDetails}