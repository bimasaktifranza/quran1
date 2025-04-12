import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

function App() {
  const [surah, setSurah] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.quran.com/api/v4/chapters?language=id`)
      .then((res) => res.json())
      .then((data) => setSurah(data.chapters));
  }, []);

  const filteredSurah = surah.filter((item) =>
    item.name_simple.toLowerCase().includes(search.toLowerCase()) ||
    item.name_arabic.includes(search) ||
    item.translated_name.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e3a34] via-[#254d44] to-[#2f5d50] text-white p-4 md:p-8">
      <header className="text-center mb-10">
        <img
          src="quran.png"
          alt="Logo Al-Qur'an"
          className="w-24 md:w-32 mx-auto mb-4 rounded-full shadow-lg border-2 border-emerald-400"
        />
        <h1 className="text-3xl md:text-5xl font-bold text-emerald-200 mb-2">
          📖 Nur Al-Qur'an
        </h1>
        <p className="text-emerald-300 italic text-sm md:text-lg">
          "Al-Qur'an Penerang Jalan Hidup."
        </p>
      </header>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Cari Surah..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 border border-emerald-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-[#f9fdfb] text-gray-900 shadow-sm"
        />
      </div>

      <div className="flex justify-center mb-8">
        <button
          className="px-4 py-2 bg-emerald-700 text-white rounded-full shadow-md hover:bg-emerald-800 hover:shadow-lg transition duration-300 ease-in-out active:scale-95"
          onClick={() => navigate("/juz")}
        >
          LIHAT JUZ
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSurah.map((item, index) => (
          <div
            key={index}
            className="bg-[#f9fdfb] rounded-2xl shadow-lg p-6 border-t-4 border-emerald-600 hover:scale-105 transition-all duration-300 text-center text-gray-800"
          >
            <p className="text-emerald-700 text-2xl font-bold">{item.id}.</p>
            <h2 className="text-xl md:text-2xl font-semibold text-emerald-800">
              {item.name_simple}
            </h2>
            <p className="text-emerald-700 text-2xl font-arabic">{item.name_arabic}</p>
            <p className="text-emerald-600 italic">{item.translated_name.name}</p>
            <p className="text-gray-600 text-sm mt-2">Total Ayat: {item.verses_count}</p>
            <p className="text-gray-600 text-sm mt-2 capitalize">{item.revelation_place}</p>
            <Link to={`/ayat/${item.id}`}>
              <button className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-full shadow-md hover:bg-emerald-800 hover:shadow-lg transition duration-300 ease-in-out active:scale-95">
                BACA AYAT
              </button>
            </Link>
          </div>
        ))}
      </div>

      <footer className="text-center mt-10 text-emerald-300 text-sm">
        &copy; 2025 Quran Surah App by Bima Sakti Franza
      </footer>
    </div>
  );
}

export default App;
