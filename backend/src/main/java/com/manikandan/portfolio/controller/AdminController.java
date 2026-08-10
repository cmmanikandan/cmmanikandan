package com.manikandan.portfolio.controller;

import com.manikandan.portfolio.dto.ContactMessageDto;
import com.manikandan.portfolio.repository.ArticleRepository;
import com.manikandan.portfolio.repository.ProjectRepository;
import com.manikandan.portfolio.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final ProjectRepository projectRepository;
    private final ArticleRepository articleRepository;
    private final MessageService messageService;

    public AdminController(ProjectRepository projectRepository, ArticleRepository articleRepository, MessageService messageService) {
        this.projectRepository = projectRepository;
        this.articleRepository = articleRepository;
        this.messageService = messageService;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getAdminStats() {
        return ResponseEntity.ok(Map.of(
                "projectsCount", projectRepository.count(),
                "articlesCount", articleRepository.count(),
                "messagesCount", messageService.getAllMessages().size(),
                "unreadMessagesCount", messageService.getUnreadCount()
        ));
    }

    @GetMapping("/messages")
    public ResponseEntity<List<ContactMessageDto>> getMessages() {
        return ResponseEntity.ok(messageService.getAllMessages());
    }
}
