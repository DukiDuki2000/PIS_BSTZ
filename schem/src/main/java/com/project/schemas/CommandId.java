package com.project.schemas;

import org.apache.commons.lang3.RandomStringUtils;

import java.time.LocalDateTime;

public record CommandId(String traceId, String commandId, LocalDateTime creationDateTime) {
    public static CommandId create() {
        return new CommandId(RandomStringUtils.randomAlphabetic(5), RandomStringUtils.randomAlphabetic(5), LocalDateTime.now());
    }
}

