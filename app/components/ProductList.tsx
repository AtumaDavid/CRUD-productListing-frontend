import React from "react";
import { Product } from "../lib/storage";

interface ProductListProps {
  products: Product[];
  onEdit: (index: number, product: Product) => void;
  onDelete: (index: number) => void;
}

export default function ProductList({
  products,
  onEdit,
  onDelete,
}: ProductListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-2">₦{product.price}</p>
          <p className="text-gray-800 mb-2">{product.description}</p>
          <p className="text-gray-500 mb-2">{product.category}</p>
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg mb-2"
            />
          )}
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => onEdit(index, product)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(index)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
