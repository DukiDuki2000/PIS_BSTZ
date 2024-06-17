package com.project.bookservice.repositories.ElasticSearchRepository;

import com.project.bookservice.models.Book.EBook;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ElasticSearchRepository extends ElasticsearchRepository<EBook, Long> {
}