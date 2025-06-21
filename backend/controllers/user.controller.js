import { findUserByEmail, updateUser } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Usuario no existe." });
    }

    return res.status(200).json([
      {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image_url,
      },
    ]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const editUser = async (req, res) => {
  const { id, name, password, image } = req.body;

  const image_url = req.file
    ? `/uploads/${req.file.filename}`
    : image?.startsWith("http")
    ? image
    : null;

  try {
    let hashedPassword = null;

    if (password?.trim()) {
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password debe tener al menos 6 caracteres." });
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updated = await updateUser({
      id,
      password: hashedPassword,
      name,
      image: image_url,
    });

    return res.status(200).json({
      message: "Usuario actualizado con éxito.",
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        image: updated.image_url,
      },
    });
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
