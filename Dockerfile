# ---- Build Stage ----
FROM gradle:8.7-jdk17 AS builder
WORKDIR /app

# Copy Gradle files first to cache dependencies
COPY build.gradle settings.gradle gradle.properties ./
COPY gradle ./gradle

# Download dependencies
RUN gradle build -x test --no-daemon || true

# Copy the rest of the project
COPY src/main/java .

# Run full build
RUN gradle build -x test --no-daemon

# ---- Run Stage ----
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy JAR from build stage
COPY --from=builder /app/build/libs/*.jar app.jar

# Expose port (Spring Boot defaults to 8080)
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
