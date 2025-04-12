import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

// Spinner loading
const Spinner = () => (
  <div className="flex justify-center items-center py-10">
    <div className="w-10 h-10 border-4 border-emerald-400 border-dotted rounded-full animate-spin"></div>
  </div>
);

// Fungsi konversi angka ke Arab
const convertToArabicNumber = (number) => {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return number.toString().split("").map(d => arabicDigits[parseInt(d)]).join("");
};

function Juz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [groupedAyat, setGroupedAyat] = useState({});
  const [surahDetails, setSurahDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Ambil ayat-ayat berdasarkan juz
    fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?juz_number=${id}`)
      .then((res) => res.json())
      .then((data) => {
        groupBySurah(data.verses);
        setLoading(false);
      });

    // Ambil daftar surat
    fetch("https://api.quran.com/api/v4/chapters")
      .then((res) => res.json())
      .then((data) => {
        const details = {};
        data.chapters.forEach((chapter) => {
          details[chapter.id] = {
            arabicName: chapter.name_arabic,
            englishName: chapter.name_simple,
            revelationPlace: chapter.revelation_place.toUpperCase(),
          };
        });
        setSurahDetails(details);
      });
  }, [id]);

  // Grup ayat berdasarkan nomor surat
  const groupBySurah = (verses) => {
    const grouped = {};
    verses.forEach((verse) => {
      const [surahNumber] = verse.verse_key.split(":");
      if (!grouped[surahNumber]) grouped[surahNumber] = [];
      grouped[surahNumber].push(verse);
    });
    setGroupedAyat(grouped);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e3a34] via-[#254d44] to-[#2f5d50] text-white p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-emerald-200 mb-2">📖 Juz {id}</h1>
        <p className="text-emerald-300 italic text-sm md:text-lg">
          "Dan Kami telah mudahkan Al-Qur'an untuk peringatan."
        </p>
        <button
          onClick={() => navigate("/juz")}
          className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-full shadow-md hover:bg-emerald-800 transition duration-300 active:scale-95"
        >
          <IoIosArrowBack className="inline mr-1" /> Kembali
        </button>
      </header>

      {loading ? (
        <Spinner />
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedAyat).map(([surah, ayatList]) => (
            <div
              key={surah}
              className="bg-[#f9fdfb] text-gray-900 rounded-2xl shadow-lg p-6 border-t-4 border-emerald-600 text-center"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-emerald-800">
                {surahDetails[surah]?.arabicName}
              </h2>
              <p className="text-emerald-700">{surahDetails[surah]?.englishName}</p>
              <p className="text-gray-600 text-sm mt-2">{surahDetails[surah]?.revelationPlace}</p>

              <div className="mt-4 space-y-4 text-right">
                {ayatList.map((ayat) => {
                  const ayatNumber = ayat.verse_key.split(":")[1];
                  return (
                    <div
                      key={ayat.verse_key}
                      className="bg-white shadow-md p-4 rounded-lg border border-emerald-100"
                    >
                      <p className="text-2xl text-emerald-700 leading-relaxed amiri-font">
                        {ayat.text_uthmani}
                        <span className="text-sm text-emerald-500 ml-2">
                          ({convertToArabicNumber(ayatNumber)})
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="text-center mt-10 text-emerald-300 text-sm">
        &copy; 2025 Quran Juz App by Bima Sakti Franza
      </footer>
    </div>
  );
}

export default Juz;
