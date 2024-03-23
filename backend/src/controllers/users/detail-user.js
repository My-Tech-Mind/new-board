import { connection as knex } from "../../database/connection.js";

const detailUser = async (req, res) => {
    try {
        const loggedUser = await knex('users').where({ id: req.user.id }).first();
        if (!loggedUser) {
            return res.status(404).json("User not found");
        }

        const { password: _, ...userData } = loggedUser;

        return res.status(200).json(userData);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export { detailUser }