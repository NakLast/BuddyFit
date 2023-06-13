import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Layout from "./components/Layout";
import NoPage from "./components/NoPage";
import SitUp from "./components/pages/SitUp";
import PushUp from "./components/pages/PushUp";
import Squat from "./components/pages/Squat";

export default function App() {
    return (
        <div>
            <Layout />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/situp" element={<SitUp />} />
                <Route path="/squat" element={<Squat />} />
                <Route path="/pushup" element={<PushUp />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </div >
    );
}
