"use client";
import { useEffect, useState } from "react";

export default function CustomerDetailPage({ params }) {
  const { id } = params; // Access the dynamic id parameter directly
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    memberNumber: "",
    interests: "",
  });

  useEffect(() => {
    // Fetch customer data when the component mounts
    const fetchCustomer = async () => {
      try {
        const res = await fetch(`/api/customer/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch customer data");
        }
        const data = await res.json();

        // Format dateOfBirth to YYYY-MM-DD format
        const formattedDateOfBirth = new Date(data.data.dateOfBirth).toISOString().split("T")[0];
        
        setCustomer(data.data);
        setFormData({
          name: data.data.name,
          dateOfBirth: formattedDateOfBirth,
          memberNumber: data.data.memberNumber,
          interests: data.data.interests,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/customer/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update customer: ${response.status}`);
      }

      alert("Customer updated successfully");
      setIsEditing(false);
      window.location.href = "/customer"; // Redirect to the customer list page after updating
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/customer/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete the customer");
      }
      alert("Customer deleted successfully");
      window.location.href = "/customer"; // Redirect to the customer list page after deletion
    } catch (err) {
      console.error(err.message);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setFormData({
      name: customer.name,
      dateOfBirth: new Date(customer.dateOfBirth).toISOString().split("T")[0],
      memberNumber: customer.memberNumber,
      interests: customer.interests,
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
      {customer && !isEditing ? (
        <div>
          <h2 className="text-xl font-semibold">{customer.name}</h2>
          <p className="text-gray-700">Date of Birth: {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
          <p className="text-gray-700">Member Number: {customer.memberNumber}</p>
          <p className="text-gray-700">Interests: {customer.interests}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded mr-2"
          >
            Edit Customer
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
          >
            Delete Customer
          </button>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
          <div>Name:</div>
          <div>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="border border-black w-full"
              required
            />
          </div>
          <div>Date of Birth:</div>
          <div>
            <input
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="border border-black w-full"
              required
            />
          </div>
          <div>Member Number:</div>
          <div>
            <input
              name="memberNumber"
              type="number"
              value={formData.memberNumber}
              onChange={handleInputChange}
              className="border border-black w-full"
              required
            />
          </div>
          <div>Interests:</div>
          <div>
            <input
              name="interests"
              type="text"
              value={formData.interests}
              onChange={handleInputChange}
              className="border border-black w-full"
              required
            />
          </div>
          <div className="col-span-2 flex gap-4">
            <input
              type="submit"
              value="Save Changes"
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full"
            />
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}