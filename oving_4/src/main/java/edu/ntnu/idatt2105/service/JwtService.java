package edu.ntnu.idatt2105.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import edu.ntnu.idatt2105.enums.AuthenticationState;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

  private static final String SECRET_KEY = "secret";

  public String extractUsername(String token) throws Exception {
    return extractClaim(token, Claims::getSubject);
  }

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) throws Exception {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  public String generateToken(UserDetails userDetails){
    return generateToken(new HashMap<>(), userDetails);
  }

  public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
    return Jwts
            .builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 5)) // 5 minutes
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact();
  }

  public Boolean isTokenValid(String token, UserDetails userDetails) throws Exception {
    if (userDetails == null) {
      return false;
    }

    final String username = extractUsername(token);
    boolean isUsernameMatch = username.equals(userDetails.getUsername());
    boolean isTokenExpired = isTokenExpired(token);
    return (isUsernameMatch && !isTokenExpired);
  }

  public AuthenticationState getAuthenticationState(String token, UserDetails userDetails) throws Exception {
    if (isTokenValid(token, userDetails)) {
      return AuthenticationState.AUTHENTICATED;
    }
    try {
      extractAllClaims(token);
    } catch (ExpiredJwtException e) {
      return AuthenticationState.TOKEN_EXPIRED;
    } catch (Exception e) {
      // Ignore other exceptions
    }

    return AuthenticationState.UNAUTHENTICATED;
  }





  private boolean isTokenExpired(String token) throws Exception {
    return extractExpiration(token).before(new Date());
  }

  private Date extractExpiration(String token) throws Exception {
    return extractClaim(token, Claims::getExpiration);
  }


  private Claims extractAllClaims(String token) throws Exception {
    try {
      return Jwts
              .parserBuilder()
              .setSigningKey(getSignInKey())
              .build()
              .parseClaimsJws(token)
              .getBody();
    } catch (ExpiredJwtException e) {
      throw new ExpiredJwtException(null, null, "Token has expired");
    }
  }


  private Key getSignInKey() {
    byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
    return Keys.hmacShaKeyFor(keyBytes);
  }

}
