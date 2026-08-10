package com.manikandan.portfolio.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
public class ProjectEntity {

    @Id
    private String id;

    @Column(name = "project_number", nullable = false)
    private String number;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(name = "one_liner", nullable = false)
    private String oneLiner;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String timeline;

    @Column(nullable = false)
    private String status;

    private boolean featured;

    @Column(nullable = false, length = 1000)
    private String technologies;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String summary;

    @Column(name = "github_url")
    private String githubUrl;

    @Column(name = "live_url")
    private String liveUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public ProjectEntity() {}

    public ProjectEntity(String id, String number, String title, String slug, String oneLiner, String category, String role, String timeline, String status, boolean featured, String technologies, String summary, String githubUrl, String liveUrl) {
        this.id = id;
        this.number = number;
        this.title = title;
        this.slug = slug;
        this.oneLiner = oneLiner;
        this.category = category;
        this.role = role;
        this.timeline = timeline;
        this.status = status;
        this.featured = featured;
        this.technologies = technologies;
        this.summary = summary;
        this.githubUrl = githubUrl;
        this.liveUrl = liveUrl;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getOneLiner() { return oneLiner; }
    public void setOneLiner(String oneLiner) { this.oneLiner = oneLiner; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getTimeline() { return timeline; }
    public void setTimeline(String timeline) { this.timeline = timeline; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
    public String getTechnologies() { return technologies; }
    public void setTechnologies(String technologies) { this.technologies = technologies; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    public String getLiveUrl() { return liveUrl; }
    public void setLiveUrl(String liveUrl) { this.liveUrl = liveUrl; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
