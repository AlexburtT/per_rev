// src/lib/db/proxy.ts

import { DB_NAME, DB_VERSION, STORES } from "./schema";
import type { StoreName, StoreValue } from "./schema";

let dbInstance: IDBDatabase | null = null;

function promisifyRequest<T>(request: IDBRequest<T>): Promise<T> {
	return new Promise((resolve, reject) => {
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

function openDatabase(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;

			// Создаём хранилища и индексы только если их ещё нет
			if (!db.objectStoreNames.contains(STORES.USERS)) {
				db.createObjectStore(STORES.USERS, { keyPath: "id" });
			}
			if (!db.objectStoreNames.contains(STORES.CYCLES)) {
				db.createObjectStore(STORES.CYCLES, { keyPath: "id" });
			}
			if (!db.objectStoreNames.contains(STORES.TASKS)) {
				const store = db.createObjectStore(STORES.TASKS, {
					keyPath: "id",
				});
				store.createIndex("byAssignedTo", "assignedTo");
				store.createIndex("byDepartment", "department");
			}
			if (!db.objectStoreNames.contains(STORES.GOALS)) {
				const store = db.createObjectStore(STORES.GOALS, {
					keyPath: "id",
				});
				store.createIndex("byAuthor", "authorId");
				store.createIndex("byCycle", "cycleId");
			}
			if (!db.objectStoreNames.contains(STORES.SELF_REVIEWS)) {
				const store = db.createObjectStore(STORES.SELF_REVIEWS, {
					keyPath: "id",
				});
				store.createIndex("byEmployee", "employeeId");
				store.createIndex("byCycle", "cycleId");
			}
			if (!db.objectStoreNames.contains(STORES.PEER_ASSIGNMENTS)) {
				const store = db.createObjectStore(STORES.PEER_ASSIGNMENTS, {
					keyPath: "id",
				});
				store.createIndex("byReviewer", "reviewerId");
				store.createIndex("byEmployee", "employeeId");
				store.createIndex("byCycle", "cycleId");
			}
			// Остальные — без индексов
			const simpleStores = [
				STORES.PEER_REVIEWS,
				STORES.MANAGER_REVIEWS,
				STORES.POTENTIAL_ASSESSMENTS,
				STORES.EMPLOYEE_REVIEWS,
			] as const;

			for (const name of simpleStores) {
				if (!db.objectStoreNames.contains(name)) {
					db.createObjectStore(name, { keyPath: "id" });
				}
			}
		};

		request.onsuccess = () => {
			resolve(request.result);
		};

		request.onerror = () => {
			reject(request.error);
		};
	});
}

async function getDB(): Promise<IDBDatabase> {
	if (!dbInstance) {
		dbInstance = await openDatabase();
	}
	return dbInstance;
}

// === Базовые операции ===

export async function getAll<T extends StoreName>(
	storeName: T
): Promise<StoreValue<T>[]> {
	const db = await getDB();
	const transaction = db.transaction(storeName, "readonly");
	const store = transaction.objectStore(storeName);
	const request = store.getAll();
	return await promisifyRequest(request);
}

export async function getOne<T extends StoreName>(
	storeName: T,
	key: string
): Promise<StoreValue<T> | undefined> {
	const db = await getDB();
	const transaction = db.transaction(storeName, "readonly");
	const store = transaction.objectStore(storeName);
	const request = store.get(key);
	const result = await promisifyRequest(request);
	return result || undefined;
}

export async function put<T extends StoreName>(
	storeName: T,
	value: StoreValue<T>
): Promise<string> {
	const db = await getDB();
	const transaction = db.transaction(storeName, "readwrite");
	const store = transaction.objectStore(storeName);
	const request = store.put(value);
	const key = await promisifyRequest(request);
	return String(key);
}

export async function del<T extends StoreName>(
	storeName: T,
	key: string
): Promise<void> {
	const db = await getDB();
	const transaction = db.transaction(storeName, "readwrite");
	const store = transaction.objectStore(storeName);
	const request = store.delete(key);
	await promisifyRequest(request);
}

// === Индексированные запросы ===

export async function getByIndex<T extends StoreName>(
	storeName: T,
	indexName: string,
	key: string
): Promise<StoreValue<T>[]> {
	const db = await getDB();
	const transaction = db.transaction(storeName, "readonly");
	const store = transaction.objectStore(storeName);
	const index = store.index(indexName);
	const request = index.getAll(key);
	return await promisifyRequest(request);
}

// === Утилиты ===

export async function clearAllStores(): Promise<void> {
	const db = await getDB();
	const storeNames = Object.values(STORES);
	const transaction = db.transaction(storeNames, "readwrite");
	for (const name of storeNames) {
		const store = transaction.objectStore(name);
		store.clear();
	}
	await promisifyRequest(
		transaction.db
			.transaction(storeNames, "readonly")
			.objectStore(storeNames[0])
			.getAll()
	);
}

export async function destroyDB(): Promise<void> {
	if (dbInstance) {
		dbInstance.close();
		dbInstance = null;
	}
	const deleteReq = indexedDB.deleteDatabase(DB_NAME);
	return new Promise((resolve, reject) => {
		deleteReq.onsuccess = () => resolve();
		deleteReq.onerror = () => reject(deleteReq.error);
	});
}
