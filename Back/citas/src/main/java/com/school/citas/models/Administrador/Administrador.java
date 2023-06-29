package com.school.citas.models.Administrador;

import java.util.List;

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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "administrador")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Administrador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nombreAdmin", nullable = false)
    private String nombreAdmin;
    @Column(name = "apeMaternoAdmin", nullable = false)
    private String apeMaternoAdmin;
    @Column(name = "apePaternoAdmin") //No todos tienen dos apellidos
    private String apePaternoAdmin;
    @Column(name = "correoAdmin", nullable = false, unique = true)
    private String correoAdmin;
    @Column(name = "pass", nullable = false)
    private String pass;
    @Column(name = "status", nullable = false, columnDefinition = "tinyint default 1")
    private boolean status;

        ///Gestiona Ventanillas
        @OneToMany(mappedBy = "admin")
        private List<Ventanilla> ventanillas;
    
        ///Gestiona solicitantes
        @OneToMany(mappedBy = "admin")
        private List<Solicitante> solicitantes;
    
        ///Gestiona servicios
        @OneToMany(mappedBy = "admin")
        private List<Servicio> servicios;

}
