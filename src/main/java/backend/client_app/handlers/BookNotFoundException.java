package backend.client_app.handlers;

class BookNotFoundException extends RuntimeException {
    BookNotFoundException(Long id){
        super("Counld not find book id: " + id);
    }
}