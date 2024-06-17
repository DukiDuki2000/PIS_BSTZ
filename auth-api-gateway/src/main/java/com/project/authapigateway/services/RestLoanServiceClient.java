package com.project.authapigateway.services;

import com.project.authapigateway.models.loanservice.LoanDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class RestLoanServiceClient {
    private final RestClient restClient;

    public RestLoanServiceClient(@Value("${services.loan-service}") String loanServiceUrl) {
        this.restClient = RestClient.create(loanServiceUrl);
    }

    public List<LoanDto> getModAllLoans() {
        return restClient.get()
                .uri("loan/all")
                .retrieve()
                .body(new ParameterizedTypeReference<>() {});
    }

    public List<LoanDto> getUserAllLoans(Long userId) {
        return restClient.get()
                .uri("loan/{userId}", userId)
                .retrieve()
                .body(new ParameterizedTypeReference<>() {});
    }
}
