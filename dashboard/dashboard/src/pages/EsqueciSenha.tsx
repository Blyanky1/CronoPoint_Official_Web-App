
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseconfig";


import logo2 from "../assets/logo2.png";

const Esqueceusenha: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Link de redefinição enviado para seu e-mail.");
    } catch (err) {
      console.error(err);
      setError("Não foi possível enviar o link. Verifique o e-mail informado.");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#469799] overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#469799] via-[#f6f8f8] to-[#35797A]"></div>

      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute w-80 h-80 rounded-full bg-white/10 blur-3xl"
      ></motion.div>

      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
      >
      
        <div className="flex flex-col items-center mb-6">
          <img src={logo2} alt="Logo CronoPoint" className="w-40 h-40 object-contain mb-2" />
          <h1 className="text-2xl font-bold text-center text-[#35797A]">
            CronoPoint
          </h1>
        </div>

        <p className="text-center text-gray-600 mb-8 text-sm">
          Digite seu e-mail e enviaremos um link para redefinir sua senha.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              placeholder="seuemail@cronopoint.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-[#469799] outline-none"
              required
            />
          </div>

          {error && (
            <p className="text-center text-[#C14242] text-sm font-medium">
              {error}
            </p>
          )}

          {success && (
            <p className="text-center text-green-600 text-sm font-medium">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#469799] hover:bg-[#35797A] text-white font-semibold py-2 rounded-full transition-all"
          >
            Enviar Link
          </button>
        </form>

        <div className="text-center mt-5 text-sm text-gray-500">
          <p className="text-gray-600">
            Lembrou da senha?{" "}
            <Link
              to="/"
              className="hover:text-[#35797A] font-medium transition-colors"
            >
              Faça login
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} CronoPoint — Todos os direitos reservados.
        </p>
      </motion.div>
    </div>
  );
};

export default Esqueceusenha;
