import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { GlobalProvider } from "./context/GlobalState";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Movies from "./components/Movies";
import Watched from "./components/Watched";
import WatchList from "./components/WatchList";

function App() {
  const { isLoading, isAuthenticated } = useAuth0();

  ///////////////////////////////
  if (isLoading)
    return (
      <img
        className="loading"
        alt="loading"
        src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b6e0b072897469.5bf6e79950d23.gif"
      />
    );

  /////////////////////////////

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/watched"
            element={isAuthenticated ? <Watched /> : <Movies to="/" />}
          ></Route>
          <Route
            path="/watchlist"
            element={isAuthenticated ? <WatchList /> : <Movies to="/" />}
          ></Route>
          <Route path="/" element={<Movies />}></Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
