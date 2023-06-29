package com.school.citas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.citas.models.Administrador.Administrador;
import com.school.citas.models.Administrador.AdministradorRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class AdminService {
    @Autowired
    private AdministradorRepository adminRepository;

    public Administrador crearAdministrador(Administrador servicio) {

        return adminRepository.save(servicio);

    }

    public List<Administrador> obtenerTodosLosAdministradores() {
        return adminRepository.findAll();
    }
    
    public Administrador obtenerAdministradorPorId(Long id) {
        return adminRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Administrador no encontrado"));
    }
    
    public Administrador actualizarAdministrador(Long servicioId, Administrador servicio) {
        Administrador servicioExistente = adminRepository.findById(servicioId)
                .orElseThrow(() -> new NoSuchElementException("El Administrador no existe con el ID proporcionado"));
        
        servicioExistente.setNombreAdmin(servicio.getNombreAdmin());
        servicioExistente.setApePaternoAdmin(servicio.getApePaternoAdmin());
        servicioExistente.setApeMaternoAdmin(servicio.getApeMaternoAdmin());
        servicioExistente.setCorreoAdmin(servicio.getCorreoAdmin());
        servicioExistente.setPass(servicio.getPass());
        
        return adminRepository.save(servicioExistente);
    }

    public Administrador marcarBajaDefinitiva(String correo) {
        Administrador administrador = adminRepository.findByCorreoAdmin(correo)
                .orElseThrow(() -> new NoSuchElementException("Administrador no encontrado con el correo: " + correo));

        administrador.setStatus(false);

        return adminRepository.save(administrador);
    }
    
    public void eliminarAdministrador(Long servicioId) {
        if (!adminRepository.existsById(servicioId)) {
            throw new NoSuchElementException("Administrador no encontrado con el ID: " + servicioId);
        }
        adminRepository.deleteById(servicioId);
    }
    
    // Otros métodos relacionados con la gestión de servicios
}
