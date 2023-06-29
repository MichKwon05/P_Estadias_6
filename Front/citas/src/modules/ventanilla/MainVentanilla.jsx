import React from 'react'
import { useNavigate } from 'react-router-dom';// Importa el hook useHistory para la navegación
import { FaUser, FaFileSignature } from 'react-icons/fa';
import '../../shared/plugins/Main.css'

const MainVentanilla = () => {
    const navigate = useNavigate();

    const handleCitaClick = () => {
        navigate('/cita');
    };

    const handleHorarioClick = () => {
        navigate('/horario');
    };

    return (
        <>
            <div className="main-screen" style={{ marginTop: '-70px', position: 'relative', zIndex: 1 }}>
                <div className="circle-wrapper">
                    <div className="circle">
                        <div className="circle-icon-wrapper mb-4">
                            <div className="inner-circle">
                                <FaUser className="circle-icon" />
                            </div>
                        </div>
                        <button className="btn" onClick={handleCitaClick}>
                            CITA
                        </button>
                    </div>
                </div>
                <div className="circle-wrapper">
                    <div className="circle">
                        <div className="circle-icon-wrapper mb-4">
                            <div className="inner-circle">
                                <FaFileSignature className="circle-icon" />
                            </div>
                        </div>
                        <button className="btn" onClick={handleHorarioClick}>
                            HORARIO
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainVentanilla