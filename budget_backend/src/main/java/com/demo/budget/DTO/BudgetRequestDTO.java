package com.demo.budget.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BudgetRequestDTO {
    private long id;
    private String budget_name;
    private String budget_description;
    private long amount;
    private String status;
    private String division_name;
    private String departmet_name;
    private String ministry_name;
    private long division_id;
}
