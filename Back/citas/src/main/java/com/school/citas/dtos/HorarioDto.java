package com.school.citas.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import com.school.citas.models.Horario.HorarioVentanilla;
import com.school.citas.models.Ventanilla.Ventanilla;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HorarioDto {
    private Long id;
    private String diaSemana;
    private LocalDateTime horarioInicio;
    private LocalDateTime horarioFin;
    private int cantidadRepeticiones;
    private Boolean status;
    private Ventanilla ventanilla;

    public HorarioVentanilla getHorario(){
        return new HorarioVentanilla(
                getId(),
                getDiaSemana(),
                getHorarioInicio(),
                getHorarioFin(),
                getCantidadRepeticiones(),
                getStatus(),
                getVentanilla()
        );
    }
}
