package com.school.citas.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.school.citas.models.Administrador.Administrador;
import com.school.citas.services.AdminService;
import com.school.citas.utils.CustomResponse;

import java.util.List;

@RestController
@RequestMapping("/api/administrador/")
@CrossOrigin(origins = {"*"})
public class AdminController {
    @Autowired
    private AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/")
    public ResponseEntity<Administrador> crearCita(@RequestBody Administrador admin) {
        Administrador nuevaCita = adminService.crearAdministrador(admin);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaCita);
    }

    @GetMapping("/")
    public ResponseEntity<List<Administrador>> obtenerTodosLosAdministradores() {
        List<Administrador> admins = adminService.obtenerTodosLosAdministradores();
        return ResponseEntity.ok(admins);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Administrador> obtenerAdministradorPorId(@PathVariable Long id) {
        Administrador cita = adminService.obtenerAdministradorPorId(id);
        return ResponseEntity.ok(cita);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Administrador> actualizarAdministrador(@PathVariable Long id, @RequestBody Administrador solicitante) {
        Administrador solicitanteActualizado =  adminService.actualizarAdministrador(id, solicitante);
        return new ResponseEntity<>(solicitanteActualizado, HttpStatus.OK);
    }

    @PatchMapping("/{user}")
    public ResponseEntity<Administrador> marcarBajaDefinitiva(@PathVariable String user) {
        Administrador administradorBaja = adminService.marcarBajaDefinitiva(user);
        return new ResponseEntity<>(administradorBaja, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarSolicitante(@PathVariable Long id) {
        adminService.eliminarAdministrador(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Otros endpoints según sea necesario

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CustomResponse> handleException(Exception ex) {
        CustomResponse response = new CustomResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
