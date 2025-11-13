package com.smashwinscounter.smashwinscounter;


import com.smashwinscounter.smashwinscounter.Win;
import com.smashwinscounter.smashwinscounter.WinRepository;
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

    public Win getWinById(Long id) {
        return winRepository.findById(id).orElse(null);
    }

    public List<Win> getAllWins() {
        return winRepository.findAll();
    }
}
