import Link from "next/link";
import React, { useState } from "react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: {
    name: string;
    price: string;
    description: string;
    category: string;
    image: File | null;
  }) => void;
}

export default function AddProductModal({
  isOpen,
  onClose,
  onAddProduct,
}: AddProductModalProps) {
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [productImage, setProductImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductImage(e.target.files[0]);
    }
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  //   console.log("Product added:", {
  //     productName,
  //     productPrice,
  //     productDescription,
  //     productCategory,
  //     productImage,
  //   });
  //   onClose();
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct({
      name: productName,
      price: productPrice,
      description: productDescription,
      category: productCategory,
      image: productImage,
    });
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          {/* product name */}
          <div className="mb-4">
            <label
              className="block text-left text-gray-700 font-medium mb-2"
              htmlFor="productName"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {/* product price */}
          <div className="mb-4">
            <label
              className="block text-left text-gray-700 font-medium mb-2"
              htmlFor="productPrice"
            >
              Product Price
            </label>
            <input
              type="text"
              id="productPrice"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {/* prpoduct description */}
          <div className="mb-4">
            <label
              className="block text-left text-gray-700 font-medium mb-2"
              htmlFor="productDescription"
            >
              Product Description
            </label>
            <textarea
              id="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows={3}
              required
            ></textarea>
          </div>
          {/* product category */}
          <div className="mb-4">
            <label
              className="block text-left text-gray-700 font-medium mb-2"
              htmlFor="productCategory"
            >
              Product Category
            </label>
            <input
              type="text"
              id="productCategory"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {/* prpoduct image */}
          <div className="mb-4">
            <label
              className="block text-left text-gray-700 font-medium mb-2"
              htmlFor="productImage"
            >
              Product Image
            </label>
            <input
              type="file"
              id="productImage"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {/* buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
