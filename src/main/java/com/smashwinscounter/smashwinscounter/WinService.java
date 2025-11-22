package com.smashwinscounter.smashwinscounter;


import com.smashwinscounter.smashwinscounter.Win;
import com.smashwinscounter.smashwinscounter.WinRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WinService {

    private final WinRepository winRepository;

    public WinService(WinRepository winRepository) {
        this.winRepository = winRepository;
    }

    public Win addWin(Win win) {
        winRepository.save(win);
        return win;
    }

    // Get total amount of games a player has played
    public int countGamesByPlayer(String player) {
        return winRepository.countWinsByPlayer(player) + winRepository.countLossesByPlayer(player);
    }

    // Get win rate (as decimal rounded to 2 places) of player
    public double getWinRate(String player) {
        int totalGames = countGamesByPlayer(player);
        return totalGames == 0 ? 0.0 : Math.round(winRepository.countWinsByPlayer(player) * 1.0 / totalGames * 100.0) / 100.0;
    }

    // Get win rate of player 1 against player 2
    public double winRateAgainstPlayer(String player1, String player2) {
        int wins =  winRepository.winsAgainstPlayer(player1, player2);
        int totalGames = winRepository.totalMatchesBetween(player1, player2);
        return totalGames == 0 ? 0.00 : Math.round((double) wins / totalGames * 100.0) / 100.0;
    }

}
