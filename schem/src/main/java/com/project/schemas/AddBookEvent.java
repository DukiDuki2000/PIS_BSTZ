package com.project.schemas;

public record AddBookEvent(
        CommandId commandId, String title, String author) {
    public static AddBookEvent create( String title, String author) {
        return new AddBookEvent(CommandId.create(), title, author);
    }
}
