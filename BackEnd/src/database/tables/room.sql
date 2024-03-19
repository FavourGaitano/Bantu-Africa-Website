
-- CREATE DATABASE BANTURESORT
-- USE BANTURESORT



CREATE TABLE RoomCategory (
    RoomCategoryId VARCHAR(255) PRIMARY KEY,
    Name VARCHAR(255),
    Price DECIMAL(10,2),
    Size VARCHAR(255),
    MealPlan VARCHAR(255),
    IsDeleted BIT DEFAULT 0
);
DROP TABLE RoomCategory


CREATE TABLE Room (
    RoomId VARCHAR(255) PRIMARY KEY,
    RoomPhotoUrl VARCHAR(255),
    RoomNumber INT,
    Description VARCHAR(255),
    RoomCategoryId VARCHAR(255),
    OfferId VARCHAR(255),
    Occupants VARCHAR(100),
    CreatedAt DATETIME,
    FOREIGN KEY (RoomCategoryId) REFERENCES RoomCategory(RoomCategoryId),
    FOREIGN KEY (OfferId) REFERENCES Offer(OfferId),
    isAvailable BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0
);

DROP TABLE ROOM

CREATE TABLE Offer (
    OfferId VARCHAR(255) PRIMARY KEY,
    OfferImageUrl VARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE()   
);