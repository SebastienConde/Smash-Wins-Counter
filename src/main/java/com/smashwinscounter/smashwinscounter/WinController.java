package com.smashwinscounter.smashwinscounter;

import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/wins")
@CrossOrigin(origins = "http://smash-wins-counter-frontend-production.up.railway.app")// base URL
public class WinController {

    private final WinService winService;

    public WinController(WinService winService) { this.winService = winService; }

    // POST wins/add -> add a new win
    @PostMapping("/add")
    public Win addWin(@RequestBody Win win) { return winService.addWin(win); }

    // GET /wins -> get all wins
    @GetMapping
    public List<Win> getAllWins() {
        return winService.getAllWins();
    }

    // GET /wins/characters -> get all characters
    @GetMapping("/characters")
    public List<CharacterDTO> getCharacters() {
        return Arrays.stream(Character.values())
                .map(c -> new CharacterDTO(c.name(), c.getDisplayName()))
                .collect(Collectors.toList());
    }
}
