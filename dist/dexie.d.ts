/*
 * Dexie.js - a minimalistic wrapper for IndexedDB
 * ===============================================
 *
 * By David Fahlander, david.fahlander@gmail.com
 *
 * Version 4.0.1-alpha.14, Wed May 31 2023
 *
 * https://dexie.org
 *
 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/
 */
 // Generated by dts-bundle-generator v5.9.0

export interface IndexSpec {
	name: string;
	keyPath: string | Array<string> | undefined;
	unique: boolean | undefined;
	multi: boolean | undefined;
	auto: boolean | undefined;
	compound: boolean | undefined;
	src: string;
}
export interface TableSchema {
	name: string;
	primKey: IndexSpec;
	indexes: IndexSpec[];
	mappedClass: Function;
	idxByName: {
		[name: string]: IndexSpec;
	};
	readHook?: (x: any) => any;
}
export type IndexableTypePart = string | number | Date | ArrayBuffer | ArrayBufferView | DataView | Array<Array<void>>;
export type IndexableTypeArray = Array<IndexableTypePart>;
export type IndexableTypeArrayReadonly = ReadonlyArray<IndexableTypePart>;
export type IndexableType = IndexableTypePart | IndexableTypeArrayReadonly;
export interface DexieEvent {
	subscribers: Function[];
	fire(...args: any[]): any;
	subscribe(fn: (...args: any[]) => any): void;
	unsubscribe(fn: (...args: any[]) => any): void;
}
export interface DexieEventSet {
	(eventName: string): DexieEvent; // To be able to unsubscribe.
	addEventType(eventName: string, chainFunction?: (f1: Function, f2: Function) => Function, defaultFunction?: Function): DexieEvent;
	addEventType(events: {
		[eventName: string]: ("asap" | [
			(f1: Function, f2: Function) => Function,
			Function
		]);
	}): DexieEvent;
}
export interface TransactionEvents extends DexieEventSet {
	(eventName: "complete", subscriber: () => any): void;
	(eventName: "abort", subscriber: () => any): void;
	(eventName: "error", subscriber: (error: any) => any): void;
	complete: DexieEvent;
	abort: DexieEvent;
	error: DexieEvent;
}
export interface Transaction {
	db: Dexie;
	active: boolean;
	mode: IDBTransactionMode;
	//tables: { [type: string]: Table<any, any> }; Deprecated since 2.0. Obsolete from v3.0.
	storeNames: Array<string>;
	explicit?: boolean;
	parent?: Transaction;
	on: TransactionEvents;
	abort(): void;
	table(tableName: string): Table<any, any>;
	table<T>(tableName: string): Table<T, any>;
	table<T, Key>(tableName: string): Table<T, Key>;
}
export interface CreatingHookContext<T, Key> {
	onsuccess?: (primKey: Key) => void;
	onerror?: (err: any) => void;
}
export interface UpdatingHookContext<T, Key> {
	onsuccess?: (updatedObj: T) => void;
	onerror?: (err: any) => void;
}
export interface DeletingHookContext<T, Key> {
	onsuccess?: () => void;
	onerror?: (err: any) => void;
}
export interface TableHooks<T = any, TKey = IndexableType> extends DexieEventSet {
	(eventName: "creating", subscriber: (this: CreatingHookContext<T, TKey>, primKey: TKey, obj: T, transaction: Transaction) => void | undefined | TKey): void;
	(eventName: "reading", subscriber: (obj: T) => T | any): void;
	(eventName: "updating", subscriber: (this: UpdatingHookContext<T, TKey>, modifications: Object, primKey: TKey, obj: T, transaction: Transaction) => any): void;
	(eventName: "deleting", subscriber: (this: DeletingHookContext<T, TKey>, primKey: TKey, obj: T, transaction: Transaction) => any): void;
	creating: DexieEvent;
	reading: DexieEvent;
	updating: DexieEvent;
	deleting: DexieEvent;
}
export type ThenShortcut<T, TResult> = (value: T) => TResult | PromiseLike<TResult>;
export interface WhereClause<T = any, TKey = IndexableType> {
	above(key: any): Collection<T, TKey>;
	aboveOrEqual(key: any): Collection<T, TKey>;
	anyOf(keys: ReadonlyArray<IndexableType>): Collection<T, TKey>;
	anyOf(...keys: Array<IndexableType>): Collection<T, TKey>;
	anyOfIgnoreCase(keys: string[]): Collection<T, TKey>;
	anyOfIgnoreCase(...keys: string[]): Collection<T, TKey>;
	below(key: any): Collection<T, TKey>;
	belowOrEqual(key: any): Collection<T, TKey>;
	between(lower: any, upper: any, includeLower?: boolean, includeUpper?: boolean): Collection<T, TKey>;
	equals(key: IndexableType): Collection<T, TKey>;
	equalsIgnoreCase(key: string): Collection<T, TKey>;
	inAnyRange(ranges: ReadonlyArray<{
		0: any;
		1: any;
	}>, options?: {
		includeLowers?: boolean;
		includeUppers?: boolean;
	}): Collection<T, TKey>;
	startsWith(key: string): Collection<T, TKey>;
	startsWithAnyOf(prefixes: string[]): Collection<T, TKey>;
	startsWithAnyOf(...prefixes: string[]): Collection<T, TKey>;
	startsWithIgnoreCase(key: string): Collection<T, TKey>;
	startsWithAnyOfIgnoreCase(prefixes: string[]): Collection<T, TKey>;
	startsWithAnyOfIgnoreCase(...prefixes: string[]): Collection<T, TKey>;
	noneOf(keys: ReadonlyArray<IndexableType>): Collection<T, TKey>;
	notEqual(key: IndexableType): Collection<T, TKey>;
}
export interface PromiseExtendedConstructor extends PromiseConstructor {
	readonly prototype: PromiseExtended;
	new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): PromiseExtended<T>;
	all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [
		T1 | PromiseLike<T1>,
		T2 | PromiseLike<T2>,
		T3 | PromiseLike<T3>,
		T4 | PromiseLike<T4>,
		T5 | PromiseLike<T5>,
		T6 | PromiseLike<T6>,
		T7 | PromiseLike<T7>,
		T8 | PromiseLike<T8>,
		T9 | PromiseLike<T9>,
		T10 | PromiseLike<T10>
	]): PromiseExtended<[
		T1,
		T2,
		T3,
		T4,
		T5,
		T6,
		T7,
		T8,
		T9,
		T10
	]>;
	all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [
		T1 | PromiseLike<T1>,
		T2 | PromiseLike<T2>,
		T3 | PromiseLike<T3>,
		T4 | PromiseLike<T4>,
		T5 | PromiseLike<T5>,
		T6 | PromiseLike<T6>,
		T7 | PromiseLike<T7>,
		T8 | PromiseLike<T8>,
		T9 | PromiseLike<T9>
	]): PromiseExtended<[
		T1,
		T2,
		T3,
		T4,
		T5,
		T6,
		T7,
		T8,
		T9
	]>;
	all<T1, T2, T3, T4, T5, T6, T7, T8>(values: [
		T1 | PromiseLike<T1>,
		T2 | PromiseLike<T2>,
		T3 | PromiseLike<T3>,
		T4 | PromiseLike<T4>,
		T5 | PromiseLike<T5>,
		T6 | PromiseLike<T6>,
		T7 | PromiseLike<T7>,
		T8 | PromiseLike<T8>
	]): PromiseExtended<[
		T1,
		T2,
		T3,
		T4,
		T5,
		T6,
		T7,
		T8
	]>;
	all<T1, T2, T3, T4, T5, T6, T7>(values: [
		T1 | PromiseLike<T1>,
		T2 | PromiseLike<T2>,
		T3 | PromiseLike<T3>,
		T4 | PromiseLike<T4>,
		T5 | PromiseLike<T5>,
		T6 | PromiseLike<T6>,
		T7 | PromiseLike<T7>
	]): PromiseExtended<[
		T1,
		T2,
		T3,
		T4,
		T5,
		T6,
		T7
	]>;
	all<T1, T2, T3, T4, T5, T6>(values: [
		T1 | PromiseLike<T1>,
		T2 | PromiseLike<T2>,
		T3 | PromiseLike<T3>,
		T4 | PromiseLike<T4>,
		T5 | PromiseLike<T5>,
		T6 | PromiseLike<T6>
	]): PromiseExtended<[
		T1,
		T2,
		T3,
		T4,
		T5,
		T6
	]>;
	all<T1, T2, T3, T4, T5>(values: [
		T1 | PromiseLike<T1>,
		T2 | PromiseLike<T2>,
		T3 | PromiseLike<T3>,
		T4 | PromiseLike<T4>,
		T5 | PromiseLike<T5>
	]): PromiseExtended<[
		T1,
		T2,
		T3,
		T4,
		T5
	]>;
	all<T1, T2, T3, T4>(values: [
		T1 | PromiseLike<T1>,
		T2 | PromiseLike<T2>,
		T3 | PromiseLike<T3>,
		T4 | PromiseLike<T4>
	]): PromiseExtended<[
		T1,
		T2,
		T3,
		T4
	]>;
	all<T1, T2, T3>(values: [
		T1 | PromiseLike<T1>,
		T2 | PromiseLike<T2>,
		T3 | PromiseLike<T3>
	]): PromiseExtended<[
		T1,
		T2,
		T3
	]>;
	all<T1, T2>(values: [
		T1 | PromiseLike<T1>,
		T2 | PromiseLike<T2>
	]): PromiseExtended<[
		T1,
		T2
	]>;
	all<T>(values: (T | PromiseLike<T>)[]): PromiseExtended<T[]>;
	race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [
		T1 | PromiseLike<T1>,
		T2 | PromiseLike<T2>,
		T3 | PromiseLike<T3>,
		T4 | PromiseLike<T4>,
		T5 | PromiseLike<T5>,
		T6 | PromiseLike<T6>,
		T7 | PromiseLike<T7>,
		T8 | PromiseLike<T8>,
		T9 | PromiseLike<T9>,
		T10 | PromiseLike<T10>
	]): PromiseExtended<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;
	race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [
		T1 | PromiseLike<T1>,
		T2 | PromiseLike<T2>,
		T3 | PromiseLike<T3>,
		T4 | PromiseLike<T4>,
		T5 | PromiseLike<T5>,
		T6 | PromiseLike<T6>,
		T7 | PromiseLike<T7>,
		T8 | PromiseLike<T8>,
		T9 | PromiseLike<T9>
	]): PromiseExtended<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
	race<T1, T2, T3, T4, T5, T6, T7, T8>(values: [
		T1 | PromiseLike<T1>,
		T2 | PromiseLike<T2>,
		T3 | PromiseLike<T3>,
		T4 | PromiseLike<T4>,
		T5 | PromiseLike<T5>,
		T6 | PromiseLike<T6>,
		T7 | PromiseLike<T7>,
		T8 | PromiseLike<T8>
	]): PromiseExtended<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
	race<T1, T2, T3, T4, T5, T6, T7>(values: [
		T1 | PromiseLike<T1>,
		T2 | PromiseLike<T2>,
		T3 | PromiseLike<T3>,
		T4 | PromiseLike<T4>,
		T5 | PromiseLike<T5>,
		T6 | PromiseLike<T6>,
		T7 | PromiseLike<T7>
	]): PromiseExtended<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
	race<T1, T2, T3, T4, T5, T6>(values: [
		T1 | PromiseLike<T1>,
		T2 | PromiseLike<T2>,
		T3 | PromiseLike<T3>,
		T4 | PromiseLike<T4>,
		T5 | PromiseLike<T5>,
		T6 | PromiseLike<T6>
	]): PromiseExtended<T1 | T2 | T3 | T4 | T5 | T6>;
	race<T1, T2, T3, T4, T5>(values: [
		T1 | PromiseLike<T1>,
		T2 | PromiseLike<T2>,
		T3 | PromiseLike<T3>,
		T4 | PromiseLike<T4>,
		T5 | PromiseLike<T5>
	]): PromiseExtended<T1 | T2 | T3 | T4 | T5>;
	race<T1, T2, T3, T4>(values: [
		T1 | PromiseLike<T1>,
		T2 | PromiseLike<T2>,
		T3 | PromiseLike<T3>,
		T4 | PromiseLike<T4>
	]): PromiseExtended<T1 | T2 | T3 | T4>;
	race<T1, T2, T3>(values: [
		T1 | PromiseLike<T1>,
		T2 | PromiseLike<T2>,
		T3 | PromiseLike<T3>
	]): PromiseExtended<T1 | T2 | T3>;
	race<T1, T2>(values: [
		T1 | PromiseLike<T1>,
		T2 | PromiseLike<T2>
	]): PromiseExtended<T1 | T2>;
	race<T>(values: (T | PromiseLike<T>)[]): PromiseExtended<T>;
	reject(reason: any): PromiseExtended<never>;
	reject<T>(reason: any): PromiseExtended<T>;
	resolve<T>(value: T | PromiseLike<T>): PromiseExtended<T>;
	resolve(): PromiseExtended<void>;
}
/** The interface of Dexie.Promise, which basically extends standard Promise with methods:
 *
 *  finally() - also subject for standardization
 *  timeout() - set a completion timeout
 *  catch(ErrorClass, handler) - java style error catching
 *  catch(errorName, handler) - cross-domain safe type error catching (checking error.name instead of instanceof)
 *
 */
