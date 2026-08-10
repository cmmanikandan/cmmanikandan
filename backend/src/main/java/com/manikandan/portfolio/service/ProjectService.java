package com.manikandan.portfolio.service;

import com.manikandan.portfolio.dto.ProjectDto;
import com.manikandan.portfolio.entity.ProjectEntity;
import com.manikandan.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional(readOnly = true)
    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectDto getProjectBySlug(String slug) {
        return projectRepository.findBySlug(slug)
                .map(this::convertToDto)
                .orElseThrow(() -> new RuntimeException("Project not found: " + slug));
    }

    @Transactional
    public ProjectDto createProject(ProjectDto dto) {
        ProjectEntity entity = convertToEntity(dto);
        if (entity.getId() == null) {
            entity.setId("proj-" + UUID.randomUUID().toString().substring(0, 8));
        }
        ProjectEntity saved = projectRepository.save(entity);
        return convertToDto(saved);
    }

    @Transactional
    public void deleteProject(String id) {
        projectRepository.deleteById(id);
    }

    private ProjectDto convertToDto(ProjectEntity entity) {
        ProjectDto dto = new ProjectDto();
        dto.setId(entity.getId());
        dto.setNumber(entity.getNumber());
        dto.setTitle(entity.getTitle());
        dto.setSlug(entity.getSlug());
        dto.setOneLiner(entity.getOneLiner());
        dto.setCategory(entity.getCategory());
        dto.setRole(entity.getRole());
        dto.setTimeline(entity.getTimeline());
        dto.setStatus(entity.getStatus());
        dto.setFeatured(entity.isFeatured());
        dto.setTechnologies(Arrays.asList(entity.getTechnologies().split(",")));
        dto.setSummary(entity.getSummary());
        dto.setGithubUrl(entity.getGithubUrl());
        dto.setLiveUrl(entity.getLiveUrl());
        return dto;
    }

    private ProjectEntity convertToEntity(ProjectDto dto) {
        String techString = dto.getTechnologies() != null ? String.join(",", dto.getTechnologies()) : "";
        return new ProjectEntity(
                dto.getId(),
                dto.getNumber() != null ? dto.getNumber() : "01",
                dto.getTitle(),
                dto.getSlug(),
                dto.getOneLiner(),
                dto.getCategory(),
                dto.getRole(),
                dto.getTimeline(),
                dto.getStatus(),
                dto.isFeatured(),
                techString,
                dto.getSummary(),
                dto.getGithubUrl(),
                dto.getLiveUrl()
        );
    }
}
