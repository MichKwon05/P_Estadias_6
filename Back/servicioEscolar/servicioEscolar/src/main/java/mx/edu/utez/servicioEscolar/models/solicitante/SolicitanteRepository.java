package mx.edu.utez.servicioEscolar.models.solicitante;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
//Modelo al que hago referencia
public interface SolicitanteRepository  extends JpaRepository<Solicitante, Long> {
}
