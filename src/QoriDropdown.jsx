import { useEffect, useState } from "react";

function QoriDropdown({ setRecitation }) {
  const [qoriList, setQoriList] = useState([]);
  const [selectedQori, setSelectedQori] = useState("");

  useEffect(() => {
    fetch("https://api.quran.com/api/v4/resources/recitations")
      .then((res) => res.json())
      .then((data) => setQoriList(data.recitations));
  }, []);

  const handleSelect = (e) => {
    const qoriId = e.target.value;
    setSelectedQori(qoriId);
    setRecitation(qoriId);
  };

  return (
    <div className="w-full md:w-64">
      <select
        value={selectedQori}
        onChange={handleSelect}
        className="w-full p-3 bg-white text-emerald-800 border-2 border-emerald-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        <option value="">Pilih Qori</option>
        {qoriList.map((qori) => (
          <option key={qori.id} value={qori.id}>
            {qori.reciter_name} ({qori.style})
          </option>
        ))}
      </select>
    </div>
  );
}

export default QoriDropdown;
