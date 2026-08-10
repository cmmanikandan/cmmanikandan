package com.manikandan.portfolio.repository;

import com.manikandan.portfolio.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, String> {
    Optional<ProjectEntity> findBySlug(String slug);
    List<ProjectEntity> findByFeaturedTrue();
    List<ProjectEntity> findByCategory(String category);
}