export interface PromiseExtended<T = any> extends Promise<T> {
	then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): PromiseExtended<TResult1 | TResult2>;
	catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): PromiseExtended<T | TResult>;
	catch<TResult = never>(ErrorConstructor: Function, onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): PromiseExtended<T | TResult>;
	catch<TResult = never>(errorName: string, onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): PromiseExtended<T | TResult>;
	finally<U>(onFinally?: () => U | PromiseLike<U>): PromiseExtended<T>;
	timeout(ms: number, msg?: string): PromiseExtended<T>;
}
export type KeyPaths<T> = {
	[P in keyof T]: P extends string ? T[P] extends Array<infer K> ? K extends object // only drill into the array element if it's an object
	 ? P | `${P}.${number}` | `${P}.${number}.${KeyPaths<K>}` : P | `${P}.${number}` : T[P] extends (...args: any[]) => any // Method
	 ? never : T[P] extends object ? P | `${P}.${KeyPaths<T[P]>}` : P : never;
}[keyof T];
export type KeyPathValue<T, PATH> = PATH extends `${infer R}.${infer S}` ? R extends keyof T ? KeyPathValue<T[R], S> : T extends any[] ? PATH extends `${number}.${infer S}` ? KeyPathValue<T[number], S> : void : void : PATH extends `${number}` ? T extends any[] ? T[number] : void : PATH extends keyof T ? T[PATH] : void;
export type UpdateSpec<T> = {
	[KP in KeyPaths<T>]?: KeyPathValue<T, KP>;
};
export interface Collection<T = any, TKey = IndexableType> {
	db: Dexie;
	and(filter: (x: T) => boolean): Collection<T, TKey>;
	clone(props?: Object): Collection<T, TKey>;
	count(): PromiseExtended<number>;
	count<R>(thenShortcut: ThenShortcut<number, R>): PromiseExtended<R>;
	distinct(): Collection<T, TKey>;
	each(callback: (obj: T, cursor: {
		key: IndexableType;
		primaryKey: TKey;
	}) => any): PromiseExtended<void>;
	eachKey(callback: (key: IndexableType, cursor: {
		key: IndexableType;
		primaryKey: TKey;
	}) => any): PromiseExtended<void>;
	eachPrimaryKey(callback: (key: TKey, cursor: {
		key: IndexableType;
		primaryKey: TKey;
	}) => any): PromiseExtended<void>;
	eachUniqueKey(callback: (key: IndexableType, cursor: {
		key: IndexableType;
		primaryKey: TKey;
	}) => any): PromiseExtended<void>;
	filter<S extends T>(filter: (x: T) => x is S): Collection<S, TKey>;
	filter(filter: (x: T) => boolean): Collection<T, TKey>;
	first(): PromiseExtended<T | undefined>;
	first<R>(thenShortcut: ThenShortcut<T | undefined, R>): PromiseExtended<R>;
	keys(): PromiseExtended<IndexableTypeArray>;
	keys<R>(thenShortcut: ThenShortcut<IndexableTypeArray, R>): PromiseExtended<R>;
	primaryKeys(): PromiseExtended<TKey[]>;
	primaryKeys<R>(thenShortcut: ThenShortcut<TKey[], R>): PromiseExtended<R>;
	last(): PromiseExtended<T | undefined>;
	last<R>(thenShortcut: ThenShortcut<T | undefined, R>): PromiseExtended<R>;
	limit(n: number): Collection<T, TKey>;
	offset(n: number): Collection<T, TKey>;
	or(indexOrPrimayKey: string): WhereClause<T, TKey>;
	raw(): Collection<T, TKey>;
	reverse(): Collection<T, TKey>;
	sortBy(keyPath: string): PromiseExtended<T[]>;
	sortBy<R>(keyPath: string, thenShortcut: ThenShortcut<T[], R>): PromiseExtended<R>;
	toArray(): PromiseExtended<Array<T>>;
	toArray<R>(thenShortcut: ThenShortcut<T[], R>): PromiseExtended<R>;
	uniqueKeys(): PromiseExtended<IndexableTypeArray>;
	uniqueKeys<R>(thenShortcut: ThenShortcut<IndexableTypeArray, R>): PromiseExtended<R>;
	until(filter: (value: T) => boolean, includeStopEntry?: boolean): Collection<T, TKey>;
	// Mutating methods
	delete(): PromiseExtended<number>;
	modify(changeCallback: (obj: T, ctx: {
		value: T;
	}) => void | boolean): PromiseExtended<number>;
	modify(changes: UpdateSpec<T>): PromiseExtended<number>;
}
export type IntervalTree = IntervalTreeNode | EmptyRange;
export interface IntervalTreeNode {
	from: IndexableType; // lower bound
	to: IndexableType; // upper bound
	l: IntervalTreeNode | null; // left
	r: IntervalTreeNode | null; // right
	d: number; // depth
}
export interface EmptyRange {
	d: 0;
}
export interface DexieOnReadyEvent {
	subscribe(fn: (vipDb: Dexie) => any, bSticky: boolean): void;
	unsubscribe(fn: (vipDb: Dexie) => any): void;
	fire(vipDb: Dexie): any;
}
export interface DexieVersionChangeEvent {
	subscribe(fn: (event: IDBVersionChangeEvent) => any): void;
	unsubscribe(fn: (event: IDBVersionChangeEvent) => any): void;
	fire(event: IDBVersionChangeEvent): any;
}
export interface DexiePopulateEvent {
	subscribe(fn: (trans: Transaction) => any): void;
	unsubscribe(fn: (trans: Transaction) => any): void;
	fire(trans: Transaction): any;
}
export interface DexieCloseEvent {
	subscribe(fn: (event: Event) => any): void;
	unsubscribe(fn: (event: Event) => any): void;
	fire(event: Event): any;
}
export interface DbEvents extends DexieEventSet {
	(eventName: "ready", subscriber: (vipDb: Dexie) => any, bSticky?: boolean): void;
	(eventName: "populate", subscriber: (trans: Transaction) => any): void;
	(eventName: "blocked", subscriber: (event: IDBVersionChangeEvent) => any): void;
	(eventName: "versionchange", subscriber: (event: IDBVersionChangeEvent) => any): void;
	(eventName: "close", subscriber: (event: Event) => any): void;
	ready: DexieOnReadyEvent;
	populate: DexiePopulateEvent;
	blocked: DexieEvent;
	versionchange: DexieVersionChangeEvent;
	close: DexieCloseEvent;
}
/** Set of mutated parts of the database
 */
