import { findUserByEmail } from "../models/user.model";

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


