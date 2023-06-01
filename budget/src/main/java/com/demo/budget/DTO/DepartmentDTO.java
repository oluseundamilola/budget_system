package com.demo.budget.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DepartmentDTO {

    private String name;
    private String ministryName;
    private String description;
    private LocalDateTime created_at;
    private long DivisionCount;
    private Long id;
}
