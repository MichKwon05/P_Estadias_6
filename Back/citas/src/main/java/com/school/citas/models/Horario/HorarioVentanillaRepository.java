package com.school.citas.models.Horario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HorarioVentanillaRepository extends JpaRepository<HorarioVentanilla, Long> {
}
