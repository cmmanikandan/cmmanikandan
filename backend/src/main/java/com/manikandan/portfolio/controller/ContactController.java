package com.manikandan.portfolio.controller;

import com.manikandan.portfolio.dto.ContactMessageDto;
import com.manikandan.portfolio.service.MessageService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    private final MessageService messageService;

    public ContactController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> submitContactMessage(@Valid @RequestBody ContactMessageDto dto) {
        messageService.saveMessage(dto);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Message received. Thanks for reaching out! I'll get back to you as soon as possible."
        ));
    }
}
