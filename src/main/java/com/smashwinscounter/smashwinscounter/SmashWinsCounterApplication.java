package com.smashwinscounter.smashwinscounter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SmashWinsCounterApplication {

	public static void main(String[] args) {
        // Print the DATABASE_URL for debugging (mask password)
        String dbUrl = System.getenv("DATABASE_URL");
        if (dbUrl != null) {
            System.out.println("Resolved DB URL: " + dbUrl.replaceAll("password=.*?(&|$)", "password=*****$1"));
        } else {
            System.out.println("DATABASE_URL environment variable is not set!");
        }
		SpringApplication.run(SmashWinsCounterApplication.class, args);
	}

}