export type ObservabilitySet = {
	/** Database part having been mutated.
	 *
	 * This structure is produced in observability-middleware.ts
	 * and consumed in live-query.ts.
	 *
	 * Format of 'part':
	 *
	 *   `idb://${dbName}/${tableName}/${indexName}`
	 *
	 * * dbName is the database name
	 * * tableName is the table name
	 * * indexName is any of:
	 *    1. An empty string - represents the primary keys of the affected objs
	 *    2. ":dels" - represents primary keys of deleted objects in the table
	 *    3. The keyPath of an index, such as "name", "age" or "address.city" -
	 *       represents indexes that, if used in a query, might affect the
	 *       result of that query.
	 *
	 * IntervalTree
	 *    * See definition of IntervalTree type in rangeset.d.ts
	 *    * See rangesOverlap() in rangeset.ts that can be used to compare two
	 *      IntervalTrees and detect collissions.
	 *    * See RangeSet class that can be used to create an IntervalTree and add
	 *      ranges to it.
	 */
	[part: string]: IntervalTree;
};
export interface DexieOnStorageMutatedEvent {
	subscribe(fn: (parts: ObservabilitySet) => any): void;
	unsubscribe(fn: (parts: ObservabilitySet) => any): void;
	fire(parts: ObservabilitySet): any;
}
export interface GlobalDexieEvents extends DexieEventSet {
	(eventName: "storagemutated", subscriber: (parts: ObservabilitySet) => any): void;
	storagemutated: DexieOnStorageMutatedEvent;
}
export const enum DBCoreRangeType {
	Equal = 1,
	Range = 2,
	Any = 3,
	Never = 4
}
export interface DBCoreKeyRange {
	readonly type: DBCoreRangeType;
	readonly lower: any;
	readonly lowerOpen?: boolean;
	readonly upper: any;
	readonly upperOpen?: boolean;
}
export interface DBCoreTransaction {
	abort(): void;
}
export interface DbCoreTransactionOptions {
	durability: ChromeTransactionDurability;
}
export type DBCoreMutateRequest = DBCoreAddRequest | DBCorePutRequest | DBCoreDeleteRequest | DBCoreDeleteRangeRequest;
export interface DBCoreMutateResponse {
	numFailures: number;
	failures: {
		[operationNumber: number]: Error;
	};
	lastResult: any;
	results?: any[]; // Present on AddRequest and PutRequest.
}
export interface DBCoreAddRequest {
	type: "add";
	trans: DBCoreTransaction;
	values: readonly any[];
	keys?: any[];
	mutatedParts?: ObservabilitySet;
	/** @deprecated Will always get results since 3.1.0-alpha.5 */
	wantResults?: boolean;
}
export interface DBCorePutRequest {
	type: "put";
	trans: DBCoreTransaction;
	values: readonly any[];
	keys?: any[];
	mutatedParts?: ObservabilitySet;
	criteria?: {
		index: string | null;
		range: DBCoreKeyRange;
	};
	changeSpec?: {
		[keyPath: string]: any;
	}; // Common changeSpec for each key
	updates?: {
		keys: any[];
		changeSpecs: {
			[keyPath: string]: any;
		}[]; // changeSpec per key.  
	};
	/** @deprecated Will always get results since 3.1.0-alpha.5 */
	wantResults?: boolean;
}
export interface DBCoreDeleteRequest {
	type: "delete";
	trans: DBCoreTransaction;
	keys: any[];
	mutatedParts?: ObservabilitySet;
	criteria?: {
		index: string | null;
		range: DBCoreKeyRange;
	};
}
export interface DBCoreDeleteRangeRequest {
	type: "deleteRange";
	trans: DBCoreTransaction;
	range: DBCoreKeyRange;
	mutatedParts?: ObservabilitySet;
}
export interface DBCoreGetManyRequest {
	trans: DBCoreTransaction;
	keys: any[];
	cache?: "immutable" | "clone";
	obsSet?: ObservabilitySet;
}
export interface DBCoreGetRequest {
	trans: DBCoreTransaction;
	key: any;
	obsSet?: ObservabilitySet;
}
export interface DBCoreQuery {
	index: DBCoreIndex; //keyPath: null | string | string[]; // null represents primary key. string a property, string[] several properties.
	range: DBCoreKeyRange;
}
export interface DBCoreQueryRequest {
	trans: DBCoreTransaction;
	values?: boolean;
	limit?: number;
	query: DBCoreQuery;
	obsSet?: ObservabilitySet;
}
export interface DBCoreQueryResponse {
	result: any[];
}
export interface DBCoreOpenCursorRequest {
	trans: DBCoreTransaction;
	values?: boolean;
	unique?: boolean;
	reverse?: boolean;
	query: DBCoreQuery;
	obsSet?: ObservabilitySet;
}
export interface DBCoreCountRequest {
	trans: DBCoreTransaction;
	query: DBCoreQuery;
	obsSet?: ObservabilitySet;
}
export interface DBCoreCursor {
	readonly trans: DBCoreTransaction;
	readonly key: any;
	readonly primaryKey: any;
	readonly value?: any;
	readonly done?: boolean;
	continue(key?: any): void;
	continuePrimaryKey(key: any, primaryKey: any): void;
	advance(count: number): void;
	start(onNext: () => void): Promise<any>;
	stop(value?: any | Promise<any>): void;
	next(): Promise<DBCoreCursor>;
	fail(error: Error): void;
}
export interface DBCoreSchema {
	name: string;
	tables: DBCoreTableSchema[];
}
export interface DBCoreTableSchema {
	readonly name: string;
	readonly primaryKey: DBCoreIndex;
	readonly indexes: DBCoreIndex[];
	readonly getIndexByKeyPath: (keyPath: null | string | string[]) => DBCoreIndex | undefined;
}
export interface DBCoreIndex {
	/** Name of the index, or null for primary key */
	readonly name: string | null;
	/** True if this index represents the primary key */
	readonly isPrimaryKey?: boolean;
	/** True if this index represents the primary key and is not inbound (https://dexie.org/docs/inbound) */
	readonly outbound?: boolean;
	/** True if and only if keyPath is an array (https://dexie.org/docs/Compound-Index) */
	readonly compound?: boolean;
	/** keyPath, null for primary key, string for single-property indexes, Array<string> for compound indexes */
	readonly keyPath: null | string | string[];
	/** Auto-generated primary key (does not apply to secondary indexes) */
	readonly autoIncrement?: boolean;
	/** Whether index is unique. Also true if index is primary key. */
	readonly unique?: boolean;
	/** Whether index is multiEntry. */
	readonly multiEntry?: boolean;
	/** Extract (using keyPath) a key from given value (object). Null for outbound primary keys */
	readonly extractKey: ((value: any) => any) | null;
}
export interface DBCore {
	stack: "dbcore";
	// Transaction and Object Store
	transaction(stores: string[], mode: "readonly" | "readwrite", options?: DbCoreTransactionOptions): DBCoreTransaction;
	// Utility methods
	readonly MIN_KEY: any;
	readonly MAX_KEY: any;
	readonly schema: DBCoreSchema;
	table(name: string): DBCoreTable;
}
export interface DBCoreTable {
	readonly name: string;
	readonly schema: DBCoreTableSchema;
	mutate(req: DBCoreMutateRequest): Promise<DBCoreMutateResponse>;
	get(req: DBCoreGetRequest): Promise<any>;
	getMany(req: DBCoreGetManyRequest): Promise<any[]>;
	query(req: DBCoreQueryRequest): Promise<DBCoreQueryResponse>;
	openCursor(req: DBCoreOpenCursorRequest): Promise<DBCoreCursor | null>;
	count(req: DBCoreCountRequest): Promise<number>;
}
export interface Table<T = any, TKey = any, TInsertType = T> {
	db: Dexie;
	name: string;
	schema: TableSchema;
	hook: TableHooks<T, TKey>;
	core: DBCoreTable;
	get(key: TKey): PromiseExtended<T | undefined>;
	get<R>(key: TKey, thenShortcut: ThenShortcut<T | undefined, R>): PromiseExtended<R>;
	get(equalityCriterias: {
		[key: string]: any;
	}): PromiseExtended<T | undefined>;
	get<R>(equalityCriterias: {
		[key: string]: any;
	}, thenShortcut: ThenShortcut<T | undefined, R>): PromiseExtended<R>;
	where(index: string | string[]): WhereClause<T, TKey>;
	where(equalityCriterias: {
		[key: string]: any;
	}): Collection<T, TKey>;
	filter(fn: (obj: T) => boolean): Collection<T, TKey>;
	count(): PromiseExtended<number>;
	count<R>(thenShortcut: ThenShortcut<number, R>): PromiseExtended<R>;
	offset(n: number): Collection<T, TKey>;
	limit(n: number): Collection<T, TKey>;
	each(callback: (obj: T, cursor: {
		key: any;
		primaryKey: TKey;
	}) => any): PromiseExtended<void>;
	toArray(): PromiseExtended<Array<T>>;
	toArray<R>(thenShortcut: ThenShortcut<T[], R>): PromiseExtended<R>;
	toCollection(): Collection<T, TKey>;
	orderBy(index: string | string[]): Collection<T, TKey>;
	reverse(): Collection<T, TKey>;
	mapToClass(constructor: Function): Function;
	add(item: TInsertType, key?: TKey): PromiseExtended<TKey>;
	update(key: TKey | T, changes: UpdateSpec<T> | ((obj: T, ctx: {
		value: any;
		primKey: IndexableType;
	}) => void | boolean)): PromiseExtended<number>;
	put(item: TInsertType, key?: TKey): PromiseExtended<TKey>;
	delete(key: TKey): PromiseExtended<void>;
	clear(): PromiseExtended<void>;
	bulkGet(keys: TKey[]): PromiseExtended<(T | undefined)[]>;
	bulkAdd<B extends boolean>(items: readonly TInsertType[], keys: IndexableTypeArrayReadonly, options: {
		allKeys: B;
	}): PromiseExtended<B extends true ? TKey[] : TKey>;
	bulkAdd<B extends boolean>(items: readonly TInsertType[], options: {
		allKeys: B;
	}): PromiseExtended<B extends true ? TKey[] : TKey>;
	bulkAdd(items: readonly TInsertType[], keys?: IndexableTypeArrayReadonly, options?: {
		allKeys: boolean;
	}): PromiseExtended<TKey>;
	bulkPut<B extends boolean>(items: readonly TInsertType[], keys: IndexableTypeArrayReadonly, options: {
		allKeys: B;
	}): PromiseExtended<B extends true ? TKey[] : TKey>;
	bulkPut<B extends boolean>(items: readonly TInsertType[], options: {
		allKeys: B;
	}): PromiseExtended<B extends true ? TKey[] : TKey>;
	bulkPut(items: readonly TInsertType[], keys?: IndexableTypeArrayReadonly, options?: {
		allKeys: boolean;
	}): PromiseExtended<TKey>;
	bulkUpdate(keysAndChanges: ReadonlyArray<{
		key: TKey;
		changes: UpdateSpec<T>;
	}>): PromiseExtended<number>;
	bulkDelete(keys: TKey[]): PromiseExtended<void>;
}
export interface Version {
	stores(schema: {
		[tableName: string]: string | null;
	}): Version;
	upgrade(fn: (trans: Transaction) => PromiseLike<any> | void): Version;
}
export type TransactionMode = "readonly" | "readwrite" | "r" | "r!" | "r?" | "rw" | "rw!" | "rw?";
export type DbSchema = {
	[tableName: string]: TableSchema;
};
export interface Middleware<TStack extends {
	stack: string;
}> {
	stack: TStack["stack"];
	create: (down: TStack) => Partial<TStack>;
	level?: number;
	name?: string;
}
export interface DexieStacks {
	dbcore: DBCore;
}
export type TableProp<DX extends Dexie> = {
	[K in keyof DX]: DX[K] extends {
		schema: any;
		get: any;
		put: any;
		add: any;
		where: any;
	} ? K : never;
}[keyof DX] & string;
export type TXWithTables<DX extends Dexie> = Dexie extends DX ? Transaction // If not subclassed, just expect a Transaction without table props
 : Transaction & {
	[P in TableProp<DX>]: DX[P];
};
export interface Dexie {
	readonly name: string;
	readonly tables: Table[];
	readonly verno: number;
	readonly vip: Dexie;
	readonly _allTables: {
		[name: string]: Table<any, IndexableType>;
	};
	readonly core: DBCore;
	_createTransaction: (this: Dexie, mode: IDBTransactionMode, storeNames: ArrayLike<string>, dbschema: DbSchema, parentTransaction?: Transaction | null) => Transaction;
	readonly _novip: Dexie;
	_dbSchema: DbSchema;
	version(versionNumber: number): Version;
	on: DbEvents;
	open(): PromiseExtended<Dexie>;
	table<T = any, TKey = IndexableType>(tableName: string): Table<T, TKey>;
	transaction<U>(mode: TransactionMode, tables: readonly (string | Table)[], scope: (trans: TXWithTables<this>) => PromiseLike<U> | U): PromiseExtended<U>;
	transaction<U>(mode: TransactionMode, table: string | Table, scope: (trans: TXWithTables<this>) => PromiseLike<U> | U): PromiseExtended<U>;
	transaction<U>(mode: TransactionMode, table: string | Table, table2: string | Table, scope: (trans: TXWithTables<this>) => PromiseLike<U> | U): PromiseExtended<U>;
	transaction<U>(mode: TransactionMode, table: string | Table, table2: string | Table, table3: string | Table, scope: (trans: TXWithTables<this>) => PromiseLike<U> | U): PromiseExtended<U>;
	transaction<U>(mode: TransactionMode, table: string | Table, table2: string | Table, table3: string | Table, table4: string | Table, scope: (trans: TXWithTables<this>) => PromiseLike<U> | U): PromiseExtended<U>;
	transaction<U>(mode: TransactionMode, table: string | Table, table2: string | Table, table3: string | Table, table5: string | Table, scope: (trans: TXWithTables<this>) => PromiseLike<U> | U): PromiseExtended<U>;
	close(): void;
	delete(): PromiseExtended<void>;
	isOpen(): boolean;
	hasBeenClosed(): boolean;
	hasFailed(): boolean;
	dynamicallyOpened(): boolean;
	backendDB(): IDBDatabase;
	use(middleware: Middleware<DBCore>): this;
	// Add more supported stacks here... : use(middleware: Middleware<HookStack>): this;
	unuse({ stack, create }: Middleware<{
		stack: keyof DexieStacks;
	}>): this;
	unuse({ stack, name }: {
		stack: keyof DexieStacks;
		name: string;
	}): this;
	// Make it possible to touch physical class constructors where they reside - as properties on db instance.
	// For example, checking if (x instanceof db.Table). Can't do (x instanceof Dexie.Table because it's just a virtual interface)
	Table: {
		prototype: Table;
	};
	WhereClause: {
		prototype: WhereClause;
	};
	Version: {
		prototype: Version;
	};
	Transaction: {
		prototype: Transaction;
	};
	Collection: {
		prototype: Collection;
	};
}
/** DexieError
 *
 * Common base class for all errors originating from Dexie.js except TypeError,
 * SyntaxError and RangeError.
 *
 * https://dexie.org/docs/DexieErrors/DexieError
 *
 */
