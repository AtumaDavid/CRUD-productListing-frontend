"use client";
import Image from "next/image";
import Link from "next/link";
import ProductList from "./components/ProductList";
import { useState } from "react";
import AddProductModal from "./components/AddProductModal";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<
    {
      name: string;
      price: string;
      description: string;
      category: string;
      image: File | null;
    }[]
  >([]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const addProduct = (product: {
    name: string;
    price: string;
    description: string;
    category: string;
    image: File | null;
  }) => {
    setProducts([...products, product]);
  };

  return (
    <main className="flex flex-col items-center text-center min-h-screen justify-center ">
      <div className="border border-blue-500 p-5 rounded-lg">
        <h1 className="text-3xl font-bold mb-8">Product Listing</h1>
        <button
          onClick={openModal}
          className="mb-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-600"
        >
          Add New Product
        </button>
        <ProductList products={products} />
        <AddProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onAddProduct={addProduct}
        />
      </div>
    </main>
  );
}
