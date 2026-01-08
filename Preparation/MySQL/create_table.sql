CREATE TABLE IF NOT EXISTS `databaseName`.`table_name` (
`index` INT NOT NULL AUTO_INCREMENT,
`Category` VARCHAR(30) NOT NULL,
`Description` LONGTEXT NULL,
PRIMARY KEY (`index`),
INDEX `Category`(`Category` ASC));
