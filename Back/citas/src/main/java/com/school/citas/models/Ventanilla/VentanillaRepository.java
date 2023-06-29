package com.school.citas.models.Ventanilla;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VentanillaRepository extends JpaRepository<Ventanilla, Long> {

    Optional<Ventanilla> findByCorreoElectronico(String correo);
}
