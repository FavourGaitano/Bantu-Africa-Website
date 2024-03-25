CREATE TABLE Offer (
    OfferId VARCHAR(255) PRIMARY KEY,
    OfferImageUrl VARCHAR(255) NOT NULL
);

select * from Offer

drop table Offers

DELETE FROM Offer
WHERE OfferId = 'd85bda0f-235d-4c50-b809-378801a53013';
