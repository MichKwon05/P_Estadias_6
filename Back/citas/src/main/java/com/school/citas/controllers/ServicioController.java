package com.school.citas.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.school.citas.dtos.ServicioDto;
import com.school.citas.models.Servicio.Servicio;
import com.school.citas.services.ServicioService;
import com.school.citas.utils.CustomResponse;

import java.util.List;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/servicios")
@CrossOrigin(origins = {"*"})
public class ServicioController {
    @Autowired
    private ServicioService servicioService;

    @GetMapping("/")
    public ResponseEntity<CustomResponse<List<Servicio>>> getAll(){
        return new ResponseEntity<>(
                this.servicioService.getAll(),
                HttpStatus.OK
        );
    }

    @GetMapping("/getActive")
    public ResponseEntity<CustomResponse<List<Servicio>>>
    getAllActive(){
        return new ResponseEntity<>(
                this.servicioService.getAllActive(),
                HttpStatus.OK
        );
    }

    @GetMapping("/getAllInactive")
    public ResponseEntity<CustomResponse<List<Servicio>>>
    getAllInactive(){
        return new ResponseEntity<>(
                this.servicioService.getAllInactive(),
                HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomResponse<Servicio>> getOne(@PathVariable("id") Long id) {
        return new ResponseEntity<>(
                this.servicioService.getOne(id),
                HttpStatus.OK
        );
    }

    @PostMapping("/")
    public ResponseEntity<CustomResponse<Servicio>> insert(
            @RequestBody @Valid ServicioDto servicioDto,
            @Valid BindingResult result
    ){
        if (result.hasErrors()){
            return new ResponseEntity<>(
                    null,
                    HttpStatus.BAD_REQUEST
            );
        }
        return new ResponseEntity<>(
                this.servicioService.insert(servicioDto.getServicio()),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomResponse<Servicio>> update(
            @RequestBody ServicioDto servicioDto,
            @Valid BindingResult result){
        if (result.hasErrors()){
            return new ResponseEntity<>(
                    null,
                    HttpStatus.BAD_REQUEST
            );
        }
        return new ResponseEntity<>(
                this.servicioService.update(servicioDto.getServicio()),
                HttpStatus.CREATED
        );
    }

    @PatchMapping("/")
    public ResponseEntity<CustomResponse<Boolean>> enableOrDisable(
            @RequestBody ServicioDto servicioDto
    ){
        return new ResponseEntity<>(
                this.servicioService.changeStatus(servicioDto.getServicio()),
                HttpStatus.OK
        );
    }
}
