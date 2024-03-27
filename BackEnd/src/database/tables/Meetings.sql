CREATE TABLE Meetings (
    ConferenceId VARCHAR(255) PRIMARY KEY,
    Description VARCHAR(700),
    ConferenceRoomName VARCHAR(100),
    Image VARCHAR(255),
    Price DECIMAL(10, 2),
    Quantity INT
);

ALTER TABLE Meetings
ADD Quantity INT;

DROP TABLE Meetings
SELECT Meetings. *, MeetingPackages.PackageName AS PackageName
FROM Meetings
JOIN MeetingPackages ON Meetings.PackageId = MeetingPackages.PackageId
WHERE Meetings.ConferenceId = @ConferenceId;