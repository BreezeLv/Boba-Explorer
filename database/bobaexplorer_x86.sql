-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bobaexplorer_x86
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bobaexplorer_x86
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bobaexplorer_x86` DEFAULT CHARACTER SET utf8 ;
USE `bobaexplorer_x86` ;

-- -----------------------------------------------------
-- Table `bobaexplorer_x86`.`USER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bobaexplorer_x86`.`USER` (
  `user_id` INT NOT NULL,
  `user_name` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `created_date` DATETIME NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bobaexplorer_x86`.`PRODUCT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bobaexplorer_x86`.`PRODUCT` (
  `product_id` INT NOT NULL,
  `product_name` VARCHAR(45) NULL,
  `size:price` VARCHAR(45) NULL,
  PRIMARY KEY (`product_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bobaexplorer_x86`.`STORE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bobaexplorer_x86`.`STORE` (
  `store_id` INT NOT NULL,
  `operation_time` VARCHAR(45) NULL,
  `location` VARCHAR(45) NULL,
  `ratings` FLOAT NULL,
  `store_name` VARCHAR(45) NULL,
  PRIMARY KEY (`store_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bobaexplorer_x86`.`REVIEW_FROM_USER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bobaexplorer_x86`.`REVIEW_FROM_USER` (
  `review_id` INT NOT NULL,
  `review_Date` DATETIME NULL,
  `review_content` VARCHAR(200) NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`review_id`),
  INDEX `fk_user_id_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `bobaexplorer_x86`.`USER` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bobaexplorer_x86`.`REVIEW_FROM_YELP`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bobaexplorer_x86`.`REVIEW_FROM_YELP` (
  `review_id` INT NOT NULL,
  `reviewed_date` DATETIME NULL,
  `review_content` VARCHAR(200) NULL,
  PRIMARY KEY (`review_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bobaexplorer_x86`.`be_friend_with`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bobaexplorer_x86`.`be_friend_with` (
  `user_id` INT NOT NULL,
  `friend_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `friend_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  UNIQUE INDEX `friend_id_UNIQUE` (`friend_id` ASC),
  CONSTRAINT `fk_friend_id`
    FOREIGN KEY (`friend_id`)
    REFERENCES `bobaexplorer_x86`.`USER` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_userF_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `bobaexplorer_x86`.`USER` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bobaexplorer_x86`.`searches`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bobaexplorer_x86`.`searches` (
  `search_time` DATETIME NULL,
  `search_record` VARCHAR(45) NULL,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  INDEX `fk_user_id_idx` (`user_id` ASC),
  INDEX `fk_product_id_idx` (`product_id` ASC),
  PRIMARY KEY (`user_id`, `product_id`),
  CONSTRAINT `fk_userS_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `bobaexplorer_x86`.`USER` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_productS_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `bobaexplorer_x86`.`PRODUCT` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bobaexplorer_x86`.`sells`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bobaexplorer_x86`.`sells` (
  `product_id` INT NOT NULL,
  `store_id` INT NOT NULL,
  PRIMARY KEY (`product_id`),
  INDEX `fk_store_id_idx` (`store_id` ASC),
  CONSTRAINT `fk_productSE_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `bobaexplorer_x86`.`PRODUCT` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_storeSE_id`
    FOREIGN KEY (`store_id`)
    REFERENCES `bobaexplorer_x86`.`STORE` (`store_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bobaexplorer_x86`.`comments_by_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bobaexplorer_x86`.`comments_by_user` (
  `review_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`review_id`, `product_id`),
  INDEX `fk_product_id_idx` (`product_id` ASC),
  CONSTRAINT `fk_reviewCU_id`
    FOREIGN KEY (`review_id`)
    REFERENCES `bobaexplorer_x86`.`REVIEW_FROM_USER` (`review_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_productCU_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `bobaexplorer_x86`.`PRODUCT` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bobaexplorer_x86`.`comments_by_yelp`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bobaexplorer_x86`.`comments_by_yelp` (
  `review_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`review_id`, `product_id`),
  INDEX `fk_product_id_idx` (`product_id` ASC),
  CONSTRAINT `fk_reviewCY_id`
    FOREIGN KEY (`review_id`)
    REFERENCES `bobaexplorer_x86`.`REVIEW_FROM_YELP` (`review_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_productCY_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `bobaexplorer_x86`.`PRODUCT` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bobaexplorer_x86`.`adds`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bobaexplorer_x86`.`adds` (
  `user_id` INT NOT NULL,
  `review_id` INT NOT NULL,
  PRIMARY KEY (`review_id`),
  INDEX `fk_user_id_idx` (`user_id` ASC),
  CONSTRAINT `fk_userA_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `bobaexplorer_x86`.`USER` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_reviewA_id`
    FOREIGN KEY (`review_id`)
    REFERENCES `bobaexplorer_x86`.`REVIEW_FROM_USER` (`review_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
