package com.project.schemas;

public record AddBookCommand(
        CommandId commandId, String title, String author) {
    public static AddBookCommand create( String title, String author) {
        return new AddBookCommand(CommandId.create(), title, author);
    }
}
