package com.example.EmailAssistantBackend.controller;

import com.example.EmailAssistantBackend.model.EmailRequest;
import com.example.EmailAssistantBackend.service.EmailAssistantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")
public class EmailAssistantController {

    private final EmailAssistantService emailAssistantService;

    public EmailAssistantController(EmailAssistantService emailAssistantService) {
        this.emailAssistantService = emailAssistantService;
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
        String response = emailAssistantService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }

}
