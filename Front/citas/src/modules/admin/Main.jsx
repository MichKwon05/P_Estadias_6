import React from 'react'
import { useNavigate } from 'react-router-dom';// Importa el hook useHistory para la navegación
import { FaUser, FaFileSignature } from 'react-icons/fa';
import '../../shared/plugins/Main.css'

import { CloudWaveEffect } from "react-background-animation";

const Main = () => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate('/user');
  };

  const handleServiceClick = () => {
    navigate('/service');
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
            <button className="btn" onClick={handleUserClick}>
              Usuario
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
            <button className="btn" onClick={handleServiceClick}>
              Servicio
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main