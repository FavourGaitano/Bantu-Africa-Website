CREATE TABLE tbl_other_service (
    OtherServiceId VARCHAR(255) PRIMARY KEY,
    OtherServiceName VARCHAR(255),
    Description VARCHAR(MAX),
    ImageUrl VARCHAR(255),
    CreatedAt DATETIME
);

select * from  tbl_other_service
