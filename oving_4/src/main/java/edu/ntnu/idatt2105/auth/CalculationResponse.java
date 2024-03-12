package edu.ntnu.idatt2105.auth;

import edu.ntnu.idatt2105.enums.AuthenticationState;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CalculationResponse {
  private double result;
  private String errorMessage;
  private AuthenticationState authenticationState;
}
