import React, { useState, useEffect } from 'react';

const ContactForm = ({ onSubmit, initialContact }) => {
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    // Set contact details when initialContact prop changes (for editing)
    if (initialContact) {
      setContact(initialContact);
    }
  }, [initialContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(contact);
    setContact({ name: '', email: '', phone: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={contact.name} onChange={handleChange} required />
      <label>Email:</label>
      <input type="email" name="email" value={contact.email} onChange={handleChange} required />
      <label>Phone:</label>
      <input type="tel" name="phone" value={contact.phone} onChange={handleChange} required />
      <button type="submit">{initialContact ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default ContactForm;
