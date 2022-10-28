USE db;
CREATE TABLE IF NOT EXISTS `goals` (
  `users_id` INT NOT NULL,
  `goal_name` VARCHAR(255),
  `goal_price` VARCHAR(255),
  `goal_monthly_savings` VARCHAR(255),
  `curr_amount` VARCHAR(255),
  `goal_period` INT,
  FOREIGN KEY (users_id) REFERENCES users(id)
); 
