package com.school.citas.models.Solicitante;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitanteRepository extends JpaRepository<Solicitante, Long> {
    Optional<Solicitante> findByCorreoElectronico(String correo);
}