export interface DexieError extends Error {
	name: string;
	message: string;
	stack: string;
	inner: any;
	toString(): string;
}
/**
 * List of the names of auto-generated error classes that extends DexieError
 * and shares the interface of DexieError.
 *
 * Each error should be documented at https://dexie.org/docs/DexieErrors/Dexie.<errname>
 *
 * The generic type DexieExceptionClasses is a map of full error name to
 * error constructor. The DexieExceptionClasses is mixed in into Dexie,
 * so that it is always possible to throw or catch certain errors via
 * Dexie.ErrorName. Example:
 *
 * try {
 *   throw new Dexie.InvalidTableError("Invalid table foo", innerError?);
 * } catch (err) {
 *   if (err instanceof Dexie.InvalidTableError) {
 *     // Could also have check for err.name === "InvalidTableError", or
 *     // err.name === Dexie.errnames.InvalidTableError.
 *     console.log("Seems to be an invalid table here...");
 *   } else {
 *     throw err;
 *   }
 * }
 */
export type DexieErrors = {
	// https://dexie.org/docs/DexieErrors/Dexie.OpenFailedError
	OpenFailed: "OpenFailedError";
	// https://dexie.org/docs/DexieErrors/Dexie.VersionChangeError
	VersionChange: "VersionChangeError";
	// https://dexie.org/docs/DexieErrors/Dexie.SchemaError
	Schema: "SchemaError";
	// https://dexie.org/docs/DexieErrors/Dexie.UpgradeError
	Upgrade: "UpgradeError";
	// https://dexie.org/docs/DexieErrors/Dexie.InvalidTableError
	InvalidTable: "InvalidTableError";
	// https://dexie.org/docs/DexieErrors/Dexie.MissingAPIError
	MissingAPI: "MissingAPIError";
	// https://dexie.org/docs/DexieErrors/Dexie.NoSuchDatabaseError
	NoSuchDatabase: "NoSuchDatabaseError";
	// https://dexie.org/docs/DexieErrors/Dexie.InvalidArgumentError
	InvalidArgument: "InvalidArgumentError";
	// https://dexie.org/docs/DexieErrors/Dexie.SubTransactionError
	SubTransaction: "SubTransactionError";
	// https://dexie.org/docs/DexieErrors/Dexie.UnsupportedError
	Unsupported: "UnsupportedError";
	// https://dexie.org/docs/DexieErrors/Dexie.InternalError
	Internal: "InternalError";
	// https://dexie.org/docs/DexieErrors/Dexie.DatabaseClosedError
	DatabaseClosed: "DatabaseClosedError";
	// https://dexie.org/docs/DexieErrors/Dexie.PrematureCommitError
	PrematureCommit: "PrematureCommitError";
	// https://dexie.org/docs/DexieErrors/Dexie.ForeignAwaitError
	ForeignAwait: "ForeignAwaitError";
	// https://dexie.org/docs/DexieErrors/Dexie.UnknownError
	Unknown: "UnknownError";
	// https://dexie.org/docs/DexieErrors/Dexie.ConstraintError
	Constraint: "ConstraintError";
	// https://dexie.org/docs/DexieErrors/Dexie.DataError
	Data: "DataError";
	// https://dexie.org/docs/DexieErrors/Dexie.TransactionInactiveError
	TransactionInactive: "TransactionInactiveError";
	// https://dexie.org/docs/DexieErrors/Dexie.ReadOnlyError
	ReadOnly: "ReadOnlyError";
	// https://dexie.org/docs/DexieErrors/Dexie.VersionError
	Version: "VersionError";
	// https://dexie.org/docs/DexieErrors/Dexie.NotFoundError
	NotFound: "NotFoundError";
	// https://dexie.org/docs/DexieErrors/Dexie.InvalidStateError
	InvalidState: "InvalidStateError";
	// https://dexie.org/docs/DexieErrors/Dexie.InvalidAccessError
	InvalidAccess: "InvalidAccessError";
	// https://dexie.org/docs/DexieErrors/Dexie.AbortError
	Abort: "AbortError";
	// https://dexie.org/docs/DexieErrors/Dexie.TimeoutError
	Timeout: "TimeoutError";
	// https://dexie.org/docs/DexieErrors/Dexie.QuotaExceededError
	QuotaExceeded: "QuotaExceededError";
	// https://dexie.org/docs/DexieErrors/Dexie.DataCloneError
	DataClone: "DataCloneError";
};
/** ModifyError
 *
 * https://dexie.org/docs/DexieErrors/Dexie.ModifyError
 */
