package com.dh.grup8.IntegradorBackend.model.repository;

import com.dh.grup8.IntegradorBackend.model.entity.Category;
import com.dh.grup8.IntegradorBackend.model.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ICategoryRepository  extends JpaRepository<Category, Long> {

    @Query(value = "select count(p) from Product p where p.category.title = ?1")
    Long countByTitle(String title);

}
