import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const BuyedItems = () => {
  const [buyedItems, setBuyedItems] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchBuyed = async () => {
      if (!userId || !token) return;
      try {
        const response = await fetch(`/api/buyed/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setBuyedItems(data);
        }
      } catch (err) {}
    };
    fetchBuyed();
  }, [userId, token]);

  return (
    <div style={{ background: "#181e27", minHeight: "100vh" }}>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-extrabold tracking-tight mb-8" style={{ color: "#fff" }}>
          📦 Buyed Items
        </h2>
        {buyedItems.length === 0 ? (
          <p className="text-gray-400">No items purchased yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {buyedItems.map((item) => (
              <div key={item._id} className="border border-gray-800 rounded-2xl p-4 bg-[#232f3e] shadow-lg flex flex-col items-center">
                {item.photo && (
                  <img
                    src={`http://localhost:5000${item.photo}`}
                    alt={item.name}
                    style={{
                      width: 120,
                      height: 120,
                      objectFit: 'cover',
                      marginBottom: 16,
                      borderRadius: 12,
                      background: "#181e27"
                    }}
                  />
                )}
                <h4 className="font-bold text-lg mb-1" style={{ color: "#fff" }}>{item.name}</h4>
                <p className="text-sm text-gray-300 capitalize mb-2">{item.category}</p>
                <p className="text-xl font-semibold mb-2" style={{ color: "#f7b42c" }}>₹{item.price}</p>
                <p className="text-sm text-gray-400">
                  Purchased on: {item.purchasedAt ? new Date(item.purchasedAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyedItems;