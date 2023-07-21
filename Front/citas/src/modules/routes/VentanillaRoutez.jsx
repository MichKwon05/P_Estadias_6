import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VentanillaNav from '../../shared/components/VentanillaNav';
import MainVentanilla from '../ventanilla/MainVentanilla';
import CitaScreen from '../citas/components/CitaScreen';
import HoraVentScreen from '../horario/HoraVentScreen';
import Animation from '../../shared/plugins/Animation';
import Error from '../../shared/plugins/Error';

const VentanillaRoutez = () => {
    return (
        <BrowserRouter>
            <VentanillaNav />
            <Routes>
                <Route path="/" element={<MainVentanilla />} />
                <Route path="/homeVentanilla" element={<MainVentanilla />} />
                <Route path="/cita" element={<CitaScreen />} />
                <Route path="/horario" element={<HoraVentScreen />} />
                <Route path="/*" element={<Error />} />
            </Routes>
            <Animation />
        </BrowserRouter>
    )
}

export default VentanillaRoutez