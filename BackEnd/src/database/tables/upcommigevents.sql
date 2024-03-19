CREATE TABLE upCommingEvent (
    upcommingEventId VARCHAR(255) PRIMARY KEY,
    Name VARCHAR(100),
    Description VARCHAR(700),
    PosterUrl VARCHAR(255),
    Date VARCHAR(255),
    CreatedAt DATE NOT NULL,
);

SELECT * FROM upCommingEvent
Drop Table upCommingEvent

ALTER TABLE upCommingEvent
ADD CONSTRAINT DF_Event_created_at DEFAULT (GETDATE()) FOR CreatedAt;