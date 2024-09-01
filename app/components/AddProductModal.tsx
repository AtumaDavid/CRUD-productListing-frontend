import React, { useState, useEffect } from "react";
import { Product } from "../lib/storage";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  initialProduct: Product | null;
}

const initialProductState: Product = {
  name: "",
  price: "",
  description: "",
  category: "",
  image: "",
};

export default function AddProductModal({
  isOpen,
  onClose,
  onAddProduct,
  onEditProduct,
  initialProduct,
}: AddProductModalProps) {
  const [product, setProduct] = useState<Product>(initialProductState);

  useEffect(() => {
    if (isOpen) {
      if (initialProduct) {
        setProduct(initialProduct);
      } else {
        setProduct(initialProductState);
      }
    }
  }, [isOpen, initialProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "price") {
      // Only allow numeric input for price
      const numericValue = value.replace(/[^0-9.]/g, "");
      setProduct((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setProduct((prev) => ({
            ...prev,
            image: result as string,
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialProduct) {
      onEditProduct(product);
    } else {
      onAddProduct(product);
    }
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">
            {initialProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col items-start">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4 flex flex-col items-start">
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="text"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
                pattern="^\d*\.?\d*$"
                title="Please enter a valid number"
              />
            </div>
            <div className="mb-4 flex flex-col items-start">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded resize-none"
                rows={3}
                required
              />
            </div>
            <div className="mb-4 flex flex-col items-start">
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4 flex flex-col items-start">
              <label className="block text-sm font-medium mb-1">Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full"
              />
              {product.image && (
                <img
                  src={product.image}
                  alt="Product"
                  className="mt-2 max-h-48"
                />
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {initialProduct ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
