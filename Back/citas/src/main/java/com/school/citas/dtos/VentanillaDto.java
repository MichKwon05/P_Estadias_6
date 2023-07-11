package com.school.citas.dtos;

import com.school.citas.models.Administrador.Administrador;
import com.school.citas.models.Cita.Cita;
import com.school.citas.models.Ventanilla.Ventanilla;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VentanillaDto {

    private Long id;
    private String nombre;
    private String apePaterno;
    private String apeMaterno;
    @NotEmpty(message = "Campo Obligatorio")
    private String correo;
    @NotEmpty(message = "Campo Obligatorio")
    @Length(min = 1, max = 20)
    private String pass;
    private Boolean status;
    private Boolean changePassword;

    private List<Cita> citas;
    private Administrador admin;

    public Ventanilla getVentanilla(){
        return new Ventanilla(
                getId(),
                getNombre(),
                getApePaterno(),
                getApeMaterno(),
                getCorreo(),
                getPass(),
                getStatus(),
                getChangePassword(),
                getCitas(),
                getAdmin()
        );
    }
}