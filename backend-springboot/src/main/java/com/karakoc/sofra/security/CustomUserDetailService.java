package com.karakoc.sofra.security;

import com.karakoc.sofra.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = repository.findUserByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return UserPrincipal.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .authorities(List.of(new SimpleGrantedAuthority(user.getRole())))
                .password(user.getPassword()) // Şifrelenmiş şifreyi doğrudan kullanıyoruz
                .build();
    }
}
