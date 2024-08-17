CREATE TABLE progress_bars (
	id SERIAL PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	hours INT NOT NULL,
	minutes INT NOT NULL,
	seconds INT NOT NULL,
	current_color VARCHAR(10) NOT NULL,
	completion_color VARCHAR(10) NOT NULL,
	unreached_color VARCHAR(10) NOT NULL,
	reachedTime VARCHAR(100) NOT NULL
);

INSERT INTO progress_bars (title, hours, minutes, seconds, current_color, completion_color, unreached_color, reachedTime) 
VALUES ('5 Hour Timer', 5, 0, 0, 'lightgray', '#4caf50', 'darkgray', '00:00:00')