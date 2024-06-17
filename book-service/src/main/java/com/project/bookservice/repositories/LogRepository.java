package com.project.bookservice.repositories;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.project.bookservice.models.Log.Log;
import com.project.bookservice.models.Book.Book;

import java.util.List;

public interface LogRepository extends MongoRepository<Log,String> {

}
