package com.school.citas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.citas.models.Horario.HorarioVentanilla;
import com.school.citas.models.Horario.HorarioVentanillaRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class HorarioVentanillaService {
    @Autowired
    private HorarioVentanillaRepository horarioVentanillaRepository;

    public HorarioVentanilla crearHorarioVentanilla(HorarioVentanilla horarioVentanilla) {
        return horarioVentanillaRepository.save(horarioVentanilla);
    }

    public List<HorarioVentanilla> obtenerTodosLosHorariosVentanilla() {
        return horarioVentanillaRepository.findAll();
    }

    public HorarioVentanilla obtenerHorarioVentanillaPorId(Long id) {
        return horarioVentanillaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Horario de Ventanilla no encontrado"));
    }

    public HorarioVentanilla actualizarHorarioVentanilla(Long horarioVentanillaId, HorarioVentanilla horarioVentanilla) {
        HorarioVentanilla horarioVentanillaExistente = horarioVentanillaRepository.findById(horarioVentanillaId)
                .orElseThrow(() -> new NoSuchElementException("El horario de ventanilla no existe con el ID proporcionado"));
        
        horarioVentanillaExistente.setDiaSemana(horarioVentanilla.getDiaSemana());
        horarioVentanillaExistente.setHorarioInicio(horarioVentanilla.getHorarioInicio());
        horarioVentanillaExistente.setHorarioFin(horarioVentanilla.getHorarioFin());
        horarioVentanillaExistente.setCantidadRepeticiones(horarioVentanilla.getCantidadRepeticiones());
        
        return horarioVentanillaRepository.save(horarioVentanillaExistente);
    }
    
    public void eliminarHorarioVentanilla(Long horarioVentanillaId) {
        if (!horarioVentanillaRepository.existsById(horarioVentanillaId)) {
            throw new NoSuchElementException("Horario Ventanilla no encontrado con el ID: " + horarioVentanillaId);
        }
        horarioVentanillaRepository.deleteById(horarioVentanillaId);
    }

    // Otros métodos según sea necesario
}
