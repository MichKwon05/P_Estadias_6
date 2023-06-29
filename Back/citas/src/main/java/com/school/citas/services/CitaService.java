package com.school.citas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.citas.models.Cita.Cita;
import com.school.citas.models.Cita.CitaRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CitaService {
    @Autowired
    private CitaRepository citaRepository;

    public CitaService(CitaRepository citaRepository) {
        this.citaRepository = citaRepository;
    }

    public Cita crearCita(Cita cita) {
        return citaRepository.save(cita);
    }

    public List<Cita> obtenerTodasLasCitas() {
        return citaRepository.findAll();
    }

    public Cita obtenerCitaPorId(Long id) {
        return citaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Cita no encontrada"));
    }

    public Cita actualizarCita(Long citaId, Cita cita) {
        Cita citaExistente = citaRepository.findById(citaId)
                .orElseThrow(() -> new NoSuchElementException("La Cita no existe con el ID proporcionado"));
        
        citaExistente.setFecha(cita.getFecha());
        citaExistente.setHora(cita.getHora());
        citaExistente.setNumeroVentanilla(cita.getNumeroVentanilla());
        citaExistente.setDocumentosAnexos(cita.getDocumentosAnexos());
        citaExistente.setMontoPago(cita.getMontoPago());
        
        return citaRepository.save(citaExistente);
    }

    public Cita marcarCitaComoAtendida(Long id) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Cita no encontrada con el ID: " + id));

        cita.setAtendida(false); // Supongamos que tenemos un campo 'atendida' en la entidad Cita

        return citaRepository.save(cita);
    }
    
    public void eliminarCita(Long citaId) {
        if (!citaRepository.existsById(citaId)) {
            throw new NoSuchElementException("Cita no encontrada con el ID: " + citaId);
        }
        citaRepository.deleteById(citaId);
    }

    // Otros métodos según sea necesario
}
