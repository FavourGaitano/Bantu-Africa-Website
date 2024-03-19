CREATE DATABASE BantuAfrica

USE BantuAfrica

CREATE TABLE Bookings (
    BookingId VARCHAR(255) PRIMARY KEY,
    Email VARCHAR(255),
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    RoomId VARCHAR(255),
    SpecialRequirements VARCHAR,
    CreatedAt DATETIME,
    StartDate DATE,
    EndDate DATE,
    AdultsNo INT,
    KidsNo INT,
    Total INT,
    IsReserved BIT DEFAULT 0,
    IsPaid BIT DEFAULT 0,
    FOREIGN KEY(RoomId) REFERENCES Room(RoomId)
)
