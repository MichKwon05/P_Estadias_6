package com.school.citas.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.school.citas.models.Horario.HorarioVentanilla;
import com.school.citas.services.HorarioVentanillaService;
import com.school.citas.utils.CustomResponse;

import java.util.List;

@RestController
@RequestMapping("/api/horarios-ventanilla/")
@CrossOrigin(origins = {"*"})
public class HorarioVentanillaController {
    @Autowired
    private HorarioVentanillaService horarioVentanillaService;

    @PostMapping("/")
    public ResponseEntity<HorarioVentanilla> crearHorarioVentanilla(@RequestBody HorarioVentanilla horarioVentanilla) {
        HorarioVentanilla nuevoHorarioVentanilla = horarioVentanillaService.crearHorarioVentanilla(horarioVentanilla);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoHorarioVentanilla);
    }

    @GetMapping("/")
    public ResponseEntity<List<HorarioVentanilla>> obtenerTodosLosHorariosVentanilla() {
        List<HorarioVentanilla> horariosVentanilla = horarioVentanillaService.obtenerTodosLosHorariosVentanilla();
        return ResponseEntity.ok(horariosVentanilla);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HorarioVentanilla> obtenerHorarioVentanillaPorId(@PathVariable Long id) {
        HorarioVentanilla horarioVentanilla = horarioVentanillaService.obtenerHorarioVentanillaPorId(id);
        return ResponseEntity.ok(horarioVentanilla);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HorarioVentanilla> actualizarHorarioVentanilla(@PathVariable Long id, @RequestBody HorarioVentanilla horarioVentanilla) {
        HorarioVentanilla horarioVentanillaActualizado =  horarioVentanillaService.actualizarHorarioVentanilla(id, horarioVentanilla);
        return new ResponseEntity<>(horarioVentanillaActualizado, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarHorarioVentanilla(@PathVariable Long id) {
        horarioVentanillaService.eliminarHorarioVentanilla(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Otros endpoints según sea necesario

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CustomResponse> handleException(Exception ex) {
        CustomResponse response = new CustomResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
