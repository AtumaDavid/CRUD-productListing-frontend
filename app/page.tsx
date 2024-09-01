"use client";
import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import AddProductModal from "./components/AddProductModal";
import {
  openDB,
  Product,
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "./lib/storage";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [editingProductIndex, setEditingProductIndex] = useState<number | null>(
    null
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    openDB()
      .then(() => {
        loadProducts();
      })
      .catch((error) => {
        console.error("Error opening database:", error);
      });
  }, []);

  const loadProducts = async () => {
    try {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const openModal = (product: Product | null = null) => {
    setCurrentProduct(product);
    setModalOpen(true);
    setEditingProductIndex(
      product ? products.findIndex((p) => p.id === product.id) : null
    );
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentProduct(null);
  };

  const handleAddProduct = async (product: Product) => {
    try {
      const id = await addProduct(product);
      setProducts((prev) => [...prev, { ...product, id }]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
    closeModal();
  };

  const handleEditProduct = async (product: Product) => {
    try {
      if (editingProductIndex !== null && currentProduct?.id) {
        await updateProduct(currentProduct.id, product);
        setProducts((prev) => {
          const updatedProducts = [...prev];
          updatedProducts[editingProductIndex] = {
            ...product,
            id: currentProduct.id,
          };
          return updatedProducts;
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
    closeModal();
  };

  const handleDeleteProduct = async (index: number) => {
    try {
      const productId = products[index].id;
      if (productId) {
        await deleteProduct(productId);
        setProducts((prev) => prev.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <main className="flex flex-col items-center text-center min-h-screen justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Product Listing</h1>
        <button
          onClick={() => openModal()}
          className="mb-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Product
        </button>
        <ProductList
          products={products}
          onEdit={(index, product) => openModal(product)}
          onDelete={handleDeleteProduct}
        />
        <AddProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onAddProduct={handleAddProduct}
          onEditProduct={handleEditProduct}
          initialProduct={currentProduct}
        />
      </div>
    </main>
  );
}
