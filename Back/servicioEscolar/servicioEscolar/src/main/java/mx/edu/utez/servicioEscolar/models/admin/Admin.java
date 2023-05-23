package mx.edu.utez.servicioEscolar.models.admin;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "admin")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class Admin {

    /*Nombre completo
● Número de empleado
● Correo electrónico
*/

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nombre", nullable = false)
    private String nombre;
    @Column(name = "apellidos", nullable = false)
    private String apellidos;
    @Column(name = "correo", nullable = false, unique = true)
    private String correo;
    @Column(name = "password", nullable = false)
    private String password;

    @Column(nullable = false, columnDefinition = "tinyint default 1")
    private Boolean status;

}
