package mx.edu.utez.servicioEscolar.models.ventanilla;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VentanillaRepository extends JpaRepository<Ventanilla, Long> {
}
