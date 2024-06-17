package com.project.schemas;

public record LoanSuccesEvent(CommandId commandId, String title, String author,Long bookId, Long userId, String email) {
    public static LoanSuccesEvent create(CommandId commandId, String title, String author,Long bookId, Long userId, String email){
        return new LoanSuccesEvent(commandId, title, author, bookId, userId, email);
    }
}
