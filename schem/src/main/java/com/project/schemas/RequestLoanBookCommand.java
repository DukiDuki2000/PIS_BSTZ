package com.project.schemas;


public record RequestLoanBookCommand(CommandId commandId, Long userId, String email, Long bookId)
     {
        public static RequestLoanBookCommand create(Long userId, String email, Long bookId) {
            return new RequestLoanBookCommand(CommandId.create(), userId, email, bookId);
        }

        public LoanSuccesEvent asLoanSucces(String title, String author) {
            return LoanSuccesEvent.create(commandId, title, author, bookId, userId, email);
        }

         public LoanFailEvent asLoanFail() {
             return LoanFailEvent.create(commandId, bookId, userId, email);
         }

     }

