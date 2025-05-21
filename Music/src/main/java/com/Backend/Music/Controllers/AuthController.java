package com.Backend.Music.Controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import com.Backend.Music.Entities.User;
import com.Backend.Music.Services.UserService;
import com.Backend.Music.Util.JwtUtil;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;
    
    @Autowired
    private UserService userService;
    

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User request) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            return ResponseEntity.ok(Map.of("token",jwtUtil.generateToken(request.getUsername())));
        } catch (AuthenticationException e) {
        	return ResponseEntity.badRequest().body("Username or Password is invalid");
           
            
        }
    }
   
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
    	
    	return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(user));
    }
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
        	System.out.println("Request is coming and reaching to endpoint..");
           // Remove "Bearer " prefix if present
            String token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;

            // Extract username
            String username = jwtUtil.extractUsername(token);

            // Validate token
            if (jwtUtil.validateToken(token)) {
                return ResponseEntity.ok(Map.of(
                    "valid", true,
                    "username", username
                ));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "valid", false,
                    "message", "Invalid token"
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                "valid", false,
                "message", "Token validation failed",
                "error", e.getMessage()
            ));
        }
    }


    
}
