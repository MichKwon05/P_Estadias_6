package com.school.citas.models.Servicio;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.school.citas.models.Administrador.Administrador;
import com.school.citas.models.Cita.Cita;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "servicio")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Servicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nombre", nullable = false)
    private String nombre;
    @Column(name = "descripcion", nullable = false)
    private String descripcion;
    @Column(name = "documentosRequeridos", nullable = false)
    private String documentosRequeridos;
    @Column(name = "costo", nullable = false)
    private double costo;
    @Column(name = "status", nullable = false, columnDefinition = "tinyint default 1")
    private boolean status;

    @OneToMany(mappedBy = "servicio")
    private List<Cita> citas;

    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = false)
    @JsonBackReference
    private Administrador admin;
}
