// src/database.ts
// import { ref, set, push, onValue, Unsubscribe } from "firebase/database";
// import { db } from "./firebaseConfig";

// // Define the structure of an item
// interface Item {
//   id?: string;
//   name: string;
//   description: string;
// }

// // Function to add an item
// export const addItem = async (
//   name: string,
//   description: string
// ): Promise<void> => {
//   const itemRef = push(ref(db, "items"));
//   await set(itemRef, {
//     name,
//     description,
//   });
// };

// // Function to listen to items
// export const getItems = (callback: (items: Item[]) => void): Unsubscribe => {
//   const itemsRef = ref(db, "items");
//   const unsubscribe = onValue(itemsRef, (snapshot) => {
//     const data = snapshot.val();
//     const items: Item[] = data
//       ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
//       : [];
//     callback(items);
//   });
//   return unsubscribe;
// };
