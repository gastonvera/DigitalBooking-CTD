package com.dh.grup8.IntegradorBackend.security.service;

import com.dh.grup8.IntegradorBackend.exceptions.EmailAlreadyInUseException;
import com.dh.grup8.IntegradorBackend.security.dto.AuthenticationRequestDto;
import com.dh.grup8.IntegradorBackend.security.dto.UserDto;
import com.dh.grup8.IntegradorBackend.security.entity.Rol;
import com.dh.grup8.IntegradorBackend.security.entity.User;
import com.dh.grup8.IntegradorBackend.security.enums.RolName;
import com.dh.grup8.IntegradorBackend.security.jwt.JwtUtil;
import com.dh.grup8.IntegradorBackend.security.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final IUserRepository userRepository;

    private final RolService rolService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtUtil jwtUtil;

    private final CustomeUserDetailsService userDetailsService;

    private Authentication authentication(AuthenticationRequestDto userDto){
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userDto.getEmail(), userDto.getPassword()));
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Incorrect password and/or email. Please try again.");
        }
        return authentication;
    }

    private void checkMailIsAvailable(String email){
        if (userRepository.existsByEmail(email))
            throw new EmailAlreadyInUseException(email + " this mail is already in use by other user");
    }

    public void saveUser(UserDto userToSave) {

        checkMailIsAvailable(userToSave.getEmail());

        User user = new User();
        user.setName(userToSave.getName());
        user.setLastName(userToSave.getLastName());
        user.setEmail(userToSave.getEmail());
        Rol rolAsignado= rolService.findByRolName(RolName.ROLE_USER);
        user.setRol(rolAsignado);
        user.setPassword(bCryptPasswordEncoder.encode(userToSave.getPassword()));

        userRepository.save(user);

    }

    public String logInUser(AuthenticationRequestDto user) {

        Authentication authentication = authentication(user);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());

        return jwtUtil.generateToken(userDetails);

    }

   public Optional<User> findByEmail(String email){
        return userRepository.findByEmail(email);
   }


}
