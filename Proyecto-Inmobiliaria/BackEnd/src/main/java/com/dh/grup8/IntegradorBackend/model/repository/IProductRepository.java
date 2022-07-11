package com.dh.grup8.IntegradorBackend.model.repository;

import com.dh.grup8.IntegradorBackend.model.entity.Product;
import org.apache.tomcat.jni.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface IProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE cities.name = ?1")
    List<Product> findProductsByCityName(String name);

    @Query("SELECT p FROM Product p WHERE category.id = ?1")
    List<Product> findProductsByCategory(Long id);

    @Query(value = "SELECT * FROM product p WHERE p.id NOT IN (SELECT fk_producto FROM reservation r WHERE ?1 < r.end_date AND ?2 > r.start_date);", nativeQuery = true)
    List<Product> findProductByDate(LocalDate start, LocalDate end);

    @Query(value = "SELECT * FROM product p INNER JOIN cities c on p.cities_id = c.id WHERE c.name = ?1 AND p.id NOT IN (SELECT fk_producto FROM reservation r WHERE ?2 < r.end_date AND ?3 > r.start_date);", nativeQuery = true)
    List<Product> findProductByDateAndCity(String cityName, LocalDate start, LocalDate end);

    @Query(value = "SELECT * FROM product p INNER JOIN category ca on ca.id = p.category INNER JOIN cities ci on p.cities_id = ci.id WHERE ca.id = ?1 AND ci.name = ?2 AND p.id NOT IN (SELECT fk_producto FROM reservation r WHERE ?3 < r.end_date AND ?4 > r.start_date);", nativeQuery = true)
    List<Product> findProductByDateAndCityAndCategory(Long categoryId, String cityName, LocalDate start, LocalDate end);

    @Query("SELECT p FROM Product p WHERE category.id = ?1 AND cities.name = ?2")
    List<Product> findProductsByCategoryAndCity(Long categoryId, String cityName);

}
