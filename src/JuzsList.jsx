import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

function JuzsList() {
  const [juzList, setJuzList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJuzs = async () => {
      try {
        const res = await fetch("https://api.quran.com/api/v4/juzs");
        const data = await res.json();

        const uniqueJuz = Array.from(
          new Map(data.juzs.map((juz) => [juz.juz_number, juz])).values()
        );

        setJuzList(uniqueJuz);
      } catch (err) {
        console.error("Gagal mengambil daftar Juz:", err);
      }
    };

    fetchJuzs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e3a34] via-[#254d44] to-[#2f5d50] text-white p-4 md:p-8">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-emerald-200 mb-2">📖 Daftar Juz Al-Qur'an</h1>
        <p className="text-emerald-300 italic text-sm md:text-lg">"Pilih Juz untuk membaca lebih lanjut."</p>
      </header>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-emerald-700 text-white rounded-full shadow-md hover:bg-emerald-800 transition duration-300 active:scale-95"
        >
          <IoIosArrowBack className="inline-block mr-1" /> Kembali
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {juzList.map((juz) => (
          <Link
            key={juz.juz_number}
            to={`/juz/${juz.juz_number}`}
            className="bg-[#f9fdfb] text-gray-900 rounded-2xl shadow-lg p-6 border-t-4 border-emerald-600 text-center hover:scale-105 transition-all duration-300"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-emerald-800">Juz {juz.juz_number}</h2>
          </Link>
        ))}
      </div>

      <footer className="text-center mt-10 text-emerald-300 text-sm">
        &copy; 2025 Quran Juzs List by Bima Sakti Franza
      </footer>
    </div>
  );
}

export default JuzsList;
