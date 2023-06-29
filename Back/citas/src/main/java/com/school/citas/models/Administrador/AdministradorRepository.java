package com.school.citas.models.Administrador;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Long>{

    Optional<Administrador> findByCorreoAdmin(String correo);
}