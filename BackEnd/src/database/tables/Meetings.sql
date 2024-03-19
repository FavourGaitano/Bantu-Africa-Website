CREATE TABLE Meetings (
    ConferenceId VARCHAR(255) PRIMARY KEY,
    Description VARCHAR(700),
    ConferenceRoomName VARCHAR(100),
    Image VARCHAR(255),
    Price DECIMAL(10, 2),
    PackageId VARCHAR(255),
    Quantity INT, 
    CONSTRAINT fk_meeting_package FOREIGN KEY (PackageId) REFERENCES MeetingPackages(PackageId)
);

ALTER TABLE Meetings
ADD Quantity INT;
