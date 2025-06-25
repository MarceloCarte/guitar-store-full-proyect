import { useState, useContext } from "react";
import { AppContext } from "@/context/appContext";
import { useNavigate } from "react-router-dom";
import { AppState, NewUser } from "@/interfaces/interfaces";

export default function SignUpPage() {
  const { signUp } = useContext(AppContext) as AppState;
  const navigate = useNavigate();

  const [form, setForm] = useState<NewUser>({
    name: "",
    email: "",
    password: "",
    image: "",
    type: "user",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(form);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto my-10 p-4 border border-gray-700 rounded-lg flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold text-center">Sign Up</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        className="p-2 border rounded"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="p-2 border rounded"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="p-2 border rounded"
        value={form.password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Profile Image URL (optional)"
        className="p-2 border rounded"
        value={form.image}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Register
      </button>
    </form>
  );
}
