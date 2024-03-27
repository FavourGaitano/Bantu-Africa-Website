import React, { useState } from 'react';
import { useGetOffersQuery, useAddOfferMutation, useDeleteOfferMutation, useUpdateOfferMutation } from '../../features/offers/offerApi.js';

const AdminOffersPage = () => {
  const { data: offers, error, isLoading } = useGetOffersQuery();
  const [showModal, setShowModal] = useState(false);
  const [newOfferImageUrl, setNewOfferImageUrl] = useState('');
  const [selectedOffer, setSelectedOffer] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
    setSelectedOffer(null); 
  };

  const handleInputChange = (e) => {
    setNewOfferImageUrl(e.target.value);
  };

  const handleUpdate = (offer) => {
    setSelectedOffer(offer);
    setNewOfferImageUrl(offer.OfferImageUrl);
    toggleModal();
  };

  const handleDelete = async (OfferId) => {
    try {
      await deleteOffer(OfferId);
    } catch (error) {
      console.error('Error deleting offer:', error);
      // Handle error
    }
  };

  const [addOffer, { isLoading: isAddingOffer }] = useAddOfferMutation();
  const [deleteOffer] = useDeleteOfferMutation();
  const [updateOffer] = useUpdateOfferMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedOffer) {
        await updateOffer({ OfferId: selectedOffer.OfferId, OfferImageUrl: newOfferImageUrl });
      } else {
        await addOffer({ OfferImageUrl: newOfferImageUrl });
      }
      setNewOfferImageUrl(''); 
      toggleModal();
    } catch (error) {
      console.error('Error adding/updating offer:', error);
      // Handle error
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Admin Offers Page</h2>
      <button onClick={toggleModal}>Add Offer</button>
      <table>
        <thead>
          <tr>
            <th>Image URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.OfferId}>
              <td>{offer.OfferImageUrl}</td>
              <td>
                <button onClick={() => handleDelete(offer.OfferId)}>Delete</button>
                <button onClick={() => handleUpdate(offer)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div>
          <h3>{selectedOffer ? 'Update Offer' : 'Add New Offer'}</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" value={newOfferImageUrl} onChange={handleInputChange} placeholder="Offer Image URL" />
            <button type="submit" disabled={isAddingOffer}>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminOffersPage;
