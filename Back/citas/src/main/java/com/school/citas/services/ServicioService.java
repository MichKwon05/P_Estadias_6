package com.school.citas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.citas.models.Servicio.Servicio;
import com.school.citas.models.Servicio.ServicioRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ServicioService {
    @Autowired
    private ServicioRepository servicioRepository;

    public Servicio crearServicio(Servicio servicio) {
        return servicioRepository.save(servicio);
    }
    
    public List<Servicio> obtenerTodosLosServicios() {
        return servicioRepository.findAll();
    }
    
    public Servicio obtenerServicioPorId(Long id) {
        return servicioRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Servicio no encontrado"));
    }
    
    public Servicio actualizarServicio(Long servicioId, Servicio servicio) {
        Servicio servicioExistente = servicioRepository.findById(servicioId)
                .orElseThrow(() -> new NoSuchElementException("El servicio no existe con el ID proporcionado"));
        
        servicioExistente.setNombre(servicio.getNombre());
        servicioExistente.setDescripcion(servicio.getDescripcion());
        servicioExistente.setDocumentosRequeridos(servicio.getDocumentosRequeridos());
        servicioExistente.setCosto(servicio.getCosto());
        
        return servicioRepository.save(servicioExistente);
    }
    
    public void eliminarServicio(Long servicioId) {
        if (!servicioRepository.existsById(servicioId)) {
            throw new NoSuchElementException("Servicio no encontrado con el ID: " + servicioId);
        }
        servicioRepository.deleteById(servicioId);
    }
    
    // Otros métodos relacionados con la gestión de servicios
}
