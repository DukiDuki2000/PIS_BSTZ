package com.project.bookservice.config;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.cluster.HealthRequest;
import co.elastic.clients.elasticsearch.cluster.HealthResponse;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.TransportUtils;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

import javax.net.ssl.SSLContext;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.logging.Logger;

@Configuration
@EnableElasticsearchRepositories(basePackages = "com.project.bookservice.repositories.ElasticSearchRepository")
public class ElasticsearchConfig {

    private static final Logger logger = Logger.getLogger(ElasticsearchConfig.class.getName());

    @Value("classpath:ca.crt")
    private Resource certResource;

    @Bean
    public ElasticsearchClient elasticsearchClient() throws Exception {
        File certFile = certResource.getFile();

        if (!certFile.exists()) {
            throw new FileNotFoundException("CA certificate file not found at " + certFile.getAbsolutePath());
        }

        SSLContext sslContext = TransportUtils.sslContextFromHttpCaCrt(certFile);

        BasicCredentialsProvider credsProv = new BasicCredentialsProvider();
        credsProv.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials("elastic", "password"));

        RestClient restClient = RestClient.builder(new HttpHost("es01", 9200, "https"))
                .setHttpClientConfigCallback(hc -> hc
                        .setSSLContext(sslContext)
                        .setDefaultCredentialsProvider(credsProv)
                )
                .build();

        ElasticsearchTransport transport = new RestClientTransport(restClient, new JacksonJsonpMapper());

        ElasticsearchClient client = new ElasticsearchClient(transport);

        // Check Elasticsearch health status
        HealthResponse healthResponse = client.cluster().health(HealthRequest.of(h -> h));
        logger.info("Cluster health status: " + healthResponse.status());

        return client;
    }
}
