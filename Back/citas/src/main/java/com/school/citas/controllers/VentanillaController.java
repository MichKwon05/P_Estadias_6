package com.school.citas.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.school.citas.models.Ventanilla.Ventanilla;
import com.school.citas.services.VentanillaService;
import com.school.citas.utils.CustomResponse;

import java.util.List;

@RestController
@RequestMapping("/api/ventanilla/")
@CrossOrigin(origins = {"*"})
public class VentanillaController {
    @Autowired
    private VentanillaService ventanillaService;

    @PostMapping("/")
    public ResponseEntity<Ventanilla> crearVentanilla(@RequestBody Ventanilla ventanilla) {
        Ventanilla nuevaVentanilla = ventanillaService.crearVentanilla(ventanilla);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaVentanilla);
    }

    @GetMapping("/")
    public ResponseEntity<List<Ventanilla>> obtenerTodasLasVentanillas() {
        List<Ventanilla> ventanillas = ventanillaService.obtenerTodasLasVentanillas();
        return ResponseEntity.ok(ventanillas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ventanilla> obtenerVentanillaPorId(@PathVariable Long id) {
        Ventanilla ventanilla = ventanillaService.obtenerVentanillaPorId(id);
        return ResponseEntity.ok(ventanilla);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ventanilla> actualizarVentanilla(@PathVariable Long id, @RequestBody Ventanilla ventanilla) {
        Ventanilla ventanillaActualizado = ventanillaService.actualizarVentanilla(id, ventanilla);
        return new ResponseEntity<>(ventanillaActualizado, HttpStatus.OK);
    }

    @PatchMapping("/{user}")
    public ResponseEntity<Ventanilla> marcarBajaDefinitiva(@PathVariable String user) {
        Ventanilla bajaVentanilla = ventanillaService.marcarBajaDefinitiva(user);
        return new ResponseEntity<>(bajaVentanilla, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarVentanilla(@PathVariable Long id) {
        ventanillaService.eliminarVentanilla(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Otros endpoints según sea necesario

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CustomResponse> handleException(Exception ex) {
        CustomResponse response = new CustomResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
