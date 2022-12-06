CREATE DATABASE IF NOT EXISTS `todo`;

CREATE TABLE IF NOT EXISTS `todo`(
    todo_id: INT PRIMARY KEY,
    title: VARCHAR(255),
    task: VARCHAR(255),
    time: VARCHAR(255),
)

