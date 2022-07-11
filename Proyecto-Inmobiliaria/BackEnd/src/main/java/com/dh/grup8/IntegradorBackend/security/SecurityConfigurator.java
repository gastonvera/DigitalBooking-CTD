package com.dh.grup8.IntegradorBackend.security;

import com.dh.grup8.IntegradorBackend.security.jwt.JwtAuthenticationEntryPoint;
import com.dh.grup8.IntegradorBackend.security.jwt.JwtRequestFilter;
import com.dh.grup8.IntegradorBackend.security.service.CustomeUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@EnableWebSecurity
public class SecurityConfigurator extends WebSecurityConfigurerAdapter {

    @Autowired
    CustomeUserDetailsService customeUserDetailsService;
    @Autowired
    JwtRequestFilter jwtRequestFilter;
    @Autowired
    JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
//        super.configure(auth);
        auth.userDetailsService(customeUserDetailsService);
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Enable CORS and disable CSRF
        http.cors().and().csrf().disable()
                // Set session management to stateless
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                // Set unauthorized requests exception handler
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and()
                // Set permissions on endpoints
                .authorizeRequests()
                // Public endpoints
                .antMatchers("/auth/register", "/auth/login", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html","/category/**","/product/**","/city/**","/image/**").permitAll()
                // Private endpoints
                .anyRequest().authenticated()
                .and()
                // Add JWT Token Filter
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

}
