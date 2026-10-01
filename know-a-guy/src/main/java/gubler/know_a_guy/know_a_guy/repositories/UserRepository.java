package gubler.know_a_guy.know_a_guy.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import gubler.know_a_guy.know_a_guy.entities.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {}
