import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-4">
        Have questions or need assistance? Feel free to reach out to us using the form below.
      </p>

      <div className="mb-4 p-4 border rounded-lg bg-gray-100">
        <h2 className="text-lg font-semibold text-gray-700">Contact Details</h2>
        <p className="text-gray-600"><strong>Name:</strong> Nikhil Singh</p>
        <p className="text-gray-600"><strong>Phone:</strong> 8840791221</p>
        <p className="text-gray-600"><strong>Email:</strong> nikhilsingh14k@gmail.com</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg h-24"
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
