import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router";
import QoriDropdown from "./QoriDropdown";
import { Pause, Play } from "lucide-react";

const convertToArabicNumber = (number) => {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return number.toString().split("").map(d => arabicDigits[parseInt(d)]).join("");
};

function Ayat() {
  const { id } = useParams();
  const [ayat, setAyat] = useState([]);
  const [terjemah, setTerjemah] = useState([]);
  const [recitation, setRecitation] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [namaSurah, setNamaSurah] = useState("");
  const audioRef = useRef(null);
  
  useEffect(() => {
    fetch(`https://api.quran.com/api/v4/chapters/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNamaSurah(`${data.chapter?.name_arabic} - ${data.chapter?.name_simple}`);
      });
  }, [id]);
 
  useEffect(() => {
    fetch(`https://api.quran.com/api/v4/quran/translations/33?chapter_number=${id}`)
      .then((res) => res.json())
      .then((data) => setTerjemah(data.translations));
  }, [id]);

  useEffect(() => {
    fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${id}`)
      .then((res) => res.json())
      .then((data) => setAyat(data.verses));
  }, [id]);

  useEffect(() => {
    if (!recitation) return;
    fetch(`https://api.quran.com/api/v4/chapter_recitations/${recitation}/${id}`)
      .then((res) => res.json())
      .then((data) => setAudioUrl(data.audio_file?.audio_url || ""))
      .catch((err) => console.error("Error fetching audio:", err));
  }, [id, recitation]);

  const toggleAudio = () => {
    if (!recitation) {
      alert("Silakan pilih qori terlebih dahulu.");
      return;
    }
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e3a34] via-[#254d44] to-[#2f5d50] text-white p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-emerald-200 mb-2">📖 Ayat Al-Qur'an</h1>
        {namaSurah && (
          <h2 className="text-xl md:text-2xl font-semibold text-emerald-100 mb-1">{namaSurah}</h2>
        )}
        <p className="text-emerald-300 italic text-sm md:text-lg">
          "Sungguh Al-Qur'an memberikan petunjuk ke jalan yang lurus."
        </p>
        <Link to="/">
          <button className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-full shadow-md hover:bg-emerald-800 hover:shadow-lg transition duration-300 ease-in-out active:scale-95">
            Kembali
          </button>
        </Link>
      </header>

      <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
        <QoriDropdown setRecitation={setRecitation} />
        <button
          onClick={toggleAudio}
          className="p-3 bg-emerald-700 text-white rounded-full shadow-md hover:bg-emerald-800 transition duration-300 active:scale-95"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <audio ref={audioRef} src={audioUrl || null} onEnded={() => setIsPlaying(false)} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {ayat.map((ayah, index) => {
          const ayatNumber = ayah.verse_key?.split(":")[1];
          return (
            <div
              key={index}
              className="bg-[#f9fdfb] text-gray-900 rounded-2xl shadow-lg p-6 border-t-4 border-emerald-600 hover:scale-105 transition-all duration-300 text-center"
            >
              <p className="text-2xl md:text-3xl text-emerald-800 leading-relaxed mb-4 amiri-font">
                {ayah.text_uthmani}{" "}
                <span className="text-base text-emerald-600 ml-2">
                  ({convertToArabicNumber(ayatNumber)})
                </span>
              </p>
              <p className="text-emerald-700 text-base">
                <span className="font-semibold mr-1">{ayatNumber}.</span>
                <span dangerouslySetInnerHTML={{ __html: terjemah[index]?.text }} />
              </p>
            </div>
          );
        })}
      </div>

      <footer className="text-center mt-10 text-emerald-300 text-sm">
        &copy; 2025 Quran Ayat App by Bima Sakti Franza
      </footer>
    </div>
  );
}

export default Ayat;
