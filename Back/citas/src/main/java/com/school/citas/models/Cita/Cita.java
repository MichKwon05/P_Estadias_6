package com.school.citas.models.Cita;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.school.citas.models.Servicio.Servicio;
import com.school.citas.models.Solicitante.Solicitante;
import com.school.citas.models.Ventanilla.Ventanilla;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cita")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Cita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;
    @Column(name = "hora", nullable = false)
    private LocalTime hora;
    @Column(name = "numeroVentanilla", nullable = false)
    private int numeroVentanilla;
    @Column(name = "documentosAnexos", nullable = false)
    private String documentosAnexos;
    @Column(name = "montoPago", nullable = false)
    private double montoPago;
    @Column(name = "atendida", nullable = false, columnDefinition = "tinyint default 1")
    private boolean atendida;

    @ManyToOne
    private Servicio servicio;
    
    @ManyToOne
    private Ventanilla ventanilla;

    @ManyToOne
    @JoinColumn(name = "solicitante_id", nullable = false)
    @JsonBackReference
    private Solicitante solicitante;
}