export interface ModifyError extends DexieError {
	failures: Array<any>;
	failedKeys: IndexableTypeArrayReadonly;
	successCount: number;
}
/** BulkError
 *
 * https://dexie.org/docs/DexieErrors/Dexie.BulkError
 */
export interface BulkError extends DexieError {
	failures: Error[];
	failuresByPos: {
		[operationNumber: number]: Error;
	};
}
export interface DexieErrorConstructor {
	new (msg?: string, inner?: Object): DexieError;
	new (inner: Object): DexieError;
	prototype: DexieError;
}
export interface ModifyErrorConstructor {
	new (msg?: string, failures?: any[], successCount?: number, failedKeys?: IndexableTypeArrayReadonly): ModifyError;
	prototype: ModifyError;
}
export interface BulkErrorConstructor {
	new (msg?: string, failures?: {
		[operationNumber: number]: Error;
	}): BulkError;
	prototype: BulkError;
}
export type ExceptionSet = {
	[P in DexieErrors[keyof DexieErrors]]: DexieErrorConstructor;
};
export type DexieExceptionClasses = ExceptionSet & {
	DexieError: DexieErrorConstructor;
	ModifyError: ModifyErrorConstructor;
	BulkError: BulkErrorConstructor;
};
export interface DexieDOMDependencies {
	indexedDB: IDBFactory;
	IDBKeyRange: typeof IDBKeyRange;
}
declare global {
	interface SymbolConstructor {
		readonly observable: symbol;
	}
}
export interface Subscribable<T> {
	subscribe(observer: Partial<Observer<T>>): Unsubscribable;
}
export interface Unsubscribable {
	unsubscribe(): void;
}
export interface Observable<T = any> {
	subscribe(observerOrNext?: Observer<T> | ((value: T) => void)): Subscription;
	subscribe(next?: ((value: T) => void) | null, error?: ((error: any) => void) | null, complete?: (() => void) | null): Subscription;
	getValue?(): T;
	hasValue?(): boolean;
	[Symbol.observable]: () => Subscribable<T>;
}
export interface Subscription {
	unsubscribe(): void;
	readonly closed: boolean;
}
export interface Observer<T = any> {
	start?: (subscription: Subscription) => void;
	next?: (value: T) => void;
	error?: (error: any) => void;
	complete?: () => void;
}
export type GlobalQueryCache = {
	// TODO: Change to parts: {[part: string]: TblQueryCache}
	//       och unsignaledParts: ObservabilitySet;
	[part: string]: TblQueryCache; // part is `idb://${dbName}/${tableName}`
};
export interface TblQueryCache {
	queries: {
		query: {
			[indexName: string]: CacheEntry[];
		};
		count: {
			[indexName: string]: CacheEntry[];
		};
	};
	objs: Map<string | number, object>;
	optimisticOps: DBCoreMutateRequest[];
	unsignaledParts: ObservabilitySet;
	signalTimer?: number;
}
export interface CacheEntryCommon {
	subscribers: Set<() => void>;
	obsSet: ObservabilitySet;
	//txObsSet: ObservabilitySet;
	promise: Promise<any>;
	dirty: boolean;
}
export type CacheEntry = CacheEntryCommon & ({
	type: "query";
	req: DBCoreQueryRequest;
	res?: readonly any[];
} | {
	type: "count";
	req: DBCoreCountRequest;
	res?: number;
});
export type ChromeTransactionDurability = "default" | "strict" | "relaxed";
export interface DexieOptions {
	addons?: Array<(db: Dexie) => void>;
	autoOpen?: boolean;
	indexedDB?: {
		open: Function;
	};
	IDBKeyRange?: {
		bound: Function;
		lowerBound: Function;
		upperBound: Function;
	};
	allowEmptyDB?: boolean;
	modifyChunkSize?: number;
	chromeTransactionDurability?: ChromeTransactionDurability;
	cache?: "immutable" | "cloned" | "disabled";
}
export interface DexieConstructor extends DexieExceptionClasses {
	new (databaseName: string, options?: DexieOptions): Dexie;
	prototype: Dexie;
	addons: Array<(db: Dexie) => void>;
	version: number;
	semVer: string;
	currentTransaction: Transaction;
	waitFor<T>(promise: PromiseLike<T> | T, timeoutMilliseconds?: number): Promise<T>;
	getDatabaseNames(): Promise<string[]>;
	getDatabaseNames<R>(thenShortcut: ThenShortcut<string[], R>): Promise<R>;
	vip<U>(scopeFunction: () => U): U;
	ignoreTransaction<U>(fn: () => U): U;
	liveQuery<T>(fn: () => T | Promise<T>): Observable<T>;
	extendObservabilitySet(target: ObservabilitySet, newSet: ObservabilitySet): ObservabilitySet;
	override<F>(origFunc: F, overridedFactory: (fn: any) => any): F; // ?
	getByKeyPath(obj: Object, keyPath: string | string[]): any;
	setByKeyPath(obj: Object, keyPath: string | string[], value: any): void;
	delByKeyPath(obj: Object, keyPath: string | string[]): void;
	shallowClone<T>(obj: T): T;
	deepClone<T>(obj: T): T;
	asap(fn: Function): void; //?
	maxKey: Array<Array<void>> | string;
	minKey: number;
	exists(dbName: string): Promise<boolean>;
	delete(dbName: string): Promise<void>;
	dependencies: DexieDOMDependencies;
	default: Dexie; // Work-around for different build tools handling default imports differently.
	cache: GlobalQueryCache;
	Promise: PromiseExtendedConstructor;
	//TableSchema: {}; // Deprecate!
	//IndexSpec: {new():IndexSpec}; //? Deprecate
	Events: (ctx?: any) => DexieEventSet;
	on: GlobalDexieEvents;
	errnames: DexieErrors;
}
export class Entity<TDexieSubClass extends Dexie = Dexie> {
	protected constructor();
	protected readonly db: TDexieSubClass;
	table(): TableProp<TDexieSubClass>;
}
export type IsStrictlyAny<T> = (T extends never ? true : false) extends false ? false : true;
/** Extract the union of literal method names in T
 */
