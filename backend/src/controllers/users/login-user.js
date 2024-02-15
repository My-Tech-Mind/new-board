import  bcrypt from 'bcrypt';
import { connection as knex } from "../../database/connection.js";
import  jwt  from 'jsonwebtoken'


const loginUser = async (req, res) => {
    const { email, password } = req.body

    const passwording = process.env.PASSWORD_HASH;

    try {

        const user = await knex('users').where({ email }).first();

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ message: 'Email or password do not match.' })
        }

        const token = jwt.sign({ id: user.id }, passwording, { expiresIn: '24h' });
        const { senha: _, ...userData } = user;

        return res.status(200).json({ user: userData, token });

    } catch (error) {

        return res.status(500).json({ message: error.message })
    }
}

export {loginUser}