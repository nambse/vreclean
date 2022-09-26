import { MemoryRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "./assets/styles/index.css";
import sendAsync from './sendAsync/renderer';

const sqlite3 = require('sqlite3').verbose();

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
  const [message, setMessage] = useState('SELECT * FROM lorem');
  const [response, setResponse] = useState();

  function send(sql) {
    sendAsync(sql).then((result) => setResponse(result));
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
        <button onClick={() => send(message)}>Tıkla</button>
        {(response && JSON.stringify(response, null, 2).replace(/['"]+/g, '')) || 'No query results yet!'}
      </div>
    </div>
  );
};

const NewRafflePage = () => {
  return (
    <div>
      <Header />
      <button onClick={deneme2}>Tıkla</button>
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
