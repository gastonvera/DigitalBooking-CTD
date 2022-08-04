package com.dh.grup8.IntegradorBackend.model.repository;

import com.dh.grup8.IntegradorBackend.model.entity.Product;
import com.dh.grup8.IntegradorBackend.model.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface IScoreRepository extends JpaRepository<Score, Long> {
    @Query(value = "SELECT AVG(score) FROM Score WHERE fk_product = ?1", nativeQuery = true)
    Double findAverageScore(Long id);

//    @Query("SELECT p FROM Product p WHERE category.id = ?1")
    @Query(value = "SELECT product FROM Score s where s.favorite=true and s.user.id= ?1")
    ArrayList<Product> findProductsFavoritesByUserId(Long id);

    @Query(value = "SELECT s FROM Score s where s.favorite=true and s.user.id= ?1")
    ArrayList<Score> findScoresFavoritesByUserId(Long id);

}
