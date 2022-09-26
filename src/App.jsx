import { MemoryRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { read, utils, writeFile } from "xlsx";
import "./assets/styles/index.css";
import { sendQuery, createDB } from "./sendAsync/renderer";

const sqlite3 = require("sqlite3").verbose();

//Header Component

const Header = () => {
  return (
    <nav className="w-full bg-white shadow flex flex-row justify-center">
      <div className="py-3 md:py-5">
        <Link to="/">Ana Sayfa</Link>
        <Link to="/newrafflepage">Yeni Kura</Link>
        <h2 className="text-2xl font-bold text-blue-900">
          TOKİ Kura Uygulaması
        </h2>
      </div>
    </nav>
  );
};

//Anasayfa

const HomePage = () => {
  const [message, setMessage] = useState("SELECT * FROM lorem");
  const [response, setResponse] = useState();

  function send(sql, db) {
    sendQuery(sql, db).then((result) => setResponse(result));
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
            <Link to="/newraffleparameterpage">Yeni Kura</Link>
          </li>
          <li className="flex justify-center">
            <Link to="/excel">Excel</Link>
          </li>
        </ul>
        <button onClick={() => send("SELECT * FROM lorem", "sefa.sqlite3")}>
          Tıkla
        </button>
        {(response &&
          JSON.stringify(response, null, 2).replace(/['"]+/g, "")) ||
          "No query results yet!"}
      </div>
    </div>
  );
};

//Yeni kura sayfası

const NewRafflePage = () => {
  return (
    <div className="flex flex-wrap ">
      <div className="sm:w-1/2 pr-4 pl-4 offset-3">
        <table className="w-full max-w-full mb-4 bg-transparent">
          <thead>
            <tr>
              <th
                className="bg-blue-100 border text-left px-8 py-4"
                scope="col"
              >
                Id
              </th>
              <th
                className="bg-blue-100 border text-left px-8 py-4"
                scope="col"
              >
                Ad
              </th>
              <th
                className="bg-blue-100 border text-left px-8 py-4"
                scope="col"
              >
                Soyad
              </th>
              <th
                className="bg-blue-100 border text-left px-8 py-4"
                scope="col"
              >
                Banka Başvuru No
              </th>
              <th
                className="bg-blue-100 border text-left px-8 py-4"
                scope="col"
              >
                Başvuru Türü
              </th>
              <th
                className="bg-blue-100 border text-left px-8 py-4"
                scope="col"
              >
                TC Kimlik Numarası
              </th>
            </tr>
          </thead>
          <tbody>
            {movies.length ? (
              movies.map((movie, index) => (
                <tr key={index}>
                  <th className="border px-8 py-4" scope="row">
                    {index + 1}
                  </th>
                  <td className="border px-8 py-4">{movie.Ad}</td>
                  <td className="border px-8 py-4">{movie.Soyad}</td>
                  <td className="border px-8 py-4">{movie.Banka}</td>
                  <td className="border px-8 py-4">
                    {
                      movie.Basvuru
                      /* <span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-yellow-500 text-gray-900">
                  {movie.Rating}
                </span>*/
                    }
                  </td>
                  <td className="border px-8 py-4">{movie.Tc}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Dosya seçilmedi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

//Yeni Kura Parametre Sayfası

const NewRaffleParameterPage = () => {
  const [projectName, setProjectName] = useState("");
  const [totalRaffleCount, setTotalRaffleCount] = useState("");
  const [asilRaffleCount, setAsilRaffleCount] = useState("");

  function onChangeProjectName(e) {
    setProjectName(e.target.value);
  }

  function onChangeTotalRaffleCount(e) {
    setTotalRaffleCount(e.target.value);
  }

  function onChangeAsilRaffleCount(e) {
    setAsilRaffleCount(e.target.value);
  }

  return (
    <div>
      <Header />
      <form className="w-full max-w-lg pt-4">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <div className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Proje Adı
            </div>
          </div>
          <div className="md:w-2/3">
            <input
              onChange={onChangeProjectName}
              value={projectName}
              id="inline-projectname"
              type="text"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <div className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Çekilecek Kura Sayısı
            </div>
          </div>
          <div className="md:w-2/3">
            <input
              onChange={onChangeTotalRaffleCount}
              value={totalRaffleCount}
              id="inline-totalrafflecount"
              type="text"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <div className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Asil Hak Sahibi Sayısı
            </div>
          </div>
          <div className="md:w-2/3">
            <input
              onChange={onChangeAsilRaffleCount}
              value={asilRaffleCount}
              id="inline-asilrafflecount"
              type="text"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>
        </div>
        {/*           <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3"></div>
                <label className="md:w-2/3 block text-gray-500 font-bold">
                  <input className="mr-2 leading-tight" type="checkbox"/>
              <span className="text-sm">
                Send me your newsletter!
              </span>
            </label>
  </div> */}
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              onClick={() => {
                createDB(totalRaffleCount, asilRaffleCount, projectName);
              }}
              type="button"
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              Parametreleri Kaydet
            </button>
          </div>
        </div>
      </form>
      <li className="flex justify-center">
        <Link to="/excel">excel page</Link>
      </li>
    </div>
  );
};

//Excel Sayfası

const ExcelPage = () => {
  const [movies, setMovies] = useState([]);

  const handleImport = ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          setMovies(rows);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleExport = () => {
    {
      console.log(movies);
    }
    const headings = [["Ad", "Soyad", "Banka", "Basvuru", "Tc"]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, movies, { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "Movie Report.xlsx");
  };

  return (
    <div>
      <Header />
      <div className="flex flex-wrap mb-2 mt-5">
        <div className="sm:w-1/2 pr-4 pl-4 offset-3">
          <div className="flex flex-wrap ">
            <div className="md:w-1/2 pr-4 pl-4">
              <div className="relative flex items-stretch w-full">
                <div className="custom-file">
                  <input
                    type="file"
                    name="file"
                    className="custom-file-input"
                    id="inputGroupFile"
                    required
                    onChange={handleImport}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  />
                  <label className="custom-file-label" htmlFor="inputGroupFile">
                    Choose file
                  </label>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 pr-4 pl-4">
              <button
                onClick={handleExport}
                className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600 float-right"
              >
                Export <i className="fa fa-download"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap ">
        <div className="sm:w-1/2 pr-4 pl-4 offset-3">
          <table className="w-full max-w-full mb-4 bg-transparent">
            <thead>
              <tr>
                <th
                  className="bg-blue-100 border text-left px-8 py-4"
                  scope="col"
                >
                  Id
                </th>
                <th
                  className="bg-blue-100 border text-left px-8 py-4"
                  scope="col"
                >
                  Ad
                </th>
                <th
                  className="bg-blue-100 border text-left px-8 py-4"
                  scope="col"
                >
                  Soyad
                </th>
                <th
                  className="bg-blue-100 border text-left px-8 py-4"
                  scope="col"
                >
                  Banka Başvuru No
                </th>
                <th
                  className="bg-blue-100 border text-left px-8 py-4"
                  scope="col"
                >
                  Başvuru Türü
                </th>
                <th
                  className="bg-blue-100 border text-left px-8 py-4"
                  scope="col"
                >
                  TC Kimlik Numarası
                </th>
              </tr>
            </thead>
            <tbody>
              {movies.length ? (
                movies.map((movie, index) => (
                  <tr key={index}>
                    <th className="border px-8 py-4" scope="row">
                      {index + 1}
                    </th>
                    <td className="border px-8 py-4">{movie.Ad}</td>
                    <td className="border px-8 py-4">{movie.Soyad}</td>
                    <td className="border px-8 py-4">{movie.Banka}</td>
                    <td className="border px-8 py-4">
                      {
                        movie.Basvuru
                        /* <span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-yellow-500 text-gray-900">
                        {movie.Rating}
                      </span>*/
                      }
                    </td>
                    <td className="border px-8 py-4">{movie.Tc}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    Dosya seçilmedi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

//Main render ve route

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/newraffleparameterpage"
          element={<NewRaffleParameterPage />}
        />
        <Route path="/excel" element={<ExcelPage />} />
        <Route path="/newrafflepage" element={<NewRafflePage />} />
      </Routes>
    </Router>
  );
}
