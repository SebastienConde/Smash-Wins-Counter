package com.smashwinscounter.smashwinscounter;

public class CharacterDTO {
    private final String name;
    private final String displayName;

    public CharacterDTO(String name, String displayName) {
        this.name = name;
        this.displayName = displayName;
    }

    public String getName() { return name; }
    public String getDisplayName() { return displayName; }
}
