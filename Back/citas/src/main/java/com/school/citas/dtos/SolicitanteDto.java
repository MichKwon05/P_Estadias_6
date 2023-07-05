package com.school.citas.dtos;

import com.school.citas.models.Administrador.Administrador;
import com.school.citas.models.Cita.Cita;
import com.school.citas.models.Solicitante.Solicitante;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SolicitanteDto {

    private Long id;
    private String nombre;
    private String apePaterno;
    private String apeMaterno;
    private String matricula;
    private String carrera;
    @NotEmpty(message = "Campo Obligatorio")
    private String correo;
    @NotEmpty(message = "Campo Obligatorio")
    @Length(min = 1, max = 20)
    private String passwordSoli;
    private String telefono;
    private Boolean status;
    private Boolean changePassword;

    private Administrador admin;
    private List<Cita> citas;

    public Solicitante getSolicitante(){
        return new Solicitante(
                getId(),
                getNombre(),
                getApePaterno(),
                getApeMaterno(),
                getMatricula(),
                getCorreo(),
                getCarrera(),
                getPasswordSoli(),
                getTelefono(),
                getStatus(),
                getChangePassword(),
                getAdmin(),
                getCitas()
        );
    }


}
