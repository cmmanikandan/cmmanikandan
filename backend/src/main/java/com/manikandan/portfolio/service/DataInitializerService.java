package com.manikandan.portfolio.service;

import com.manikandan.portfolio.entity.ArticleEntity;
import com.manikandan.portfolio.entity.ProjectEntity;
import com.manikandan.portfolio.entity.UserEntity;
import com.manikandan.portfolio.repository.ArticleRepository;
import com.manikandan.portfolio.repository.ProjectRepository;
import com.manikandan.portfolio.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DataInitializerService implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ArticleRepository articleRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializerService(UserRepository userRepository, ProjectRepository projectRepository, ArticleRepository articleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.articleRepository = articleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            UserEntity admin = new UserEntity(
                    "usr-admin",
                    "admin",
                    "manikandan.prabhu@dev.app",
                    passwordEncoder.encode("admin123")
            );
            userRepository.save(admin);
        }

        if (projectRepository.count() == 0) {
            projectRepository.save(new ProjectEntity(
                    "proj-qubink", "01", "Qubink", "qubink",
                    "Smart campus document processing and automated cloud printing platform.",
                    "Full Stack", "Lead Full Stack Architect & Engineer", "4 Months", "Production", true,
                    "Angular,TypeScript,Java,Spring Boot,Spring Security,PostgreSQL,WebSockets,Docker",
                    "Qubink eliminates queue friction and manual payment delays in campus printing hubs through a unified web application, automated job queue, and real-time print terminal orchestration.",
                    "https://github.com/Manikandan-Prabhu/qubink", "https://qubink.demo.app"
            ));

            projectRepository.save(new ProjectEntity(
                    "proj-finova", "02", "FINOVA", "finova",
                    "Enterprise financial analytics, portfolio risk assessment, and audit tracking system.",
                    "Enterprise Platform", "Full Stack Engineer", "3 Months", "Deployed", true,
                    "Java,Spring Boot,Spring Security,PostgreSQL,Redis,Angular,SCSS",
                    "FINOVA provides real-time portfolio risk computation, compliance audit logging, and dynamic financial reporting for enterprise wealth management workflows.",
                    "https://github.com/Manikandan-Prabhu/finova", "https://finova.demo.app"
            ));

            projectRepository.save(new ProjectEntity(
                    "proj-servicehub", "03", "ServiceHub", "servicehub",
                    "Distributed field service orchestration and inventory dispatch management system.",
                    "Systems & APIs", "Backend Architect & Developer", "3 Months", "Completed", true,
                    "Java,Spring Boot,Spring Data JPA,PostgreSQL,Angular,REST APIs",
                    "ServiceHub streamlines field service engineering work orders, technician scheduling, equipment tracking, and spare part inventory workflows.",
                    "https://github.com/Manikandan-Prabhu/servicehub", ""
            ));
        }

        if (articleRepository.count() == 0) {
            articleRepository.save(new ArticleEntity(
                    "art-1",
                    "Architecting Scalable REST APIs with Java 17, Spring Boot 3 & PostgreSQL",
                    "architecting-scalable-rest-apis-spring-boot",
                    "Spring Boot",
                    "A comprehensive engineering breakdown on layering Spring Boot applications for enterprise maintainability, DTO separation, and database performance.",
                    "Building production-grade web APIs requires strict separation of concerns.",
                    "8 min read",
                    "2026-07-15"
            ));
        }
    }
}
