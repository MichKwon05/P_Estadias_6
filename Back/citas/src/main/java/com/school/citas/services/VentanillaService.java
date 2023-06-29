package com.school.citas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.citas.models.Ventanilla.Ventanilla;
import com.school.citas.models.Ventanilla.VentanillaRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class VentanillaService {
    @Autowired
    private VentanillaRepository ventanillaRepository;

    public Ventanilla crearVentanilla(Ventanilla ventanilla) {
        return ventanillaRepository.save(ventanilla);
    }

    public List<Ventanilla> obtenerTodasLasVentanillas() {
        return ventanillaRepository.findAll();
    }

    public Ventanilla obtenerVentanillaPorId(Long id) {
        return ventanillaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Ventanilla no encontrada"));
    }

    public Ventanilla actualizarVentanilla(Long ventanillaId, Ventanilla ventanilla) {
        Ventanilla ventanillaExistente = ventanillaRepository.findById(ventanillaId)
                .orElseThrow(() -> new NoSuchElementException("La Ventanilla no existe con el ID proporcionado"));
        
        ventanillaExistente.setNombreVent(ventanilla.getNombreVent());
        ventanillaExistente.setApePaternoVent(ventanilla.getApePaternoVent());
        ventanillaExistente.setApeMaternoVent(ventanilla.getApeMaternoVent());
        ventanillaExistente.setCorreoElectronico(ventanilla.getCorreoElectronico());
        ventanillaExistente.setPassVent(ventanilla.getPassVent());
        
        return ventanillaRepository.save(ventanillaExistente);
    }

    public Ventanilla marcarBajaDefinitiva(String correo) {
        Ventanilla ventanilla = ventanillaRepository.findByCorreoElectronico(correo)
                .orElseThrow(() -> new NoSuchElementException("Ventanilla no encontrado con el correo: " + correo));

                ventanilla.setStatus(false);

        return ventanillaRepository.save(ventanilla);
    }
    
    public void eliminarVentanilla(Long ventanillaId) {
        if (!ventanillaRepository.existsById(ventanillaId)) {
            throw new NoSuchElementException("Ventanilla no encontrado con el ID: " + ventanillaId);
        }
        ventanillaRepository.deleteById(ventanillaId);
    }

    // Otros métodos según sea necesario
}
