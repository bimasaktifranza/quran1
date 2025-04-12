import { BrowserRouter as Router , Routes ,Route } from "react-router-dom"
import App from "./App.jsx";
import Ayat from "./Ayat.jsx";
import JuzsList from "./JuzsList.jsx";
import Juz from "./Juz.jsx";


function Routers () {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/ayat/:id" element={<Ayat />} />
                <Route path="/juz" element={<JuzsList />} />
                <Route path="/juz/:id" element={<Juz />} />
            </Routes>
        </Router>
    )
}

export default Routers