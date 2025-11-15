FROM gradle:8.7-jdk17 AS build
WORKDIR /app

# Only copy dependency files first to use Docker cache effectively
COPY build.gradle.kts settings.gradle.kts ./
COPY gradle ./gradle
RUN gradle build -x test --no-daemon || return 0

# Now copy the rest of your source code
COPY . .
RUN gradle build -x test --no-daemon

# --- Runtime image ---
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the built jar
COPY --from=build /app/build/libs/*.jar app.jar

# Fly.io expects apps to listen on 8080
EXPOSE 8080

# Required for Fly.io networking (IPv6 first), JVM memory limits, etc.
ENTRYPOINT ["java",
  "-XX:+UseContainerSupport",
  "-XX:MaxRAMPercentage=75",
  "-Djava.net.preferIPv4Stack=false",
  "-jar", "app.jar"]
