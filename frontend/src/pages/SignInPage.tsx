import { useState, useContext } from "react";
import { AppContext } from "@/context/appContext";
import { useNavigate } from "react-router-dom";
import { AppState } from "@/interfaces/interfaces";

export default function SignInPage() {
  const { login } = useContext(AppContext) as AppState;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(form.email, form.password); // uses context logic
    navigate("/");
  };

  const handleLinkSignUp = () => {
    navigate('/sign-up')
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto my-10 p-4 border border-gray-700 bg-gray-600 rounded-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 border rounded bg-black"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 border rounded bg-black"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-gray-900 text-white p-2 rounded hover:bg-green-700"
        >
          Ingresar
        </button>
      </form>
      <div className=" flex flex-col justify-center text-center border border-gray-700 max-w-md mx-auto p-2">
        <h3>¿No estás registrado?</h3>
        <h4>Crea tu cuenta <span onClick={handleLinkSignUp} className="font-semibold underline">¡aquí!</span></h4>
      </div>
    </>
  );
}
