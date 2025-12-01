package com.smashwinscounter.smashwinscounter;

public enum Player {
    FORD("Ford"),
    MICHAEL("Michael"),
    EVAN_C("Evan C"),
    EVAN_Z("Evan Z"),
    SEBASTIEN("Sebastien");

    private final String displayName;

    Player(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
