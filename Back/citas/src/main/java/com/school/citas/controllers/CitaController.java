package com.school.citas.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.school.citas.models.Cita.Cita;
import com.school.citas.services.CitaService;
import com.school.citas.utils.CustomResponse;

import java.util.List;

@RestController
@RequestMapping("/api/citas/")
@CrossOrigin(origins = {"*"})
public class CitaController {
    @Autowired
    private CitaService citaService;

    public CitaController(CitaService citaService) {
        this.citaService = citaService;
    }

    @PostMapping("/")
    public ResponseEntity<Cita> crearCita(@RequestBody Cita cita) {
        Cita nuevaCita = citaService.crearCita(cita);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaCita);
    }

    @GetMapping("/")
    public ResponseEntity<List<Cita>> obtenerTodasLasCitas() {
        List<Cita> citas = citaService.obtenerTodasLasCitas();
        return ResponseEntity.ok(citas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cita> obtenerCitaPorId(@PathVariable Long id) {
        Cita cita = citaService.obtenerCitaPorId(id);
        return ResponseEntity.ok(cita);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cita> actualizarSolicitante(@PathVariable Long id, @RequestBody Cita solicitante) {
        Cita solicitanteActualizado =  citaService.actualizarCita(id, solicitante);
        return new ResponseEntity<>(solicitanteActualizado, HttpStatus.OK);
    }

    @PatchMapping("/{id}/atendida")
    public ResponseEntity<Cita> marcarCitaComoAtendida(@PathVariable Long id) {
        Cita citaAtendida = citaService.marcarCitaComoAtendida(id);
        return new ResponseEntity<>(citaAtendida, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCita(@PathVariable Long id) {
        citaService.eliminarCita(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Otros endpoints según sea necesario

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CustomResponse> handleException(Exception ex) {
        CustomResponse response = new CustomResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
