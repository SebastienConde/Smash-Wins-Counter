package com.smashwinscounter.smashwinscounter;

import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/wins")
@CrossOrigin(origins = {"https://swc.up.railway.app/", "http://localhost:5173"})// base URL
public class WinController {

    private final WinService winService;

    public WinController(WinService winService) { this.winService = winService; }

    // add a new win
    @PostMapping("/add")
    public Win addWin(@RequestBody Win win) { return winService.addWin(win); }

    // get list of all characters
    @GetMapping("/characters")
    public List<CharacterDTO> getCharacters() {
        return Arrays.stream(Character.values())
                .map(c -> new CharacterDTO(c.name(), c.getDisplayName()))
                .collect(Collectors.toList());
    }

    // get amount of games played by one player
    @GetMapping("/totals/{player}")
    public int getTotalGames(@PathVariable("player") String player) {
        return winService.countGamesByPlayer(player);
    }

    // get amount of games won by one player
    @GetMapping("/total/wins/{player}")
    public int getTotalWins(@PathVariable("player") String player) {
        return winService.countGamesByPlayer(player);
    }

    // get amount of games lost by one player
    @GetMapping("/total/losses/{player}")
    public int getTotalLosses(@PathVariable("player") String player) {
        return getTotalGames(player) -  getTotalWins(player);
    }

    // get winrate of a single player
    @GetMapping("/winrate/{player}")
    public double getWinRate(@PathVariable("player") String player) {
        return winService.getWinRate(player);
    }

    // get winrate of a player against another
    @GetMapping("/winrate/{player1}/vs/{player2}")
    public double getWinRate(@PathVariable("player1") String player1, @PathVariable("player2") String player2) {
        return winService.winRateAgainstPlayer(player1, player2);
    }

    // get all unique players in the db
    @GetMapping("/players")
    public List<String> getPlayers() {
        return winService.getAllUniquePlayers();
    }
}
