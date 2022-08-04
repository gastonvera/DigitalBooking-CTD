package com.dh.grup8.IntegradorBackend.security.service;

import com.dh.grup8.IntegradorBackend.security.repository.IUserRepository;
import com.dh.grup8.IntegradorBackend.security.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class CustomeUserDetailsService implements UserDetailsService {

    @Autowired
    IUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> jwtUser = userRepository.findByEmail(email);
        return jwtUser.map(user -> new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>())).orElse(null);
    }
}
