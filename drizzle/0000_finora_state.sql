CREATE TABLE `finance_states` (
	`user_id` text PRIMARY KEY NOT NULL,
	`payload` text DEFAULT '{"transactions":[],"budgets":[],"goals":[]}' NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
