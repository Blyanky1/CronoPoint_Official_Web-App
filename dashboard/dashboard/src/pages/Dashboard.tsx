import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebaseconfig";
import { useNavigate } from "react-router-dom";
import logo2 from "../assets/logo2.png";
import {
  collection,
  query,
  where,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";

import Grafico1 from "../components/Grafico1";

export default function Dashboard() {
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalCalcs, setTotalCalcs] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0); // Novo estado para erros

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    const unsubUsers = onSnapshot(collection(db, "users"), (snap) =>
      setTotalUsers(snap.size)
    );

    const last24h = Timestamp.fromDate(
      new Date(Date.now() - 24 * 60 * 60 * 1000)
    );

    const qActive = query(
      collection(db, "users"),
      where("lastLogin", ">=", last24h)
    );

    const unsubActive = onSnapshot(qActive, (snap) =>
      setActiveUsers(snap.size)
    );

    const unsubCalcs = onSnapshot(collection(db, "historico"), (snap) =>
      setTotalCalcs(snap.size)
    );

    
    const unsubErrors = onSnapshot(collection(db, "erros"), (snap) =>
      setTotalErrors(snap.size)
    );

    return () => {
      unsubUsers();
      unsubActive();
      unsubCalcs();
      unsubErrors();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F7F6] flex flex-col text-gray-900">

      {/* NAVBAR */}
      <header className="relative bg-[#3A8F84] pb-1 shadow-lg">
        <div className="absolute inset-0 bg-[#3A8F84] rounded-b-[35px] shadow-lg"></div>

        <div className="relative z-10 px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo permanece igual */}
            <img src={logo2} className="h-20 drop-shadow" alt="Logo" />

            {/* Menu aumentado */}
            <nav className="flex items-center gap-8 text-base sm:text-lg font-medium">
              <button className="text-white font-semibold underline underline-offset-4">
                Dashboard
              </button>
              <button className="text-[#D7F5E6] hover:text-white transition">
                Histórico
              </button>
              <button className="text-[#D7F5E6] hover:text-white transition">
                Gerenciamento
              </button>
            </nav>
          </div>

          {/* Ícones + Logout aumentados */}
          <div className="flex items-center gap-6">
            {/* Ícone de notificações maior */}
            <button className="relative text-white hover:text-[#D7F5E6] transition">
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </button>

            {/* Avatar maior */}
            <img
              src={logo2}
              alt="Avatar"
              className="h-10 w-10 rounded-full border-2 border-white shadow-sm"
            />

            {/* Botão de logout maior */}
            <button
              onClick={handleLogout}
              className="bg-[#0B3C38] hover:bg-[#062C27] text-white px-5 py-2.5 rounded-xl shadow-md transition text-base font-semibold"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="-mt-16 px-8 max-w-[1200px] mx-auto w-full flex flex-col">
        {/* TÍTULO */}
        <div className="mb-10">
          <p className="text-sm text-[#0D453F] uppercase font-semibold tracking-wide">
            CronoPoint
          </p>
          <h1 className="text-4xl font-extrabold text-[#114E48]">Dashboard</h1>
        </div>

        {/* BOTÕES */}
        <div className="flex gap-3 mb-10">
          {["Gerenciamento de Localização", "Comparação"].map(
            (t) => (
              <button
                key={t}
                className="px-4 py-2 bg-white rounded-xl shadow-sm border border-[#3A8F84] text-[#0D453F] hover:bg-[#DFF3EC] transition"
              >
                {t}
              </button>
            )
          )}
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-4 gap-7">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-[#CFEFE5] flex flex-col justify-center items-center hover:scale-[1.02] transition">
            <h2 className="text-[#0D453F] text-sm font-semibold uppercase tracking-wide">
              Total de Usuários
            </h2>
            <p className="text-5xl font-bold mt-2 text-[#3A8F84]">{totalUsers}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl border border-[#CFEFE5] flex flex-col justify-center items-center hover:scale-[1.02] transition">
            <h2 className="text-[#0D453F] text-sm font-semibold uppercase tracking-wide">
              Ativos 24h
            </h2>
            <p className="text-5xl font-bold mt-2 text-[#2FA09E]">{activeUsers}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl border border-[#CFEFE5] flex flex-col justify-center items-center hover:scale-[1.02] transition">
            <h2 className="text-[#0D453F] text-sm font-semibold uppercase tracking-wide">
              Cálculos Realizados
            </h2>
            <p className="text-5xl font-bold mt-2 text-[#C14242]">{totalCalcs}</p>
          </div>


          <div className="bg-white rounded-3xl p-6 shadow-xl border border-[#CFEFE5] flex flex-col justify-center items-center hover:scale-[1.02] transition">
            <h2 className="text-[#0D453F] text-sm font-semibold uppercase tracking-wide">
              Erros ou Falhas Registradas
            </h2>
            <p className="text-5xl font-bold mt-2 text-[#C14242]">{totalErrors}</p>
          </div>
        </div>

        {/* GRÁFICO */}
        <div className="mt-12">
          <Grafico1 />
        </div>

        {/* RODAPÉ */}
        <p className="text-center text-xs text-gray-400 mt-20 pb-10">
          © {new Date().getFullYear()} CronoPoint — Todos os direitos reservados.
        </p>
      </main>
    </div>
  );
}
