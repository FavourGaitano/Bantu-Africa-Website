CREATE TABLE tbl_activity (
    ActivityId VARCHAR(255) PRIMARY KEY,
    ActivityName VARCHAR(255),
    Description VARCHAR(255),
    Category VARCHAR(255),
    ImageUrl VARCHAR(255)
)

SELECT * FROM tbl_activity WHERE Category = 'kids';


select * from tbl_activity