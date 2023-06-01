package com.demo.budget.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DivisionDTO {
    private long id;
    private String divisionName;
    private String divisionCode;
    private String ministryName;
    private String departmentName;
    private List<BudgetRequestDTO> divisionRequests;
}
