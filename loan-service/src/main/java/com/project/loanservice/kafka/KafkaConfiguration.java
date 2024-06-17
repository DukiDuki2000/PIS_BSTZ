package com.project.loanservice.kafka;

import com.project.schemas.AddBookCommand;
import com.project.schemas.LoanFailEvent;
import com.project.schemas.LoanSuccesEvent;
import com.project.schemas.RequestLoanBookCommand;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;

@EnableKafka
@Configuration
public class KafkaConfiguration {

    @Bean
    public KafkaTemplate<String, RequestLoanBookCommand> requestLoanBookCommandKafkaTemplate(@Value("${spring.kafka.bootstrap-address}") String bootstrapAddress) {
        Map<String, Object> config = new HashMap<>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);

        DefaultKafkaProducerFactory<String, RequestLoanBookCommand> producerFactory = new DefaultKafkaProducerFactory<>(config);
        return new KafkaTemplate<>(producerFactory);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, AddBookCommand> addBookEventKafkaListenerContainerFactory(
            @Value("${spring.kafka.bootstrap-address}") String bootstrapAddress) {
        Map<String, Object> config = new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
        config.put(JsonDeserializer.TRUSTED_PACKAGES, "com.project.schemas");

        ConcurrentKafkaListenerContainerFactory<String, AddBookCommand> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(new DefaultKafkaConsumerFactory<>(config));
        factory.setConcurrency(2);
        return factory;
    }
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, RequestLoanBookCommand> loanBookEventKafkaListenerContainerFactory(
            @Value("${spring.kafka.bootstrap-address}") String bootstrapAddress) {
        Map<String, Object> config = new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
        config.put(JsonDeserializer.TRUSTED_PACKAGES, "com.project.schemas");

        ConcurrentKafkaListenerContainerFactory<String, RequestLoanBookCommand> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(new DefaultKafkaConsumerFactory<>(config));
        factory.setConcurrency(2);
        return factory;
    }
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, LoanSuccesEvent> loanBookEventSuccesKafkaListenerContainerFactory(
            @Value("${spring.kafka.bootstrap-address}") String bootstrapAddress) {
        Map<String, Object> config = new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
        config.put(JsonDeserializer.TRUSTED_PACKAGES, "com.project.schemas");

        ConcurrentKafkaListenerContainerFactory<String,  LoanSuccesEvent> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(new DefaultKafkaConsumerFactory<>(config));
        factory.setConcurrency(2);
        return factory;
    }
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, LoanFailEvent> loanBookEventFailKafkaListenerContainerFactory(
            @Value("${spring.kafka.bootstrap-address}") String bootstrapAddress) {
        Map<String, Object> config = new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
        config.put(JsonDeserializer.TRUSTED_PACKAGES, "com.project.schemas");

        ConcurrentKafkaListenerContainerFactory<String,  LoanFailEvent> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(new DefaultKafkaConsumerFactory<>(config));
        factory.setConcurrency(2);
        return factory;
    }




//    @Bean
//    public KafkaTemplate<String, ChangeLoanStatus> changeLoanStatusCommandKafkaTemplate(@Value("${spring.kafka.bootstrap-address}") String bootstrapAddress) {
//        Map<String, Object> config = new HashMap<>();
//
//        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
//        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
//        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
//
//        return new KafkaTemplate<>(new DefaultKafkaProducerFactory<>(config));
//    }
//    @Bean
//    public KafkaTemplate<String, LoanSuccesEvent> loanBookCommandKafkaTemplate(@Value("${spring.kafka.bootstrap-address}") String bootstrapAddress) {
//        Map<String, Object> config = new HashMap<>();
//        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
//        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
//        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
//
//        DefaultKafkaProducerFactory<String, LoanSuccesEvent> producerFactory = new DefaultKafkaProducerFactory<>(config);
//        return new KafkaTemplate<>(producerFactory);
//    }


}
