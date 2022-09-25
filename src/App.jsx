import { MemoryRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { ipcRenderer } from "electron";
import "./assets/styles/index.css";

const Header = () => {
  return (
    <nav className="w-full bg-white shadow flex flex-row justify-center">
      <div className="py-3 md:py-5">
      <Link to="/">Ana Sayfa</Link>
        <h2 className="text-2xl font-bold text-blue-900">
          TOKİ Kura Uygulaması
        </h2>
      </div>
    </nav>
  );
};

const Home = () => {
  const deneme = () => {
    ipcRenderer.send("key", "sefa")
  }
  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="py-20 w-full h-full">
        <ul className="flex flex-col justify-center">
          <li className="flex justify-center">
            <Link to="/oldraffles">Geçmiş Kuralar</Link>
          </li>
          <li className="flex justify-center">
            <Link to="/newrafflepage">Yeni Kura</Link>
          </li>
        </ul>
        <button onClick={deneme}>Tıkla</button>
      </div>
    </div>
  );
};

const NewRafflePage = () => {
  const deneme = () => {
    ipcRenderer.send("key", "value")
  }
  return (
    <div>
      <Header />
      <button onClick={deneme}>Tıkla</button>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newrafflepage" element={<NewRafflePage />} />
      </Routes>
    </Router>
  );
}
