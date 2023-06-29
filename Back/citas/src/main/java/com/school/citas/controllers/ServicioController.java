package com.school.citas.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.school.citas.models.Servicio.Servicio;
import com.school.citas.services.ServicioService;
import com.school.citas.utils.CustomResponse;

import java.util.List;

@RestController
@RequestMapping("/api/servicios/")
@CrossOrigin(origins = {"*"})
public class ServicioController {
    @Autowired
    private ServicioService servicioService;

    @PostMapping("/")
    public ResponseEntity<Servicio> crearServicio(@RequestBody Servicio servicio) {
        Servicio nuevoServicio = servicioService.crearServicio(servicio);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoServicio);
    }

    @GetMapping("/")
    public ResponseEntity<List<Servicio>> obtenerTodosLosServicios() {
        List<Servicio> servicios = servicioService.obtenerTodosLosServicios();
        return ResponseEntity.ok(servicios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servicio> obtenerServicioPorId(@PathVariable Long id) {
        Servicio servicio = servicioService.obtenerServicioPorId(id);
        return ResponseEntity.ok(servicio);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servicio> actualizarServicio(@PathVariable Long id, @RequestBody Servicio servicio) {
        Servicio servicioActualizado = servicioService.actualizarServicio(id, servicio);
        return new ResponseEntity<>(servicioActualizado, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarServicio(@PathVariable Long id) {
        servicioService.eliminarServicio(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    // Otros endpoints según sea necesario

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CustomResponse> handleException(Exception ex) {
        CustomResponse response = new CustomResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
