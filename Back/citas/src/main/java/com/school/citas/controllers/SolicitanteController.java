package com.school.citas.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.school.citas.models.Solicitante.Solicitante;
import com.school.citas.services.SolicitanteService;
import com.school.citas.utils.CustomResponse;

import java.util.List;

@RestController
@RequestMapping("/api/solicitante/")
@CrossOrigin(origins = {"*"})
public class SolicitanteController {
    @Autowired
    private SolicitanteService solicitanteService;

    @PostMapping("/")
    public ResponseEntity<Solicitante> crearSolicitante(@RequestBody Solicitante solicitante) {
        Solicitante nuevoSolicitante = solicitanteService.crearSolicitante(solicitante);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoSolicitante);
    }

    @GetMapping("/")
    public ResponseEntity<List<Solicitante>> obtenerTodosLosSolicitantes() {
        List<Solicitante> solicitantes = solicitanteService.obtenerTodosLosSolicitantes();
        return ResponseEntity.ok(solicitantes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Solicitante> obtenerSolicitantePorId(@PathVariable Long id) {
        Solicitante solicitante = solicitanteService.obtenerSolicitantePorId(id);
        return ResponseEntity.ok(solicitante);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Solicitante> actualizarSolicitante(@PathVariable Long id, @RequestBody Solicitante solicitante) {
        Solicitante solicitanteActualizado =  solicitanteService.actualizarSolicitante(id, solicitante);
        return new ResponseEntity<>(solicitanteActualizado, HttpStatus.OK);
    }

    @PatchMapping("/{user}")
    public ResponseEntity<Solicitante> marcarBajaDefinitiva(@PathVariable String user) {
        Solicitante bajaVentanilla = solicitanteService.marcarBajaDefinitiva(user);
        return new ResponseEntity<>(bajaVentanilla, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarSolicitante(@PathVariable Long id) {
        solicitanteService.eliminarSolicitante(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Otros endpoints según sea necesario

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CustomResponse> handleException(Exception ex) {
        CustomResponse response = new CustomResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
