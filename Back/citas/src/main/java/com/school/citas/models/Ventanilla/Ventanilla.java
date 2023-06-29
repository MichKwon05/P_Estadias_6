package com.school.citas.models.Ventanilla;

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
@Table(name = "ventanilla")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Ventanilla {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nombreVent", nullable = false)
    private String nombreVent;
    @Column(name = "apePaternoVent", nullable = false)
    private String apePaternoVent;
    @Column(name = "apeMaternoVent")
    private String apeMaternoVent;
    @Column(name = "correoElectronico", nullable = false, unique = true)
    private String correoElectronico;
    @Column(name = "passVent", nullable = false)
    private String passVent;
    @Column(name = "status", nullable = false, columnDefinition = "tinyint default 1")
    private boolean status;

    @OneToMany(mappedBy = "ventanilla")
    private List<Cita> citas;

    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = false)
    @JsonBackReference
    private Administrador admin;
}
