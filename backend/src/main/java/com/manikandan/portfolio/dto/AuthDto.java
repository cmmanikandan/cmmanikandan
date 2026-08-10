package com.manikandan.portfolio.dto;

public class AuthDto {
    
    public static class LoginRequest {
        private String username;
        private String password;

        public LoginRequest() {}

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class LoginResponse {
        private String token;
        private UserSummary user;

        public LoginResponse(String token, UserSummary user) {
            this.token = token;
            this.user = user;
        }

        public String getToken() { return token; }
        public UserSummary getUser() { return user; }
    }

    public static class UserSummary {
        private String id;
        private String username;
        private String email;

        public UserSummary(String id, String username, String email) {
            this.id = id;
            this.username = username;
            this.email = email;
        }

        public String getId() { return id; }
        public String getUsername() { return username; }
        public String getEmail() { return email; }
    }
}
