package com.school.citas.models.Horario;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.school.citas.models.Ventanilla.Ventanilla;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "horario_ventanilla")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class HorarioVentanilla {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "diaSemana", nullable = false)
    private String diaSemana;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    @Column(name = "horarioInicio", columnDefinition = "datetime", nullable = false)
    private LocalDateTime horarioInicio;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    @Column(name = "horarioFin", columnDefinition = "datetime", nullable = false)
    private LocalDateTime horarioFin;
    @Column(name = "cantidadRepeticiones", nullable = false)
    private int cantidadRepeticiones;
    @Column(name = "status", nullable = false, columnDefinition = "tinyint default 1")
    private boolean status;

    @ManyToOne
    private Ventanilla ventanilla;
}
