package com.project.loanservice.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.loanservice.repositories.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.loanservice.models.Loan.Log;

@Service
public class LogService {
    @Autowired
    private LogRepository logRepository;
    @Autowired
    private ObjectMapper objectMapper;
    public void log(String message,Object object){
        String details;
        try {
            details = objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            details = "Failed to serialize object: " + e.getMessage();
        }
        Log log=new Log(message, details);
        logRepository.save(log);
    }
}