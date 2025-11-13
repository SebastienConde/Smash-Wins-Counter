package com.smashwinscounter.smashwinscounter;

import com.smashwinscounter.smashwinscounter.Win;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WinRepository extends JpaRepository<Win, Long> {
    //This is where I put any custom queries (finding wins for a certain player, etc.)
}
