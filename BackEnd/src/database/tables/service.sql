CREATE TABLE tbl_service (
    ServiceId VARCHAR(255) PRIMARY KEY,
    ServiceName VARCHAR(255),
    Description VARCHAR(255),
    ImageUrl VARCHAR(255),
    CreatedAt DATETIME
);

SELECT * FROM tbl_service