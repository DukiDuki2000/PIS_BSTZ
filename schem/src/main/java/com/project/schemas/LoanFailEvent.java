package com.project.schemas;

public record LoanFailEvent(CommandId commandId, Long bookId, Long userId, String email) {
    public static LoanFailEvent create(CommandId commandId, Long bookId, Long userId, String email){
        return new LoanFailEvent(commandId, bookId, userId, email);
    }
}
