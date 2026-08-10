package com.manikandan.portfolio.service;

import com.manikandan.portfolio.dto.ContactMessageDto;
import com.manikandan.portfolio.entity.MessageEntity;
import com.manikandan.portfolio.repository.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Transactional
    public ContactMessageDto saveMessage(ContactMessageDto dto) {
        MessageEntity entity = new MessageEntity(
                "msg-" + UUID.randomUUID().toString().substring(0, 8),
                dto.getName(),
                dto.getEmail(),
                dto.getSubject(),
                dto.getMessage(),
                dto.getProjectType(),
                dto.getBudgetRange()
        );
        MessageEntity saved = messageRepository.save(entity);
        return convertToDto(saved);
    }

    @Transactional(readOnly = true)
    public List<ContactMessageDto> getAllMessages() {
        return messageRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public long getUnreadCount() {
        return messageRepository.countByIsReadFalse();
    }

    private ContactMessageDto convertToDto(MessageEntity entity) {
        ContactMessageDto dto = new ContactMessageDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setEmail(entity.getEmail());
        dto.setSubject(entity.getSubject());
        dto.setMessage(entity.getMessage());
        dto.setProjectType(entity.getProjectType());
        dto.setBudgetRange(entity.getBudgetRange());
        dto.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().toString() : "");
        return dto;
    }
}
