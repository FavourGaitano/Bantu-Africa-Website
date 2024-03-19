CREATE TABLE Gallery (
    PictureId VARCHAR(255) PRIMARY KEY,
   Description VARCHAR(100),
    Category VARCHAR(255),
   CreatedAt DATE NOT NULL, 
   PictureUrl VARCHAR(255)
    
);

ALTER TABLE Gallery
ADD CONSTRAINT DF_Picture_created_at DEFAULT (GETDATE()) FOR CreatedAt;

DROP TABLE Gallery

Select * FROM Gallery Where Category = 'accommodation';
