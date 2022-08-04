package com.dh.grup8.IntegradorBackend.security.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Setter
@Getter
public class AuthenticationRequestDto {

	@Email
	@NotNull(message = "Email must not be null.")
	private String email;

	@NotNull(message = "Password must not be null.")
	private String password;

}
