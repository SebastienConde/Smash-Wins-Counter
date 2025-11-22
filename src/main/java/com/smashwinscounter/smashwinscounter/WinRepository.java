package com.smashwinscounter.smashwinscounter;

import com.smashwinscounter.smashwinscounter.Win;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WinRepository extends JpaRepository<Win, Long> {
    // Custom queries, only for methods that query the db

    @Query("SELECT COUNT(w) FROM Win w WHERE w.winningPlayer = :player")
    int countWinsByPlayer(@Param("player") String player);

    @Query("SELECT COUNT(w) FROM Win w WHERE w.losingPlayer = :player")
    int countLossesByPlayer(@Param("player") String player);

    @Query("SELECT COUNT(w) FROM Win w WHERE w.winningPlayer = :player1 AND w.losingPlayer = :player2")
    int winsAgainstPlayer(@Param("player1") String player1, @Param("player2") String player2);

    @Query("SELECT COUNT(w) FROM Win w WHERE (w.winningPlayer = :player1 AND w.losingPlayer = :player2) " +
            "OR (w.winningPlayer = :player2 AND w.losingPlayer = :player1)")
    int totalMatchesBetween(@Param("player1") String player1, @Param("player2") String player2);
}
