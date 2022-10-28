USE db;
CREATE TABLE IF NOT EXISTS `salary_expenses_date` (
  `users_id` INT NOT NULL,
  `salary` INT,
  `date_of_salary` DATE,
  `housing` INT,
  `utilities` INT,
  `transportation` INT,
  `food` INT,
  `grocories` INT,
  `entertainment` INT,
  `healthcare` INT,
  `others` INT,
  FOREIGN KEY (users_id) REFERENCES users(id)
); 
