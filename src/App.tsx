import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // ✅ HashRouter yerine BrowserRouter kullan
import "./App.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Menu from "./component/Container/Menu";
import ScrollTop from "./component/Buttons/ScrollTop";

const MainPage = lazy(() => import("./pages/Main/MainPage"));
const List = lazy(() => import("./pages/AllView/List"));
const Project = lazy(() => import("./pages/AllView/Project"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const AdminPage = lazy(() => import("./pages/AdminPanel/AdminPage")); // ✅ Lazy Load ile Admin Page

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Helmet>
          <title>x Photographer</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="title" content="x Photographer" />
        </Helmet>
        <div className="App">
          <Suspense fallback={<div>loading . . .</div>}>
            <Menu />
            <ScrollTop />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/list" element={<List />} />
              <Route path="/list/:category/:title" element={<Project />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminPage />} /> {/* ✅ Admin Route Düzeltilmiş */}
            </Routes>
          </Suspense>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
