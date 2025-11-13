package com.smashwinscounter.smashwinscounter;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class TestData implements CommandLineRunner {

    private final WinRepository winRepository;

    public TestData(WinRepository winRepository) {
        this.winRepository = winRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Win win = new Win();
        win.setWinningPlayer("Mario");
        win.setWinningCharacter(Character.MARIO);
        win.setLosingPlayer("Link");
        win.setLosingCharacter(Character.LINK);

        winRepository.save(win);

        System.out.println("Inserted a test win!");
    }
}
