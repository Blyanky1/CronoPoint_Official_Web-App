import React, { useState } from "react";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseconfig"; 
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";


import logo2 from "../assets/logo2.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

     
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
       
        await updateDoc(docRef, {
          lastLogin: new Date()
        });

        const data = docSnap.data();
        if (data.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/app");
        }
      } else {
        setError("Usuário não registrado no sistema.");
      }
    } catch (err) {
      console.error(err);
      setError("Email ou senha inválidos.");
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
          <img src={logo2} alt="Logo CronoPoint" className="w-48 h-48 object-contain mb-2" />
          <h1 className="text-2xl font-bold text-center text-[#35797A]">
            CronoPoint
          </h1>
        </div>

        <p className="text-center text-gray-600 mb-8 text-sm">
          Acesse seu painel
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@gmail.com"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-[#469799] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-[#469799] outline-none"
              required
            />
          </div>

          {error && <p className="text-center text-[#C14242] text-sm font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#469799] hover:bg-[#35797A] text-white font-semibold py-2 rounded-full transition-all"
          >
            Entrar
          </button>
        </form>

        <div className="text-center mt-5 text-sm text-gray-500">
          <Link to="/Esqueceusenha" className="hover:text-[#35797A] transition-colors">
            Esqueci minha senha
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} CronoPoint — Todos os direitos reservados.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
