import Image from "next/image";
import React, { useState } from "react";

interface Product {
  name: string;
  price: string;
  description: string;
  category: string;
  image: File | null;
}

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product, index) => (
        <div key={index} className="border p-4 rounded-lg">
          <div className="relative w-[150px] h-[150px] mb-4 mx-auto">
            {product.image && !imageErrors[index] ? (
              <Image
                src={URL.createObjectURL(product.image)}
                alt={product.name}
                fill
                className="object-cover rounded"
                onError={() => handleImageError(index)}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p className="text-gray-700">{product.price}</p>
          <p className="text-gray-500">{product.category}</p>
          <p className="text-gray-600 mt-2">{product.description}</p>
        </div>
      ))}
    </div>
  );
}
