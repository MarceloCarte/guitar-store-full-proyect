import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/user.model.js";
import { validateEmail } from "../utils/userUtils.js";

// {email: '', password: '', name: '', image: ''}

export const signUp = async (req, res) => {
  const { email, password, name, image } = req.body;

  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: "Email inválido." });
  }

  try {
    const cleanEmail = email.toLowerCase().trim();
    const existingUser = await findUserByEmail(cleanEmail);
    if (existingUser) {
      return res.status(400).json({ message: "Usuario ya existe." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(cleanEmail, name, hashedPassword, image);

    return res.status(201).json({
      message: "Usuario creado con éxito.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image_url,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

// {email: '', password: ''}

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: "Email inválido." });
  }

  try {
    const cleanEmail = email.toLowerCase().trim();
    const user = await findUserByEmail(cleanEmail);

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Password inválida." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      message: "Login exitoso.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image_url,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
