// lib/db.ts

let db: IDBDatabase;

export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("productApp", 1);

    request.onerror = (event) => {
      console.error("Database error:", (event.target as IDBRequest).error);
      reject((event.target as IDBRequest).error);
    };

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      console.log("Database opened successfully");
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      const objectStore = db.createObjectStore("products", {
        keyPath: "id",
        autoIncrement: true,
      });
      objectStore.createIndex("name", "name", { unique: false });
      objectStore.createIndex("price", "price", { unique: false });
      objectStore.createIndex("description", "description", { unique: false });
      objectStore.createIndex("category", "category", { unique: false });
      objectStore.createIndex("image", "image", { unique: false });
    };
  });
}

export interface Product {
  id?: number;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

export function addProduct(product: Product): Promise<number> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["products"], "readwrite");
    const objectStore = transaction.objectStore("products");

    const request = objectStore.add(product);

    request.onsuccess = (event) => {
      console.log(
        "Product added:",
        (event.target as IDBRequest<number>).result
      );
      resolve((event.target as IDBRequest<number>).result);
    };

    request.onerror = (event) => {
      console.error(
        "Error adding product:",
        (event.target as IDBRequest).error
      );
      reject((event.target as IDBRequest).error);
    };
  });
}

export function getAllProducts(): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["products"], "readonly");
    const objectStore = transaction.objectStore("products");

    const request = objectStore.getAll();

    request.onsuccess = (event) => {
      console.log(
        "All products:",
        (event.target as IDBRequest<Product[]>).result
      );
      resolve((event.target as IDBRequest<Product[]>).result);
    };

    request.onerror = (event) => {
      console.error(
        "Error reading products:",
        (event.target as IDBRequest).error
      );
      reject((event.target as IDBRequest).error);
    };
  });
}

export function updateProduct(
  id: number,
  updatedData: Partial<Product>
): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["products"], "readwrite");
    const objectStore = transaction.objectStore("products");

    const request = objectStore.get(id);

    request.onsuccess = (event) => {
      const data = (event.target as IDBRequest<Product>).result;

      if (data) {
        const updatedProduct = { ...data, ...updatedData };

        const updateRequest = objectStore.put(updatedProduct);
        updateRequest.onsuccess = () => {
          console.log("Product updated");
          resolve();
        };

        updateRequest.onerror = (event) => {
          console.error(
            "Error updating product:",
            (event.target as IDBRequest).error
          );
          reject((event.target as IDBRequest).error);
        };
      } else {
        reject("Product not found");
      }
    };

    request.onerror = (event) => {
      console.error(
        "Error finding product:",
        (event.target as IDBRequest).error
      );
      reject((event.target as IDBRequest).error);
    };
  });
}

export function deleteProduct(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["products"], "readwrite");
    const objectStore = transaction.objectStore("products");

    const request = objectStore.delete(id);

    request.onsuccess = () => {
      console.log("Product deleted");
      resolve();
    };

    request.onerror = (event) => {
      console.error(
        "Error deleting product:",
        (event.target as IDBRequest).error
      );
      reject((event.target as IDBRequest).error);
    };
  });
}
