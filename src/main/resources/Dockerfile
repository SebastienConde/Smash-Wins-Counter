# Use a lightweight Java 21 runtime
FROM eclipse-temurin:21-jdk

# Set working directory inside the container
WORKDIR /app

# Copy Gradle or Maven build files first (to leverage Docker cache)
COPY build.gradle settings.gradle ./
COPY gradle gradle
COPY gradlew ./

# Copy source code
COPY src src

# Build the application (you can use Maven instead if you prefer)
RUN ./gradlew bootJar --no-daemon

# Expose the default Spring Boot port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "build/libs/smashwinscounter-0.0.1-SNAPSHOT.jar"]
