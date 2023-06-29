package com.school.citas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.citas.models.Solicitante.Solicitante;
import com.school.citas.models.Solicitante.SolicitanteRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class SolicitanteService {
    @Autowired
    private SolicitanteRepository solicitanteRepository;

    public Solicitante crearSolicitante(Solicitante solicitante) {
        return solicitanteRepository.save(solicitante);
    }

    public List<Solicitante> obtenerTodosLosSolicitantes() {
        return solicitanteRepository.findAll();
    }

    public Solicitante obtenerSolicitantePorId(Long id) {
        return solicitanteRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Solicitante no encontrado"));
    }

    public Solicitante actualizarSolicitante(Long solicitanteId, Solicitante solicitante) {
        Solicitante solicitanteExistente = solicitanteRepository.findById(solicitanteId)
                .orElseThrow(() -> new NoSuchElementException("El solicitante no existe con el ID proporcionado"));
        
        solicitanteExistente.setNombre(solicitante.getNombre());
        solicitanteExistente.setApePaterno(solicitante.getApePaterno());
        solicitanteExistente.setApeMaterno(solicitante.getApeMaterno());
        solicitanteExistente.setMatricula(solicitante.getMatricula());
        solicitanteExistente.setCarrera(solicitante.getCarrera());
        solicitanteExistente.setCorreoElectronico(solicitante.getCorreoElectronico());
        solicitanteExistente.setTelefono(solicitante.getTelefono());
        solicitanteExistente.setPass(solicitante.getPass());

        
        return solicitanteRepository.save(solicitanteExistente);
    }

    public Solicitante marcarBajaDefinitiva(String correo) {
        Solicitante solicitante = solicitanteRepository.findByCorreoElectronico(correo)
                .orElseThrow(() -> new NoSuchElementException("Solicitante no encontrado con el correo: " + correo));

                solicitante.setStatus(false);

        return solicitanteRepository.save(solicitante);
    }
    
    public void eliminarSolicitante(Long solicitanteId) {
        if (!solicitanteRepository.existsById(solicitanteId)) {
            throw new NoSuchElementException("Solicitante no encontrado con el ID: " + solicitanteId);
        }
        solicitanteRepository.deleteById(solicitanteId);
    }

    // Otros métodos según sea necesario
}
