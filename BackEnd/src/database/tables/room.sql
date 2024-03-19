
-- CREATE DATABASE BANTURESORT
-- USE BANTURESORT

CREATE TABLE tbl_room (
    RoomID VARCHAR(255) PRIMARY KEY,
    RoomName VARCHAR(255),
    RoomNumber INT,
    Description VARCHAR(255),
    RoomCategory VARCHAR(255),
    CreatedAt DATETIME
);