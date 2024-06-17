package com.project.schemas;

public record ChangeLoanStatusEvent(CommandId commandId, String title, String author,Long userId,Boolean LoanAccept) {
    public static ChangeLoanStatusEvent create(String title, String author,Long userId,Boolean LoanAccept){
        return new ChangeLoanStatusEvent(CommandId.create(), title, author,userId,LoanAccept);
    }
}
