package com.smashwinscounter.smashwinscounter;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wins") // base URL
public class WinController {

    private final WinService winService;

    public WinController(WinService winService) {
        this.winService = winService;
    }

    // POST wins/add -> add a new win
    @PostMapping("/add")
    public Win addWin(@RequestBody Win win) {
        return winService.addWin(win);
    }

    // GET /wins -> get all wins
    @GetMapping
    public List<Win> getAllWins() {
        return winService.getAllWins();
    }
}
