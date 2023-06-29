package com.school.citas.models.Solicitante;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@Table(name = "solicitante")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Solicitante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nombre", nullable = false)
    private String nombre;
    @Column(name = "apePaterno", nullable = false)
    private String apePaterno;
    @Column(name = "apeMaterno") //No todos tienen dos apellidos
    private String apeMaterno;
    @Column(name = "matricula", nullable = false)
    private String matricula;
    @Column(name = "carrera", nullable = false)
    private String carrera;
    @Column(name = "correoElectronico", nullable = false, unique = true)
    private String correoElectronico;
    @Column(name = "pass", nullable = false)
    private String pass;
    @Column(name = "telefono", nullable = false)
    private String telefono;
    @Column(name = "status", nullable = false, columnDefinition = "tinyint default 1")
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = false)
    @JsonBackReference
    private Administrador admin;

    @OneToMany(mappedBy = "solicitante")
    @JsonManagedReference
    private List<Cita> citas;
}
