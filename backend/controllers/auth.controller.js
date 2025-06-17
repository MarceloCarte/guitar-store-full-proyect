import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/user.model.js";

export const signUp = async (req, res) => {
  const { email, password, name, image } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Usuario ya existe." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(email, name, hashedPassword, image);

    return res.status(201).json({
      message: "Usuario creado con éxito.",
      user: {
        id: user.id,
        email: user.email,
        image: user.image_url,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!email) return res.status(401).json({ message: "Email inválido." });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Password inválida." });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({ message: 'Login existoso.' })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
