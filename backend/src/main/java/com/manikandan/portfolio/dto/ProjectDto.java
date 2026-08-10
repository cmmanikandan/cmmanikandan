package com.manikandan.portfolio.dto;

import java.util.List;

public class ProjectDto {
    private String id;
    private String number;
    private String title;
    private String slug;
    private String oneLiner;
    private String category;
    private String role;
    private String timeline;
    private String status;
    private boolean featured;
    private List<String> technologies;
    private String summary;
    private String githubUrl;
    private String liveUrl;

    public ProjectDto() {}

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
    public List<String> getTechnologies() { return technologies; }
    public void setTechnologies(List<String> technologies) { this.technologies = technologies; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    public String getLiveUrl() { return liveUrl; }
    public void setLiveUrl(String liveUrl) { this.liveUrl = liveUrl; }
}
