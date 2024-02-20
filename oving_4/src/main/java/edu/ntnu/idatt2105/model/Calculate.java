package edu.ntnu.idatt2105.model;

/**
 * A record representing the result of a calculation.
 * This record includes an identifier and the calculation result.
 */
public record Calculate(String id, double result) {
  // This is a record in Java, getters are automatically provided.
}

