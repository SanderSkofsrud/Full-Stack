package edu.ntnu.idatt2105.service;

import edu.ntnu.idatt2105.model.Calculate;
import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.util.UUID;

/**
 * Service for performing arithmetic calculations.
 * This service takes an arithmetic expression as a string and calculates its result.
 */
@Service
public class CalculationService {

  private static final Logger logger = LoggerFactory.getLogger(CalculationService.class);

  /**
   * Performs the calculation of the given arithmetic expression.
   *
   * @param expression The arithmetic expression to be calculated.
   * @return A Calculate object containing the unique ID and result of the calculation.
   * @throws RuntimeException If there is an error in calculation.
   */
  public Calculate performCalculation(String expression) {
    String id = generateUniqueId();
    try {
      Expression exp = new ExpressionBuilder(expression).build();
      double result = exp.evaluate();
      logger.info("Calculation performed successfully. ID: {}, Expression: {}, Result: {}", id, expression, result);
      return new Calculate(id, result);
    } catch (IllegalArgumentException | ArithmeticException e) {
      logger.error("Error in calculation. ID: {}, Expression: {}, Error: {}", id, expression, e.getMessage());
      throw new RuntimeException("Calculation error: " + e.getMessage());
    }
  }

  /**
   * Generates a unique identifier for each calculation.
   *
   * @return A unique UUID as a string.
   */
  private String generateUniqueId() {
    return UUID.randomUUID().toString();
  }
}

