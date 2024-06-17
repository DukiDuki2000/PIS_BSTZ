package com.project.bookservice.services;

import co.elastic.clients.elasticsearch.cluster.HealthRequest;
import co.elastic.clients.elasticsearch.cluster.HealthResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.project.bookservice.models.Book.EBook;
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class SearchService {

    private static final Logger logger = Logger.getLogger(SearchService.class.getName());

    @Autowired
    private ElasticsearchClient elasticsearchClient;
    public String checkElasticsearchConnection() {
        try {
            HealthResponse healthResponse = elasticsearchClient.cluster().health(HealthRequest.of(h -> h));
            logger.info("Cluster health status: " + healthResponse.status());
            return healthResponse.status().jsonValue();
        } catch (IOException e) {
            logger.log(Level.SEVERE, "Failed to connect to Elasticsearch", e);
            return "Error";
        }
    }
    public List<EBook> searchBooks(String term) {
    List<EBook> books = new ArrayList<>();
    try {
        SearchResponse<EBook> searchResponse = elasticsearchClient.search(s -> s
            .index("books-connector")
            .query(q -> q
                .multiMatch(t -> t
                    .fields("public_books_title", "public_books_author", "public_books_description",
                            "public_books_category")
                    .query(term)
                        .fuzziness("AUTO")
                )
            ), EBook.class);

        for (Hit<EBook> hit : searchResponse.hits().hits()) {
            books.add(hit.source());
        }
    } catch (IOException e) {
        logger.severe("Error during search: ");
    }
    return books;
}


}
