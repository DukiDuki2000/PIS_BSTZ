package com.project.authapigateway.models.users;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
@Entity
@Table(name = "roles")
public class UserRole {
    private @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) Integer id;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Role name;
}
