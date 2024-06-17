package com.project.loanservice.models.Loan;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;


import java.util.Date;
import java.util.TimeZone;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Table(name = "Loans")
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "BookId")
    private Long bookId;

    @Column(name = "Title")
    private String title;
    @Column(name = "Author")
    private String author;
    @Column(name = "LoanUser")
    private Long userId;
    @Column(name="Email")
    private String email;
    @Column(name = "DateTime")
    @JsonFormat(pattern = "yyy-MM-dd", timezone = "Europe/Warsaw")
    private Date creationDate;


    public void setLoanDate(Date loanDate) {
        this.creationDate = loanDate;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
}