export type MethodProps<T> = {
	[P in keyof T]: IsStrictlyAny<T[P]> extends true ? never // Plain property of type any (not method)
	 : T[P] extends (...args: any[]) => any ? P // a function (method)
	 : never;
}[keyof T];
/** Default insert type of T is a subset of T where:
 *    * given optional props (such as an auto-generated primary key) are made optional
 *    * methods are omitted
 */
export type InsertType<T, OptionalProps extends keyof T> = Omit<T, OptionalProps | MethodProps<T>> & {
	[P in OptionalProps]?: T[P];
};
/** IDType extract the actual type of the primary key:
 *  * If TKey is a literal type that names a property of T, extract the type using T[TKey]
 *  * Else, use TKey as is.
 */
export type IDType<T, TKeyPropNameOrKeyType> = IsStrictlyAny<T> extends true ? TKeyPropNameOrKeyType : TKeyPropNameOrKeyType extends string ? TKeyPropNameOrKeyType extends keyof T ? T[TKeyPropNameOrKeyType] : TKeyPropNameOrKeyType : TKeyPropNameOrKeyType;
export type EntityTable<T, TKeyPropName extends keyof T = never, TInsertType = InsertType<T, TKeyPropName>> = Table<T, IDType<T, TKeyPropName>, TInsertType>;
export declare var Dexie: DexieConstructor;
export interface _Table<T, TKey> extends Table<T, TKey> {
}
export interface _Collection<T, TKey> extends Collection<T, TKey> {
}
export declare module Dexie {
	// The "Dexie.Promise" type.
	type Promise<T = any> = PromiseExtended<T>; // Because many samples have been Dexie.Promise.
	// The "Dexie.Table" interface. Same as named exported interface Table.
	interface Table<T = any, Key = any> extends _Table<T, Key> {
	} // Because all samples have been Dexie.Table<...>
	// The "Dexie.Collection" interface. Same as named exported interface Collection.
	interface Collection<T = any, Key = any> extends _Collection<T, Key> {
	} // Because app-code may declare it.
}
export function liveQuery<T>(querier: () => T | Promise<T>): Observable<T>;
export function mergeRanges(target: IntervalTree, newSet: IntervalTree): void;
export function rangesOverlap(rangeSet1: IntervalTree, rangeSet2: IntervalTree): boolean;
export function cmp(a: any, b: any): number;
/** Exporting 'Dexie' as the default export.
 **/
export default Dexie;

export {};
