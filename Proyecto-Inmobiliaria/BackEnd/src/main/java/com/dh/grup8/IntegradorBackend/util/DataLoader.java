package com.dh.grup8.IntegradorBackend.util;

import com.dh.grup8.IntegradorBackend.security.entity.Rol;
import com.dh.grup8.IntegradorBackend.security.entity.User;
import com.dh.grup8.IntegradorBackend.security.enums.RolName;
import com.dh.grup8.IntegradorBackend.security.repository.IRolRepository;
import com.dh.grup8.IntegradorBackend.security.repository.IUserRepository;
import com.dh.grup8.IntegradorBackend.security.service.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {

    private IUserRepository userRepository;
    private IRolRepository repository;
    private RolService rolService;


    @Autowired
    public DataLoader(IUserRepository userRepository, IRolRepository rolRepository, RolService rolService){
        this.userRepository =userRepository;
        this.repository = rolRepository;
        this.rolService = rolService;
    }

    @Override
    public void run (ApplicationArguments args) throws Exception{

        Rol rolAdmin = new Rol();
        rolAdmin.setRolName(RolName.ROLE_ADMIN);
        Rol rolUser = new Rol();
        rolUser.setRolName(RolName.ROLE_USER);
        rolService.save(rolAdmin);
        rolService.save(rolUser);

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String password =passwordEncoder.encode("123456");

        User userAdmin =new User();
        userAdmin.setName("Administrador");
        userAdmin.setLastName("Cristaldo");
        userAdmin.setPassword(password);
        userAdmin.setEmail("admin@admin.com");
        userAdmin.setRol(repository.findByRolName(RolName.ROLE_ADMIN));


        userRepository.save(userAdmin);
    }

}
