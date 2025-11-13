package com.smashwinscounter.smashwinscounter;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Win {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String winningPlayer;
    private Character winningCharacter;
    private String losingPlayer;
    private Character losingCharacter;

    // No-args constructor necessitated by JPA
    public Win() {}

    public Win(String winningPlayer, Character winningCharacter, String losingPlayer, Character losingCharacter) {
        this.winningPlayer = winningPlayer;
        this.winningCharacter = winningCharacter;
        this.losingPlayer = losingPlayer;
        this.losingCharacter = losingCharacter;
    }

    public long getId() {return id;}

    public String getWinningPlayer() {return winningPlayer;}
    public void  setWinningPlayer(String winningPlayer) {this.winningPlayer = winningPlayer;}

    public Character getWinningCharacter() {return winningCharacter;}
    public void setWinningCharacter(Character winningCharacter) {this.winningCharacter = winningCharacter;}

    public String getLosingPlayer() {return losingPlayer;}
    public void setLosingPlayer(String losingPlayer) {this.losingPlayer = losingPlayer;}

    public Character getLosingCharacter() {return losingCharacter;}
    public void setLosingCharacter(Character losingCharacter) {this.losingCharacter = losingCharacter;}
}
