package mx.edu.utez.servicioEscolar.models.solicitante;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "solicitante")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class Solicitante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "matricula", nullable = false, unique = true)
    private String matricula;
    @Column(name = "nombre", nullable = false)
    private String nombre;
    @Column(name = "apellidos", nullable = false)
    private String apellidos;
    @Column(name = "correo", nullable = false, unique = true)
    private String correo;
    @Column(name = "telefono", nullable = false)
    private int telefono;
    @Column(nullable = false, columnDefinition = "tinyint default 1")
    private Boolean status;
}
