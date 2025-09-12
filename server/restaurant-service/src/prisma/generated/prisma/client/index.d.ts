
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Restaurants
 * 
 */
export type Restaurants = $Result.DefaultSelection<Prisma.$RestaurantsPayload>
/**
 * Model MenuItems
 * 
 */
export type MenuItems = $Result.DefaultSelection<Prisma.$MenuItemsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Restaurants
 * const restaurants = await prisma.restaurants.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Restaurants
   * const restaurants = await prisma.restaurants.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.restaurants`: Exposes CRUD operations for the **Restaurants** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Restaurants
    * const restaurants = await prisma.restaurants.findMany()
    * ```
    */
  get restaurants(): Prisma.RestaurantsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.menuItems`: Exposes CRUD operations for the **MenuItems** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MenuItems
    * const menuItems = await prisma.menuItems.findMany()
    * ```
    */
  get menuItems(): Prisma.MenuItemsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.1
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Restaurants: 'Restaurants',
    MenuItems: 'MenuItems'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "restaurants" | "menuItems"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Restaurants: {
        payload: Prisma.$RestaurantsPayload<ExtArgs>
        fields: Prisma.RestaurantsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RestaurantsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RestaurantsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload>
          }
          findFirst: {
            args: Prisma.RestaurantsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RestaurantsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload>
          }
          findMany: {
            args: Prisma.RestaurantsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload>[]
          }
          create: {
            args: Prisma.RestaurantsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload>
          }
          createMany: {
            args: Prisma.RestaurantsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RestaurantsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload>[]
          }
          delete: {
            args: Prisma.RestaurantsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload>
          }
          update: {
            args: Prisma.RestaurantsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload>
          }
          deleteMany: {
            args: Prisma.RestaurantsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RestaurantsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RestaurantsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload>[]
          }
          upsert: {
            args: Prisma.RestaurantsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload>
          }
          aggregate: {
            args: Prisma.RestaurantsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRestaurants>
          }
          groupBy: {
            args: Prisma.RestaurantsGroupByArgs<ExtArgs>
            result: $Utils.Optional<RestaurantsGroupByOutputType>[]
          }
          count: {
            args: Prisma.RestaurantsCountArgs<ExtArgs>
            result: $Utils.Optional<RestaurantsCountAggregateOutputType> | number
          }
        }
      }
      MenuItems: {
        payload: Prisma.$MenuItemsPayload<ExtArgs>
        fields: Prisma.MenuItemsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MenuItemsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MenuItemsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemsPayload>
          }
          findFirst: {
            args: Prisma.MenuItemsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MenuItemsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemsPayload>
          }
          findMany: {
            args: Prisma.MenuItemsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemsPayload>[]
          }
          create: {
            args: Prisma.MenuItemsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemsPayload>
          }
          createMany: {
            args: Prisma.MenuItemsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MenuItemsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemsPayload>[]
          }
          delete: {
            args: Prisma.MenuItemsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemsPayload>
          }
          update: {
            args: Prisma.MenuItemsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemsPayload>
          }
          deleteMany: {
            args: Prisma.MenuItemsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MenuItemsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MenuItemsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemsPayload>[]
          }
          upsert: {
            args: Prisma.MenuItemsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemsPayload>
          }
          aggregate: {
            args: Prisma.MenuItemsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMenuItems>
          }
          groupBy: {
            args: Prisma.MenuItemsGroupByArgs<ExtArgs>
            result: $Utils.Optional<MenuItemsGroupByOutputType>[]
          }
          count: {
            args: Prisma.MenuItemsCountArgs<ExtArgs>
            result: $Utils.Optional<MenuItemsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    restaurants?: RestaurantsOmit
    menuItems?: MenuItemsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type RestaurantsCountOutputType
   */

  export type RestaurantsCountOutputType = {
    MenuItems: number
  }

  export type RestaurantsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    MenuItems?: boolean | RestaurantsCountOutputTypeCountMenuItemsArgs
  }

  // Custom InputTypes
  /**
   * RestaurantsCountOutputType without action
   */
  export type RestaurantsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantsCountOutputType
     */
    select?: RestaurantsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RestaurantsCountOutputType without action
   */
  export type RestaurantsCountOutputTypeCountMenuItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuItemsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Restaurants
   */

  export type AggregateRestaurants = {
    _count: RestaurantsCountAggregateOutputType | null
    _avg: RestaurantsAvgAggregateOutputType | null
    _sum: RestaurantsSumAggregateOutputType | null
    _min: RestaurantsMinAggregateOutputType | null
    _max: RestaurantsMaxAggregateOutputType | null
  }

  export type RestaurantsAvgAggregateOutputType = {
    RestaurantID: number | null
    OwnerID: number | null
  }

  export type RestaurantsSumAggregateOutputType = {
    RestaurantID: number | null
    OwnerID: number | null
  }

  export type RestaurantsMinAggregateOutputType = {
    RestaurantID: number | null
    OwnerID: number | null
    RestaurantName: string | null
    Address: string | null
    Phone: string | null
    Email: string | null
    Availability: string | null
  }

  export type RestaurantsMaxAggregateOutputType = {
    RestaurantID: number | null
    OwnerID: number | null
    RestaurantName: string | null
    Address: string | null
    Phone: string | null
    Email: string | null
    Availability: string | null
  }

  export type RestaurantsCountAggregateOutputType = {
    RestaurantID: number
    OwnerID: number
    RestaurantName: number
    Address: number
    Phone: number
    Email: number
    Availability: number
    _all: number
  }


  export type RestaurantsAvgAggregateInputType = {
    RestaurantID?: true
    OwnerID?: true
  }

  export type RestaurantsSumAggregateInputType = {
    RestaurantID?: true
    OwnerID?: true
  }

  export type RestaurantsMinAggregateInputType = {
    RestaurantID?: true
    OwnerID?: true
    RestaurantName?: true
    Address?: true
    Phone?: true
    Email?: true
    Availability?: true
  }

  export type RestaurantsMaxAggregateInputType = {
    RestaurantID?: true
    OwnerID?: true
    RestaurantName?: true
    Address?: true
    Phone?: true
    Email?: true
    Availability?: true
  }

  export type RestaurantsCountAggregateInputType = {
    RestaurantID?: true
    OwnerID?: true
    RestaurantName?: true
    Address?: true
    Phone?: true
    Email?: true
    Availability?: true
    _all?: true
  }

  export type RestaurantsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Restaurants to aggregate.
     */
    where?: RestaurantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: RestaurantsOrderByWithRelationInput | RestaurantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RestaurantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Restaurants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Restaurants
    **/
    _count?: true | RestaurantsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RestaurantsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RestaurantsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RestaurantsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RestaurantsMaxAggregateInputType
  }

  export type GetRestaurantsAggregateType<T extends RestaurantsAggregateArgs> = {
        [P in keyof T & keyof AggregateRestaurants]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRestaurants[P]>
      : GetScalarType<T[P], AggregateRestaurants[P]>
  }




  export type RestaurantsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RestaurantsWhereInput
    orderBy?: RestaurantsOrderByWithAggregationInput | RestaurantsOrderByWithAggregationInput[]
    by: RestaurantsScalarFieldEnum[] | RestaurantsScalarFieldEnum
    having?: RestaurantsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RestaurantsCountAggregateInputType | true
    _avg?: RestaurantsAvgAggregateInputType
    _sum?: RestaurantsSumAggregateInputType
    _min?: RestaurantsMinAggregateInputType
    _max?: RestaurantsMaxAggregateInputType
  }

  export type RestaurantsGroupByOutputType = {
    RestaurantID: number
    OwnerID: number | null
    RestaurantName: string
    Address: string
    Phone: string | null
    Email: string | null
    Availability: string
    _count: RestaurantsCountAggregateOutputType | null
    _avg: RestaurantsAvgAggregateOutputType | null
    _sum: RestaurantsSumAggregateOutputType | null
    _min: RestaurantsMinAggregateOutputType | null
    _max: RestaurantsMaxAggregateOutputType | null
  }

  type GetRestaurantsGroupByPayload<T extends RestaurantsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RestaurantsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RestaurantsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RestaurantsGroupByOutputType[P]>
            : GetScalarType<T[P], RestaurantsGroupByOutputType[P]>
        }
      >
    >


  export type RestaurantsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    RestaurantID?: boolean
    OwnerID?: boolean
    RestaurantName?: boolean
    Address?: boolean
    Phone?: boolean
    Email?: boolean
    Availability?: boolean
    MenuItems?: boolean | Restaurants$MenuItemsArgs<ExtArgs>
    _count?: boolean | RestaurantsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["restaurants"]>

  export type RestaurantsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    RestaurantID?: boolean
    OwnerID?: boolean
    RestaurantName?: boolean
    Address?: boolean
    Phone?: boolean
    Email?: boolean
    Availability?: boolean
  }, ExtArgs["result"]["restaurants"]>

  export type RestaurantsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    RestaurantID?: boolean
    OwnerID?: boolean
    RestaurantName?: boolean
    Address?: boolean
    Phone?: boolean
    Email?: boolean
    Availability?: boolean
  }, ExtArgs["result"]["restaurants"]>

  export type RestaurantsSelectScalar = {
    RestaurantID?: boolean
    OwnerID?: boolean
    RestaurantName?: boolean
    Address?: boolean
    Phone?: boolean
    Email?: boolean
    Availability?: boolean
  }

  export type RestaurantsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"RestaurantID" | "OwnerID" | "RestaurantName" | "Address" | "Phone" | "Email" | "Availability", ExtArgs["result"]["restaurants"]>
  export type RestaurantsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    MenuItems?: boolean | Restaurants$MenuItemsArgs<ExtArgs>
    _count?: boolean | RestaurantsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RestaurantsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RestaurantsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RestaurantsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Restaurants"
    objects: {
      MenuItems: Prisma.$MenuItemsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      RestaurantID: number
      OwnerID: number | null
      RestaurantName: string
      Address: string
      Phone: string | null
      Email: string | null
      Availability: string
    }, ExtArgs["result"]["restaurants"]>
    composites: {}
  }

  type RestaurantsGetPayload<S extends boolean | null | undefined | RestaurantsDefaultArgs> = $Result.GetResult<Prisma.$RestaurantsPayload, S>

  type RestaurantsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RestaurantsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RestaurantsCountAggregateInputType | true
    }

  export interface RestaurantsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Restaurants'], meta: { name: 'Restaurants' } }
    /**
     * Find zero or one Restaurants that matches the filter.
     * @param {RestaurantsFindUniqueArgs} args - Arguments to find a Restaurants
     * @example
     * // Get one Restaurants
     * const restaurants = await prisma.restaurants.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RestaurantsFindUniqueArgs>(args: SelectSubset<T, RestaurantsFindUniqueArgs<ExtArgs>>): Prisma__RestaurantsClient<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Restaurants that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RestaurantsFindUniqueOrThrowArgs} args - Arguments to find a Restaurants
     * @example
     * // Get one Restaurants
     * const restaurants = await prisma.restaurants.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RestaurantsFindUniqueOrThrowArgs>(args: SelectSubset<T, RestaurantsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RestaurantsClient<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Restaurants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantsFindFirstArgs} args - Arguments to find a Restaurants
     * @example
     * // Get one Restaurants
     * const restaurants = await prisma.restaurants.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RestaurantsFindFirstArgs>(args?: SelectSubset<T, RestaurantsFindFirstArgs<ExtArgs>>): Prisma__RestaurantsClient<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Restaurants that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantsFindFirstOrThrowArgs} args - Arguments to find a Restaurants
     * @example
     * // Get one Restaurants
     * const restaurants = await prisma.restaurants.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RestaurantsFindFirstOrThrowArgs>(args?: SelectSubset<T, RestaurantsFindFirstOrThrowArgs<ExtArgs>>): Prisma__RestaurantsClient<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Restaurants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Restaurants
     * const restaurants = await prisma.restaurants.findMany()
     * 
     * // Get first 10 Restaurants
     * const restaurants = await prisma.restaurants.findMany({ take: 10 })
     * 
     * // Only select the `RestaurantID`
     * const restaurantsWithRestaurantIDOnly = await prisma.restaurants.findMany({ select: { RestaurantID: true } })
     * 
     */
    findMany<T extends RestaurantsFindManyArgs>(args?: SelectSubset<T, RestaurantsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Restaurants.
     * @param {RestaurantsCreateArgs} args - Arguments to create a Restaurants.
     * @example
     * // Create one Restaurants
     * const Restaurants = await prisma.restaurants.create({
     *   data: {
     *     // ... data to create a Restaurants
     *   }
     * })
     * 
     */
    create<T extends RestaurantsCreateArgs>(args: SelectSubset<T, RestaurantsCreateArgs<ExtArgs>>): Prisma__RestaurantsClient<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Restaurants.
     * @param {RestaurantsCreateManyArgs} args - Arguments to create many Restaurants.
     * @example
     * // Create many Restaurants
     * const restaurants = await prisma.restaurants.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RestaurantsCreateManyArgs>(args?: SelectSubset<T, RestaurantsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Restaurants and returns the data saved in the database.
     * @param {RestaurantsCreateManyAndReturnArgs} args - Arguments to create many Restaurants.
     * @example
     * // Create many Restaurants
     * const restaurants = await prisma.restaurants.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Restaurants and only return the `RestaurantID`
     * const restaurantsWithRestaurantIDOnly = await prisma.restaurants.createManyAndReturn({
     *   select: { RestaurantID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RestaurantsCreateManyAndReturnArgs>(args?: SelectSubset<T, RestaurantsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Restaurants.
     * @param {RestaurantsDeleteArgs} args - Arguments to delete one Restaurants.
     * @example
     * // Delete one Restaurants
     * const Restaurants = await prisma.restaurants.delete({
     *   where: {
     *     // ... filter to delete one Restaurants
     *   }
     * })
     * 
     */
    delete<T extends RestaurantsDeleteArgs>(args: SelectSubset<T, RestaurantsDeleteArgs<ExtArgs>>): Prisma__RestaurantsClient<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Restaurants.
     * @param {RestaurantsUpdateArgs} args - Arguments to update one Restaurants.
     * @example
     * // Update one Restaurants
     * const restaurants = await prisma.restaurants.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RestaurantsUpdateArgs>(args: SelectSubset<T, RestaurantsUpdateArgs<ExtArgs>>): Prisma__RestaurantsClient<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Restaurants.
     * @param {RestaurantsDeleteManyArgs} args - Arguments to filter Restaurants to delete.
     * @example
     * // Delete a few Restaurants
     * const { count } = await prisma.restaurants.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RestaurantsDeleteManyArgs>(args?: SelectSubset<T, RestaurantsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Restaurants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Restaurants
     * const restaurants = await prisma.restaurants.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RestaurantsUpdateManyArgs>(args: SelectSubset<T, RestaurantsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Restaurants and returns the data updated in the database.
     * @param {RestaurantsUpdateManyAndReturnArgs} args - Arguments to update many Restaurants.
     * @example
     * // Update many Restaurants
     * const restaurants = await prisma.restaurants.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Restaurants and only return the `RestaurantID`
     * const restaurantsWithRestaurantIDOnly = await prisma.restaurants.updateManyAndReturn({
     *   select: { RestaurantID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RestaurantsUpdateManyAndReturnArgs>(args: SelectSubset<T, RestaurantsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Restaurants.
     * @param {RestaurantsUpsertArgs} args - Arguments to update or create a Restaurants.
     * @example
     * // Update or create a Restaurants
     * const restaurants = await prisma.restaurants.upsert({
     *   create: {
     *     // ... data to create a Restaurants
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Restaurants we want to update
     *   }
     * })
     */
    upsert<T extends RestaurantsUpsertArgs>(args: SelectSubset<T, RestaurantsUpsertArgs<ExtArgs>>): Prisma__RestaurantsClient<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Restaurants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantsCountArgs} args - Arguments to filter Restaurants to count.
     * @example
     * // Count the number of Restaurants
     * const count = await prisma.restaurants.count({
     *   where: {
     *     // ... the filter for the Restaurants we want to count
     *   }
     * })
    **/
    count<T extends RestaurantsCountArgs>(
      args?: Subset<T, RestaurantsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RestaurantsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Restaurants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RestaurantsAggregateArgs>(args: Subset<T, RestaurantsAggregateArgs>): Prisma.PrismaPromise<GetRestaurantsAggregateType<T>>

    /**
     * Group by Restaurants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RestaurantsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RestaurantsGroupByArgs['orderBy'] }
        : { orderBy?: RestaurantsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RestaurantsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRestaurantsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Restaurants model
   */
  readonly fields: RestaurantsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Restaurants.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RestaurantsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    MenuItems<T extends Restaurants$MenuItemsArgs<ExtArgs> = {}>(args?: Subset<T, Restaurants$MenuItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Restaurants model
   */
  interface RestaurantsFieldRefs {
    readonly RestaurantID: FieldRef<"Restaurants", 'Int'>
    readonly OwnerID: FieldRef<"Restaurants", 'Int'>
    readonly RestaurantName: FieldRef<"Restaurants", 'String'>
    readonly Address: FieldRef<"Restaurants", 'String'>
    readonly Phone: FieldRef<"Restaurants", 'String'>
    readonly Email: FieldRef<"Restaurants", 'String'>
    readonly Availability: FieldRef<"Restaurants", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Restaurants findUnique
   */
  export type RestaurantsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    /**
     * Filter, which Restaurants to fetch.
     */
    where: RestaurantsWhereUniqueInput
  }

  /**
   * Restaurants findUniqueOrThrow
   */
  export type RestaurantsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    /**
     * Filter, which Restaurants to fetch.
     */
    where: RestaurantsWhereUniqueInput
  }

  /**
   * Restaurants findFirst
   */
  export type RestaurantsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    /**
     * Filter, which Restaurants to fetch.
     */
    where?: RestaurantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: RestaurantsOrderByWithRelationInput | RestaurantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Restaurants.
     */
    cursor?: RestaurantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Restaurants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Restaurants.
     */
    distinct?: RestaurantsScalarFieldEnum | RestaurantsScalarFieldEnum[]
  }

  /**
   * Restaurants findFirstOrThrow
   */
  export type RestaurantsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    /**
     * Filter, which Restaurants to fetch.
     */
    where?: RestaurantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: RestaurantsOrderByWithRelationInput | RestaurantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Restaurants.
     */
    cursor?: RestaurantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Restaurants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Restaurants.
     */
    distinct?: RestaurantsScalarFieldEnum | RestaurantsScalarFieldEnum[]
  }

  /**
   * Restaurants findMany
   */
  export type RestaurantsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    /**
     * Filter, which Restaurants to fetch.
     */
    where?: RestaurantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: RestaurantsOrderByWithRelationInput | RestaurantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Restaurants.
     */
    cursor?: RestaurantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Restaurants.
     */
    skip?: number
    distinct?: RestaurantsScalarFieldEnum | RestaurantsScalarFieldEnum[]
  }

  /**
   * Restaurants create
   */
  export type RestaurantsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    /**
     * The data needed to create a Restaurants.
     */
    data: XOR<RestaurantsCreateInput, RestaurantsUncheckedCreateInput>
  }

  /**
   * Restaurants createMany
   */
  export type RestaurantsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Restaurants.
     */
    data: RestaurantsCreateManyInput | RestaurantsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Restaurants createManyAndReturn
   */
  export type RestaurantsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * The data used to create many Restaurants.
     */
    data: RestaurantsCreateManyInput | RestaurantsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Restaurants update
   */
  export type RestaurantsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    /**
     * The data needed to update a Restaurants.
     */
    data: XOR<RestaurantsUpdateInput, RestaurantsUncheckedUpdateInput>
    /**
     * Choose, which Restaurants to update.
     */
    where: RestaurantsWhereUniqueInput
  }

  /**
   * Restaurants updateMany
   */
  export type RestaurantsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Restaurants.
     */
    data: XOR<RestaurantsUpdateManyMutationInput, RestaurantsUncheckedUpdateManyInput>
    /**
     * Filter which Restaurants to update
     */
    where?: RestaurantsWhereInput
    /**
     * Limit how many Restaurants to update.
     */
    limit?: number
  }

  /**
   * Restaurants updateManyAndReturn
   */
  export type RestaurantsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * The data used to update Restaurants.
     */
    data: XOR<RestaurantsUpdateManyMutationInput, RestaurantsUncheckedUpdateManyInput>
    /**
     * Filter which Restaurants to update
     */
    where?: RestaurantsWhereInput
    /**
     * Limit how many Restaurants to update.
     */
    limit?: number
  }

  /**
   * Restaurants upsert
   */
  export type RestaurantsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    /**
     * The filter to search for the Restaurants to update in case it exists.
     */
    where: RestaurantsWhereUniqueInput
    /**
     * In case the Restaurants found by the `where` argument doesn't exist, create a new Restaurants with this data.
     */
    create: XOR<RestaurantsCreateInput, RestaurantsUncheckedCreateInput>
    /**
     * In case the Restaurants was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RestaurantsUpdateInput, RestaurantsUncheckedUpdateInput>
  }

  /**
   * Restaurants delete
   */
  export type RestaurantsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    /**
     * Filter which Restaurants to delete.
     */
    where: RestaurantsWhereUniqueInput
  }

  /**
   * Restaurants deleteMany
   */
  export type RestaurantsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Restaurants to delete
     */
    where?: RestaurantsWhereInput
    /**
     * Limit how many Restaurants to delete.
     */
    limit?: number
  }

  /**
   * Restaurants.MenuItems
   */
  export type Restaurants$MenuItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItems
     */
    select?: MenuItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItems
     */
    omit?: MenuItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemsInclude<ExtArgs> | null
    where?: MenuItemsWhereInput
    orderBy?: MenuItemsOrderByWithRelationInput | MenuItemsOrderByWithRelationInput[]
    cursor?: MenuItemsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MenuItemsScalarFieldEnum | MenuItemsScalarFieldEnum[]
  }

  /**
   * Restaurants without action
   */
  export type RestaurantsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
  }


  /**
   * Model MenuItems
   */

  export type AggregateMenuItems = {
    _count: MenuItemsCountAggregateOutputType | null
    _avg: MenuItemsAvgAggregateOutputType | null
    _sum: MenuItemsSumAggregateOutputType | null
    _min: MenuItemsMinAggregateOutputType | null
    _max: MenuItemsMaxAggregateOutputType | null
  }

  export type MenuItemsAvgAggregateOutputType = {
    MenuItemID: number | null
    RestaurantID: number | null
    Price: Decimal | null
  }

  export type MenuItemsSumAggregateOutputType = {
    MenuItemID: number | null
    RestaurantID: number | null
    Price: Decimal | null
  }

  export type MenuItemsMinAggregateOutputType = {
    MenuItemID: number | null
    RestaurantID: number | null
    Name: string | null
    Description: string | null
    Price: Decimal | null
    IsAvailable: boolean | null
  }

  export type MenuItemsMaxAggregateOutputType = {
    MenuItemID: number | null
    RestaurantID: number | null
    Name: string | null
    Description: string | null
    Price: Decimal | null
    IsAvailable: boolean | null
  }

  export type MenuItemsCountAggregateOutputType = {
    MenuItemID: number
    RestaurantID: number
    Name: number
    Description: number
    Price: number
    IsAvailable: number
    _all: number
  }


  export type MenuItemsAvgAggregateInputType = {
    MenuItemID?: true
    RestaurantID?: true
    Price?: true
  }

  export type MenuItemsSumAggregateInputType = {
    MenuItemID?: true
    RestaurantID?: true
    Price?: true
  }

  export type MenuItemsMinAggregateInputType = {
    MenuItemID?: true
    RestaurantID?: true
    Name?: true
    Description?: true
    Price?: true
    IsAvailable?: true
  }

  export type MenuItemsMaxAggregateInputType = {
    MenuItemID?: true
    RestaurantID?: true
    Name?: true
    Description?: true
    Price?: true
    IsAvailable?: true
  }

  export type MenuItemsCountAggregateInputType = {
    MenuItemID?: true
    RestaurantID?: true
    Name?: true
    Description?: true
    Price?: true
    IsAvailable?: true
    _all?: true
  }

  export type MenuItemsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MenuItems to aggregate.
     */
    where?: MenuItemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemsOrderByWithRelationInput | MenuItemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MenuItemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MenuItems
    **/
    _count?: true | MenuItemsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MenuItemsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MenuItemsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MenuItemsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MenuItemsMaxAggregateInputType
  }

  export type GetMenuItemsAggregateType<T extends MenuItemsAggregateArgs> = {
        [P in keyof T & keyof AggregateMenuItems]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMenuItems[P]>
      : GetScalarType<T[P], AggregateMenuItems[P]>
  }




  export type MenuItemsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuItemsWhereInput
    orderBy?: MenuItemsOrderByWithAggregationInput | MenuItemsOrderByWithAggregationInput[]
    by: MenuItemsScalarFieldEnum[] | MenuItemsScalarFieldEnum
    having?: MenuItemsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MenuItemsCountAggregateInputType | true
    _avg?: MenuItemsAvgAggregateInputType
    _sum?: MenuItemsSumAggregateInputType
    _min?: MenuItemsMinAggregateInputType
    _max?: MenuItemsMaxAggregateInputType
  }

  export type MenuItemsGroupByOutputType = {
    MenuItemID: number
    RestaurantID: number | null
    Name: string
    Description: string | null
    Price: Decimal
    IsAvailable: boolean | null
    _count: MenuItemsCountAggregateOutputType | null
    _avg: MenuItemsAvgAggregateOutputType | null
    _sum: MenuItemsSumAggregateOutputType | null
    _min: MenuItemsMinAggregateOutputType | null
    _max: MenuItemsMaxAggregateOutputType | null
  }

  type GetMenuItemsGroupByPayload<T extends MenuItemsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MenuItemsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MenuItemsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MenuItemsGroupByOutputType[P]>
            : GetScalarType<T[P], MenuItemsGroupByOutputType[P]>
        }
      >
    >


  export type MenuItemsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    MenuItemID?: boolean
    RestaurantID?: boolean
    Name?: boolean
    Description?: boolean
    Price?: boolean
    IsAvailable?: boolean
    Restaurants?: boolean | MenuItems$RestaurantsArgs<ExtArgs>
  }, ExtArgs["result"]["menuItems"]>

  export type MenuItemsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    MenuItemID?: boolean
    RestaurantID?: boolean
    Name?: boolean
    Description?: boolean
    Price?: boolean
    IsAvailable?: boolean
    Restaurants?: boolean | MenuItems$RestaurantsArgs<ExtArgs>
  }, ExtArgs["result"]["menuItems"]>

  export type MenuItemsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    MenuItemID?: boolean
    RestaurantID?: boolean
    Name?: boolean
    Description?: boolean
    Price?: boolean
    IsAvailable?: boolean
    Restaurants?: boolean | MenuItems$RestaurantsArgs<ExtArgs>
  }, ExtArgs["result"]["menuItems"]>

  export type MenuItemsSelectScalar = {
    MenuItemID?: boolean
    RestaurantID?: boolean
    Name?: boolean
    Description?: boolean
    Price?: boolean
    IsAvailable?: boolean
  }

  export type MenuItemsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"MenuItemID" | "RestaurantID" | "Name" | "Description" | "Price" | "IsAvailable", ExtArgs["result"]["menuItems"]>
  export type MenuItemsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Restaurants?: boolean | MenuItems$RestaurantsArgs<ExtArgs>
  }
  export type MenuItemsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Restaurants?: boolean | MenuItems$RestaurantsArgs<ExtArgs>
  }
  export type MenuItemsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Restaurants?: boolean | MenuItems$RestaurantsArgs<ExtArgs>
  }

  export type $MenuItemsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MenuItems"
    objects: {
      Restaurants: Prisma.$RestaurantsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      MenuItemID: number
      RestaurantID: number | null
      Name: string
      Description: string | null
      Price: Prisma.Decimal
      IsAvailable: boolean | null
    }, ExtArgs["result"]["menuItems"]>
    composites: {}
  }

  type MenuItemsGetPayload<S extends boolean | null | undefined | MenuItemsDefaultArgs> = $Result.GetResult<Prisma.$MenuItemsPayload, S>

  type MenuItemsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MenuItemsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MenuItemsCountAggregateInputType | true
    }

  export interface MenuItemsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MenuItems'], meta: { name: 'MenuItems' } }
    /**
     * Find zero or one MenuItems that matches the filter.
     * @param {MenuItemsFindUniqueArgs} args - Arguments to find a MenuItems
     * @example
     * // Get one MenuItems
     * const menuItems = await prisma.menuItems.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MenuItemsFindUniqueArgs>(args: SelectSubset<T, MenuItemsFindUniqueArgs<ExtArgs>>): Prisma__MenuItemsClient<$Result.GetResult<Prisma.$MenuItemsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MenuItems that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MenuItemsFindUniqueOrThrowArgs} args - Arguments to find a MenuItems
     * @example
     * // Get one MenuItems
     * const menuItems = await prisma.menuItems.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MenuItemsFindUniqueOrThrowArgs>(args: SelectSubset<T, MenuItemsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MenuItemsClient<$Result.GetResult<Prisma.$MenuItemsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MenuItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemsFindFirstArgs} args - Arguments to find a MenuItems
     * @example
     * // Get one MenuItems
     * const menuItems = await prisma.menuItems.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MenuItemsFindFirstArgs>(args?: SelectSubset<T, MenuItemsFindFirstArgs<ExtArgs>>): Prisma__MenuItemsClient<$Result.GetResult<Prisma.$MenuItemsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MenuItems that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemsFindFirstOrThrowArgs} args - Arguments to find a MenuItems
     * @example
     * // Get one MenuItems
     * const menuItems = await prisma.menuItems.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MenuItemsFindFirstOrThrowArgs>(args?: SelectSubset<T, MenuItemsFindFirstOrThrowArgs<ExtArgs>>): Prisma__MenuItemsClient<$Result.GetResult<Prisma.$MenuItemsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MenuItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MenuItems
     * const menuItems = await prisma.menuItems.findMany()
     * 
     * // Get first 10 MenuItems
     * const menuItems = await prisma.menuItems.findMany({ take: 10 })
     * 
     * // Only select the `MenuItemID`
     * const menuItemsWithMenuItemIDOnly = await prisma.menuItems.findMany({ select: { MenuItemID: true } })
     * 
     */
    findMany<T extends MenuItemsFindManyArgs>(args?: SelectSubset<T, MenuItemsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MenuItems.
     * @param {MenuItemsCreateArgs} args - Arguments to create a MenuItems.
     * @example
     * // Create one MenuItems
     * const MenuItems = await prisma.menuItems.create({
     *   data: {
     *     // ... data to create a MenuItems
     *   }
     * })
     * 
     */
    create<T extends MenuItemsCreateArgs>(args: SelectSubset<T, MenuItemsCreateArgs<ExtArgs>>): Prisma__MenuItemsClient<$Result.GetResult<Prisma.$MenuItemsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MenuItems.
     * @param {MenuItemsCreateManyArgs} args - Arguments to create many MenuItems.
     * @example
     * // Create many MenuItems
     * const menuItems = await prisma.menuItems.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MenuItemsCreateManyArgs>(args?: SelectSubset<T, MenuItemsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MenuItems and returns the data saved in the database.
     * @param {MenuItemsCreateManyAndReturnArgs} args - Arguments to create many MenuItems.
     * @example
     * // Create many MenuItems
     * const menuItems = await prisma.menuItems.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MenuItems and only return the `MenuItemID`
     * const menuItemsWithMenuItemIDOnly = await prisma.menuItems.createManyAndReturn({
     *   select: { MenuItemID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MenuItemsCreateManyAndReturnArgs>(args?: SelectSubset<T, MenuItemsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MenuItems.
     * @param {MenuItemsDeleteArgs} args - Arguments to delete one MenuItems.
     * @example
     * // Delete one MenuItems
     * const MenuItems = await prisma.menuItems.delete({
     *   where: {
     *     // ... filter to delete one MenuItems
     *   }
     * })
     * 
     */
    delete<T extends MenuItemsDeleteArgs>(args: SelectSubset<T, MenuItemsDeleteArgs<ExtArgs>>): Prisma__MenuItemsClient<$Result.GetResult<Prisma.$MenuItemsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MenuItems.
     * @param {MenuItemsUpdateArgs} args - Arguments to update one MenuItems.
     * @example
     * // Update one MenuItems
     * const menuItems = await prisma.menuItems.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MenuItemsUpdateArgs>(args: SelectSubset<T, MenuItemsUpdateArgs<ExtArgs>>): Prisma__MenuItemsClient<$Result.GetResult<Prisma.$MenuItemsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MenuItems.
     * @param {MenuItemsDeleteManyArgs} args - Arguments to filter MenuItems to delete.
     * @example
     * // Delete a few MenuItems
     * const { count } = await prisma.menuItems.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MenuItemsDeleteManyArgs>(args?: SelectSubset<T, MenuItemsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MenuItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MenuItems
     * const menuItems = await prisma.menuItems.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MenuItemsUpdateManyArgs>(args: SelectSubset<T, MenuItemsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MenuItems and returns the data updated in the database.
     * @param {MenuItemsUpdateManyAndReturnArgs} args - Arguments to update many MenuItems.
     * @example
     * // Update many MenuItems
     * const menuItems = await prisma.menuItems.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MenuItems and only return the `MenuItemID`
     * const menuItemsWithMenuItemIDOnly = await prisma.menuItems.updateManyAndReturn({
     *   select: { MenuItemID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MenuItemsUpdateManyAndReturnArgs>(args: SelectSubset<T, MenuItemsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MenuItems.
     * @param {MenuItemsUpsertArgs} args - Arguments to update or create a MenuItems.
     * @example
     * // Update or create a MenuItems
     * const menuItems = await prisma.menuItems.upsert({
     *   create: {
     *     // ... data to create a MenuItems
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MenuItems we want to update
     *   }
     * })
     */
    upsert<T extends MenuItemsUpsertArgs>(args: SelectSubset<T, MenuItemsUpsertArgs<ExtArgs>>): Prisma__MenuItemsClient<$Result.GetResult<Prisma.$MenuItemsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MenuItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemsCountArgs} args - Arguments to filter MenuItems to count.
     * @example
     * // Count the number of MenuItems
     * const count = await prisma.menuItems.count({
     *   where: {
     *     // ... the filter for the MenuItems we want to count
     *   }
     * })
    **/
    count<T extends MenuItemsCountArgs>(
      args?: Subset<T, MenuItemsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MenuItemsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MenuItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MenuItemsAggregateArgs>(args: Subset<T, MenuItemsAggregateArgs>): Prisma.PrismaPromise<GetMenuItemsAggregateType<T>>

    /**
     * Group by MenuItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MenuItemsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MenuItemsGroupByArgs['orderBy'] }
        : { orderBy?: MenuItemsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MenuItemsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMenuItemsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MenuItems model
   */
  readonly fields: MenuItemsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MenuItems.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MenuItemsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Restaurants<T extends MenuItems$RestaurantsArgs<ExtArgs> = {}>(args?: Subset<T, MenuItems$RestaurantsArgs<ExtArgs>>): Prisma__RestaurantsClient<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MenuItems model
   */
  interface MenuItemsFieldRefs {
    readonly MenuItemID: FieldRef<"MenuItems", 'Int'>
    readonly RestaurantID: FieldRef<"MenuItems", 'Int'>
    readonly Name: FieldRef<"MenuItems", 'String'>
    readonly Description: FieldRef<"MenuItems", 'String'>
    readonly Price: FieldRef<"MenuItems", 'Decimal'>
    readonly IsAvailable: FieldRef<"MenuItems", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * MenuItems findUnique
   */
  export type MenuItemsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItems
     */
    select?: MenuItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItems
     */
    omit?: MenuItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemsInclude<ExtArgs> | null
    /**
     * Filter, which MenuItems to fetch.
     */
    where: MenuItemsWhereUniqueInput
  }

  /**
   * MenuItems findUniqueOrThrow
   */
  export type MenuItemsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItems
     */
    select?: MenuItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItems
     */
    omit?: MenuItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemsInclude<ExtArgs> | null
    /**
     * Filter, which MenuItems to fetch.
     */
    where: MenuItemsWhereUniqueInput
  }

  /**
   * MenuItems findFirst
   */
  export type MenuItemsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItems
     */
    select?: MenuItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItems
     */
    omit?: MenuItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemsInclude<ExtArgs> | null
    /**
     * Filter, which MenuItems to fetch.
     */
    where?: MenuItemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemsOrderByWithRelationInput | MenuItemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MenuItems.
     */
    cursor?: MenuItemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenuItems.
     */
    distinct?: MenuItemsScalarFieldEnum | MenuItemsScalarFieldEnum[]
  }

  /**
   * MenuItems findFirstOrThrow
   */
  export type MenuItemsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItems
     */
    select?: MenuItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItems
     */
    omit?: MenuItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemsInclude<ExtArgs> | null
    /**
     * Filter, which MenuItems to fetch.
     */
    where?: MenuItemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemsOrderByWithRelationInput | MenuItemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MenuItems.
     */
    cursor?: MenuItemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenuItems.
     */
    distinct?: MenuItemsScalarFieldEnum | MenuItemsScalarFieldEnum[]
  }

  /**
   * MenuItems findMany
   */
  export type MenuItemsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItems
     */
    select?: MenuItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItems
     */
    omit?: MenuItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemsInclude<ExtArgs> | null
    /**
     * Filter, which MenuItems to fetch.
     */
    where?: MenuItemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemsOrderByWithRelationInput | MenuItemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MenuItems.
     */
    cursor?: MenuItemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    distinct?: MenuItemsScalarFieldEnum | MenuItemsScalarFieldEnum[]
  }

  /**
   * MenuItems create
   */
  export type MenuItemsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItems
     */
    select?: MenuItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItems
     */
    omit?: MenuItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemsInclude<ExtArgs> | null
    /**
     * The data needed to create a MenuItems.
     */
    data: XOR<MenuItemsCreateInput, MenuItemsUncheckedCreateInput>
  }

  /**
   * MenuItems createMany
   */
  export type MenuItemsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MenuItems.
     */
    data: MenuItemsCreateManyInput | MenuItemsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MenuItems createManyAndReturn
   */
  export type MenuItemsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItems
     */
    select?: MenuItemsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItems
     */
    omit?: MenuItemsOmit<ExtArgs> | null
    /**
     * The data used to create many MenuItems.
     */
    data: MenuItemsCreateManyInput | MenuItemsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MenuItems update
   */
  export type MenuItemsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItems
     */
    select?: MenuItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItems
     */
    omit?: MenuItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemsInclude<ExtArgs> | null
    /**
     * The data needed to update a MenuItems.
     */
    data: XOR<MenuItemsUpdateInput, MenuItemsUncheckedUpdateInput>
    /**
     * Choose, which MenuItems to update.
     */
    where: MenuItemsWhereUniqueInput
  }

  /**
   * MenuItems updateMany
   */
  export type MenuItemsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MenuItems.
     */
    data: XOR<MenuItemsUpdateManyMutationInput, MenuItemsUncheckedUpdateManyInput>
    /**
     * Filter which MenuItems to update
     */
    where?: MenuItemsWhereInput
    /**
     * Limit how many MenuItems to update.
     */
    limit?: number
  }

  /**
   * MenuItems updateManyAndReturn
   */
  export type MenuItemsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItems
     */
    select?: MenuItemsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItems
     */
    omit?: MenuItemsOmit<ExtArgs> | null
    /**
     * The data used to update MenuItems.
     */
    data: XOR<MenuItemsUpdateManyMutationInput, MenuItemsUncheckedUpdateManyInput>
    /**
     * Filter which MenuItems to update
     */
    where?: MenuItemsWhereInput
    /**
     * Limit how many MenuItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MenuItems upsert
   */
  export type MenuItemsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItems
     */
    select?: MenuItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItems
     */
    omit?: MenuItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemsInclude<ExtArgs> | null
    /**
     * The filter to search for the MenuItems to update in case it exists.
     */
    where: MenuItemsWhereUniqueInput
    /**
     * In case the MenuItems found by the `where` argument doesn't exist, create a new MenuItems with this data.
     */
    create: XOR<MenuItemsCreateInput, MenuItemsUncheckedCreateInput>
    /**
     * In case the MenuItems was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MenuItemsUpdateInput, MenuItemsUncheckedUpdateInput>
  }

  /**
   * MenuItems delete
   */
  export type MenuItemsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItems
     */
    select?: MenuItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItems
     */
    omit?: MenuItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemsInclude<ExtArgs> | null
    /**
     * Filter which MenuItems to delete.
     */
    where: MenuItemsWhereUniqueInput
  }

  /**
   * MenuItems deleteMany
   */
  export type MenuItemsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MenuItems to delete
     */
    where?: MenuItemsWhereInput
    /**
     * Limit how many MenuItems to delete.
     */
    limit?: number
  }

  /**
   * MenuItems.Restaurants
   */
  export type MenuItems$RestaurantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    where?: RestaurantsWhereInput
  }

  /**
   * MenuItems without action
   */
  export type MenuItemsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItems
     */
    select?: MenuItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItems
     */
    omit?: MenuItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RestaurantsScalarFieldEnum: {
    RestaurantID: 'RestaurantID',
    OwnerID: 'OwnerID',
    RestaurantName: 'RestaurantName',
    Address: 'Address',
    Phone: 'Phone',
    Email: 'Email',
    Availability: 'Availability'
  };

  export type RestaurantsScalarFieldEnum = (typeof RestaurantsScalarFieldEnum)[keyof typeof RestaurantsScalarFieldEnum]


  export const MenuItemsScalarFieldEnum: {
    MenuItemID: 'MenuItemID',
    RestaurantID: 'RestaurantID',
    Name: 'Name',
    Description: 'Description',
    Price: 'Price',
    IsAvailable: 'IsAvailable'
  };

  export type MenuItemsScalarFieldEnum = (typeof MenuItemsScalarFieldEnum)[keyof typeof MenuItemsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type RestaurantsWhereInput = {
    AND?: RestaurantsWhereInput | RestaurantsWhereInput[]
    OR?: RestaurantsWhereInput[]
    NOT?: RestaurantsWhereInput | RestaurantsWhereInput[]
    RestaurantID?: IntFilter<"Restaurants"> | number
    OwnerID?: IntNullableFilter<"Restaurants"> | number | null
    RestaurantName?: StringFilter<"Restaurants"> | string
    Address?: StringFilter<"Restaurants"> | string
    Phone?: StringNullableFilter<"Restaurants"> | string | null
    Email?: StringNullableFilter<"Restaurants"> | string | null
    Availability?: StringFilter<"Restaurants"> | string
    MenuItems?: MenuItemsListRelationFilter
  }

  export type RestaurantsOrderByWithRelationInput = {
    RestaurantID?: SortOrder
    OwnerID?: SortOrderInput | SortOrder
    RestaurantName?: SortOrder
    Address?: SortOrder
    Phone?: SortOrderInput | SortOrder
    Email?: SortOrderInput | SortOrder
    Availability?: SortOrder
    MenuItems?: MenuItemsOrderByRelationAggregateInput
  }

  export type RestaurantsWhereUniqueInput = Prisma.AtLeast<{
    RestaurantID?: number
    AND?: RestaurantsWhereInput | RestaurantsWhereInput[]
    OR?: RestaurantsWhereInput[]
    NOT?: RestaurantsWhereInput | RestaurantsWhereInput[]
    OwnerID?: IntNullableFilter<"Restaurants"> | number | null
    RestaurantName?: StringFilter<"Restaurants"> | string
    Address?: StringFilter<"Restaurants"> | string
    Phone?: StringNullableFilter<"Restaurants"> | string | null
    Email?: StringNullableFilter<"Restaurants"> | string | null
    Availability?: StringFilter<"Restaurants"> | string
    MenuItems?: MenuItemsListRelationFilter
  }, "RestaurantID">

  export type RestaurantsOrderByWithAggregationInput = {
    RestaurantID?: SortOrder
    OwnerID?: SortOrderInput | SortOrder
    RestaurantName?: SortOrder
    Address?: SortOrder
    Phone?: SortOrderInput | SortOrder
    Email?: SortOrderInput | SortOrder
    Availability?: SortOrder
    _count?: RestaurantsCountOrderByAggregateInput
    _avg?: RestaurantsAvgOrderByAggregateInput
    _max?: RestaurantsMaxOrderByAggregateInput
    _min?: RestaurantsMinOrderByAggregateInput
    _sum?: RestaurantsSumOrderByAggregateInput
  }

  export type RestaurantsScalarWhereWithAggregatesInput = {
    AND?: RestaurantsScalarWhereWithAggregatesInput | RestaurantsScalarWhereWithAggregatesInput[]
    OR?: RestaurantsScalarWhereWithAggregatesInput[]
    NOT?: RestaurantsScalarWhereWithAggregatesInput | RestaurantsScalarWhereWithAggregatesInput[]
    RestaurantID?: IntWithAggregatesFilter<"Restaurants"> | number
    OwnerID?: IntNullableWithAggregatesFilter<"Restaurants"> | number | null
    RestaurantName?: StringWithAggregatesFilter<"Restaurants"> | string
    Address?: StringWithAggregatesFilter<"Restaurants"> | string
    Phone?: StringNullableWithAggregatesFilter<"Restaurants"> | string | null
    Email?: StringNullableWithAggregatesFilter<"Restaurants"> | string | null
    Availability?: StringWithAggregatesFilter<"Restaurants"> | string
  }

  export type MenuItemsWhereInput = {
    AND?: MenuItemsWhereInput | MenuItemsWhereInput[]
    OR?: MenuItemsWhereInput[]
    NOT?: MenuItemsWhereInput | MenuItemsWhereInput[]
    MenuItemID?: IntFilter<"MenuItems"> | number
    RestaurantID?: IntNullableFilter<"MenuItems"> | number | null
    Name?: StringFilter<"MenuItems"> | string
    Description?: StringNullableFilter<"MenuItems"> | string | null
    Price?: DecimalFilter<"MenuItems"> | Decimal | DecimalJsLike | number | string
    IsAvailable?: BoolNullableFilter<"MenuItems"> | boolean | null
    Restaurants?: XOR<RestaurantsNullableScalarRelationFilter, RestaurantsWhereInput> | null
  }

  export type MenuItemsOrderByWithRelationInput = {
    MenuItemID?: SortOrder
    RestaurantID?: SortOrderInput | SortOrder
    Name?: SortOrder
    Description?: SortOrderInput | SortOrder
    Price?: SortOrder
    IsAvailable?: SortOrderInput | SortOrder
    Restaurants?: RestaurantsOrderByWithRelationInput
  }

  export type MenuItemsWhereUniqueInput = Prisma.AtLeast<{
    MenuItemID?: number
    AND?: MenuItemsWhereInput | MenuItemsWhereInput[]
    OR?: MenuItemsWhereInput[]
    NOT?: MenuItemsWhereInput | MenuItemsWhereInput[]
    RestaurantID?: IntNullableFilter<"MenuItems"> | number | null
    Name?: StringFilter<"MenuItems"> | string
    Description?: StringNullableFilter<"MenuItems"> | string | null
    Price?: DecimalFilter<"MenuItems"> | Decimal | DecimalJsLike | number | string
    IsAvailable?: BoolNullableFilter<"MenuItems"> | boolean | null
    Restaurants?: XOR<RestaurantsNullableScalarRelationFilter, RestaurantsWhereInput> | null
  }, "MenuItemID">

  export type MenuItemsOrderByWithAggregationInput = {
    MenuItemID?: SortOrder
    RestaurantID?: SortOrderInput | SortOrder
    Name?: SortOrder
    Description?: SortOrderInput | SortOrder
    Price?: SortOrder
    IsAvailable?: SortOrderInput | SortOrder
    _count?: MenuItemsCountOrderByAggregateInput
    _avg?: MenuItemsAvgOrderByAggregateInput
    _max?: MenuItemsMaxOrderByAggregateInput
    _min?: MenuItemsMinOrderByAggregateInput
    _sum?: MenuItemsSumOrderByAggregateInput
  }

  export type MenuItemsScalarWhereWithAggregatesInput = {
    AND?: MenuItemsScalarWhereWithAggregatesInput | MenuItemsScalarWhereWithAggregatesInput[]
    OR?: MenuItemsScalarWhereWithAggregatesInput[]
    NOT?: MenuItemsScalarWhereWithAggregatesInput | MenuItemsScalarWhereWithAggregatesInput[]
    MenuItemID?: IntWithAggregatesFilter<"MenuItems"> | number
    RestaurantID?: IntNullableWithAggregatesFilter<"MenuItems"> | number | null
    Name?: StringWithAggregatesFilter<"MenuItems"> | string
    Description?: StringNullableWithAggregatesFilter<"MenuItems"> | string | null
    Price?: DecimalWithAggregatesFilter<"MenuItems"> | Decimal | DecimalJsLike | number | string
    IsAvailable?: BoolNullableWithAggregatesFilter<"MenuItems"> | boolean | null
  }

  export type RestaurantsCreateInput = {
    OwnerID?: number | null
    RestaurantName: string
    Address: string
    Phone?: string | null
    Email?: string | null
    Availability: string
    MenuItems?: MenuItemsCreateNestedManyWithoutRestaurantsInput
  }

  export type RestaurantsUncheckedCreateInput = {
    RestaurantID?: number
    OwnerID?: number | null
    RestaurantName: string
    Address: string
    Phone?: string | null
    Email?: string | null
    Availability: string
    MenuItems?: MenuItemsUncheckedCreateNestedManyWithoutRestaurantsInput
  }

  export type RestaurantsUpdateInput = {
    OwnerID?: NullableIntFieldUpdateOperationsInput | number | null
    RestaurantName?: StringFieldUpdateOperationsInput | string
    Address?: StringFieldUpdateOperationsInput | string
    Phone?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    Availability?: StringFieldUpdateOperationsInput | string
    MenuItems?: MenuItemsUpdateManyWithoutRestaurantsNestedInput
  }

  export type RestaurantsUncheckedUpdateInput = {
    RestaurantID?: IntFieldUpdateOperationsInput | number
    OwnerID?: NullableIntFieldUpdateOperationsInput | number | null
    RestaurantName?: StringFieldUpdateOperationsInput | string
    Address?: StringFieldUpdateOperationsInput | string
    Phone?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    Availability?: StringFieldUpdateOperationsInput | string
    MenuItems?: MenuItemsUncheckedUpdateManyWithoutRestaurantsNestedInput
  }

  export type RestaurantsCreateManyInput = {
    RestaurantID?: number
    OwnerID?: number | null
    RestaurantName: string
    Address: string
    Phone?: string | null
    Email?: string | null
    Availability: string
  }

  export type RestaurantsUpdateManyMutationInput = {
    OwnerID?: NullableIntFieldUpdateOperationsInput | number | null
    RestaurantName?: StringFieldUpdateOperationsInput | string
    Address?: StringFieldUpdateOperationsInput | string
    Phone?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    Availability?: StringFieldUpdateOperationsInput | string
  }

  export type RestaurantsUncheckedUpdateManyInput = {
    RestaurantID?: IntFieldUpdateOperationsInput | number
    OwnerID?: NullableIntFieldUpdateOperationsInput | number | null
    RestaurantName?: StringFieldUpdateOperationsInput | string
    Address?: StringFieldUpdateOperationsInput | string
    Phone?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    Availability?: StringFieldUpdateOperationsInput | string
  }

  export type MenuItemsCreateInput = {
    Name: string
    Description?: string | null
    Price: Decimal | DecimalJsLike | number | string
    IsAvailable?: boolean | null
    Restaurants?: RestaurantsCreateNestedOneWithoutMenuItemsInput
  }

  export type MenuItemsUncheckedCreateInput = {
    MenuItemID?: number
    RestaurantID?: number | null
    Name: string
    Description?: string | null
    Price: Decimal | DecimalJsLike | number | string
    IsAvailable?: boolean | null
  }

  export type MenuItemsUpdateInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    Price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    IsAvailable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Restaurants?: RestaurantsUpdateOneWithoutMenuItemsNestedInput
  }

  export type MenuItemsUncheckedUpdateInput = {
    MenuItemID?: IntFieldUpdateOperationsInput | number
    RestaurantID?: NullableIntFieldUpdateOperationsInput | number | null
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    Price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    IsAvailable?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type MenuItemsCreateManyInput = {
    MenuItemID?: number
    RestaurantID?: number | null
    Name: string
    Description?: string | null
    Price: Decimal | DecimalJsLike | number | string
    IsAvailable?: boolean | null
  }

  export type MenuItemsUpdateManyMutationInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    Price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    IsAvailable?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type MenuItemsUncheckedUpdateManyInput = {
    MenuItemID?: IntFieldUpdateOperationsInput | number
    RestaurantID?: NullableIntFieldUpdateOperationsInput | number | null
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    Price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    IsAvailable?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type MenuItemsListRelationFilter = {
    every?: MenuItemsWhereInput
    some?: MenuItemsWhereInput
    none?: MenuItemsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MenuItemsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RestaurantsCountOrderByAggregateInput = {
    RestaurantID?: SortOrder
    OwnerID?: SortOrder
    RestaurantName?: SortOrder
    Address?: SortOrder
    Phone?: SortOrder
    Email?: SortOrder
    Availability?: SortOrder
  }

  export type RestaurantsAvgOrderByAggregateInput = {
    RestaurantID?: SortOrder
    OwnerID?: SortOrder
  }

  export type RestaurantsMaxOrderByAggregateInput = {
    RestaurantID?: SortOrder
    OwnerID?: SortOrder
    RestaurantName?: SortOrder
    Address?: SortOrder
    Phone?: SortOrder
    Email?: SortOrder
    Availability?: SortOrder
  }

  export type RestaurantsMinOrderByAggregateInput = {
    RestaurantID?: SortOrder
    OwnerID?: SortOrder
    RestaurantName?: SortOrder
    Address?: SortOrder
    Phone?: SortOrder
    Email?: SortOrder
    Availability?: SortOrder
  }

  export type RestaurantsSumOrderByAggregateInput = {
    RestaurantID?: SortOrder
    OwnerID?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type RestaurantsNullableScalarRelationFilter = {
    is?: RestaurantsWhereInput | null
    isNot?: RestaurantsWhereInput | null
  }

  export type MenuItemsCountOrderByAggregateInput = {
    MenuItemID?: SortOrder
    RestaurantID?: SortOrder
    Name?: SortOrder
    Description?: SortOrder
    Price?: SortOrder
    IsAvailable?: SortOrder
  }

  export type MenuItemsAvgOrderByAggregateInput = {
    MenuItemID?: SortOrder
    RestaurantID?: SortOrder
    Price?: SortOrder
  }

  export type MenuItemsMaxOrderByAggregateInput = {
    MenuItemID?: SortOrder
    RestaurantID?: SortOrder
    Name?: SortOrder
    Description?: SortOrder
    Price?: SortOrder
    IsAvailable?: SortOrder
  }

  export type MenuItemsMinOrderByAggregateInput = {
    MenuItemID?: SortOrder
    RestaurantID?: SortOrder
    Name?: SortOrder
    Description?: SortOrder
    Price?: SortOrder
    IsAvailable?: SortOrder
  }

  export type MenuItemsSumOrderByAggregateInput = {
    MenuItemID?: SortOrder
    RestaurantID?: SortOrder
    Price?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type MenuItemsCreateNestedManyWithoutRestaurantsInput = {
    create?: XOR<MenuItemsCreateWithoutRestaurantsInput, MenuItemsUncheckedCreateWithoutRestaurantsInput> | MenuItemsCreateWithoutRestaurantsInput[] | MenuItemsUncheckedCreateWithoutRestaurantsInput[]
    connectOrCreate?: MenuItemsCreateOrConnectWithoutRestaurantsInput | MenuItemsCreateOrConnectWithoutRestaurantsInput[]
    createMany?: MenuItemsCreateManyRestaurantsInputEnvelope
    connect?: MenuItemsWhereUniqueInput | MenuItemsWhereUniqueInput[]
  }

  export type MenuItemsUncheckedCreateNestedManyWithoutRestaurantsInput = {
    create?: XOR<MenuItemsCreateWithoutRestaurantsInput, MenuItemsUncheckedCreateWithoutRestaurantsInput> | MenuItemsCreateWithoutRestaurantsInput[] | MenuItemsUncheckedCreateWithoutRestaurantsInput[]
    connectOrCreate?: MenuItemsCreateOrConnectWithoutRestaurantsInput | MenuItemsCreateOrConnectWithoutRestaurantsInput[]
    createMany?: MenuItemsCreateManyRestaurantsInputEnvelope
    connect?: MenuItemsWhereUniqueInput | MenuItemsWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type MenuItemsUpdateManyWithoutRestaurantsNestedInput = {
    create?: XOR<MenuItemsCreateWithoutRestaurantsInput, MenuItemsUncheckedCreateWithoutRestaurantsInput> | MenuItemsCreateWithoutRestaurantsInput[] | MenuItemsUncheckedCreateWithoutRestaurantsInput[]
    connectOrCreate?: MenuItemsCreateOrConnectWithoutRestaurantsInput | MenuItemsCreateOrConnectWithoutRestaurantsInput[]
    upsert?: MenuItemsUpsertWithWhereUniqueWithoutRestaurantsInput | MenuItemsUpsertWithWhereUniqueWithoutRestaurantsInput[]
    createMany?: MenuItemsCreateManyRestaurantsInputEnvelope
    set?: MenuItemsWhereUniqueInput | MenuItemsWhereUniqueInput[]
    disconnect?: MenuItemsWhereUniqueInput | MenuItemsWhereUniqueInput[]
    delete?: MenuItemsWhereUniqueInput | MenuItemsWhereUniqueInput[]
    connect?: MenuItemsWhereUniqueInput | MenuItemsWhereUniqueInput[]
    update?: MenuItemsUpdateWithWhereUniqueWithoutRestaurantsInput | MenuItemsUpdateWithWhereUniqueWithoutRestaurantsInput[]
    updateMany?: MenuItemsUpdateManyWithWhereWithoutRestaurantsInput | MenuItemsUpdateManyWithWhereWithoutRestaurantsInput[]
    deleteMany?: MenuItemsScalarWhereInput | MenuItemsScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MenuItemsUncheckedUpdateManyWithoutRestaurantsNestedInput = {
    create?: XOR<MenuItemsCreateWithoutRestaurantsInput, MenuItemsUncheckedCreateWithoutRestaurantsInput> | MenuItemsCreateWithoutRestaurantsInput[] | MenuItemsUncheckedCreateWithoutRestaurantsInput[]
    connectOrCreate?: MenuItemsCreateOrConnectWithoutRestaurantsInput | MenuItemsCreateOrConnectWithoutRestaurantsInput[]
    upsert?: MenuItemsUpsertWithWhereUniqueWithoutRestaurantsInput | MenuItemsUpsertWithWhereUniqueWithoutRestaurantsInput[]
    createMany?: MenuItemsCreateManyRestaurantsInputEnvelope
    set?: MenuItemsWhereUniqueInput | MenuItemsWhereUniqueInput[]
    disconnect?: MenuItemsWhereUniqueInput | MenuItemsWhereUniqueInput[]
    delete?: MenuItemsWhereUniqueInput | MenuItemsWhereUniqueInput[]
    connect?: MenuItemsWhereUniqueInput | MenuItemsWhereUniqueInput[]
    update?: MenuItemsUpdateWithWhereUniqueWithoutRestaurantsInput | MenuItemsUpdateWithWhereUniqueWithoutRestaurantsInput[]
    updateMany?: MenuItemsUpdateManyWithWhereWithoutRestaurantsInput | MenuItemsUpdateManyWithWhereWithoutRestaurantsInput[]
    deleteMany?: MenuItemsScalarWhereInput | MenuItemsScalarWhereInput[]
  }

  export type RestaurantsCreateNestedOneWithoutMenuItemsInput = {
    create?: XOR<RestaurantsCreateWithoutMenuItemsInput, RestaurantsUncheckedCreateWithoutMenuItemsInput>
    connectOrCreate?: RestaurantsCreateOrConnectWithoutMenuItemsInput
    connect?: RestaurantsWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type RestaurantsUpdateOneWithoutMenuItemsNestedInput = {
    create?: XOR<RestaurantsCreateWithoutMenuItemsInput, RestaurantsUncheckedCreateWithoutMenuItemsInput>
    connectOrCreate?: RestaurantsCreateOrConnectWithoutMenuItemsInput
    upsert?: RestaurantsUpsertWithoutMenuItemsInput
    disconnect?: RestaurantsWhereInput | boolean
    delete?: RestaurantsWhereInput | boolean
    connect?: RestaurantsWhereUniqueInput
    update?: XOR<XOR<RestaurantsUpdateToOneWithWhereWithoutMenuItemsInput, RestaurantsUpdateWithoutMenuItemsInput>, RestaurantsUncheckedUpdateWithoutMenuItemsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type MenuItemsCreateWithoutRestaurantsInput = {
    Name: string
    Description?: string | null
    Price: Decimal | DecimalJsLike | number | string
    IsAvailable?: boolean | null
  }

  export type MenuItemsUncheckedCreateWithoutRestaurantsInput = {
    MenuItemID?: number
    Name: string
    Description?: string | null
    Price: Decimal | DecimalJsLike | number | string
    IsAvailable?: boolean | null
  }

  export type MenuItemsCreateOrConnectWithoutRestaurantsInput = {
    where: MenuItemsWhereUniqueInput
    create: XOR<MenuItemsCreateWithoutRestaurantsInput, MenuItemsUncheckedCreateWithoutRestaurantsInput>
  }

  export type MenuItemsCreateManyRestaurantsInputEnvelope = {
    data: MenuItemsCreateManyRestaurantsInput | MenuItemsCreateManyRestaurantsInput[]
    skipDuplicates?: boolean
  }

  export type MenuItemsUpsertWithWhereUniqueWithoutRestaurantsInput = {
    where: MenuItemsWhereUniqueInput
    update: XOR<MenuItemsUpdateWithoutRestaurantsInput, MenuItemsUncheckedUpdateWithoutRestaurantsInput>
    create: XOR<MenuItemsCreateWithoutRestaurantsInput, MenuItemsUncheckedCreateWithoutRestaurantsInput>
  }

  export type MenuItemsUpdateWithWhereUniqueWithoutRestaurantsInput = {
    where: MenuItemsWhereUniqueInput
    data: XOR<MenuItemsUpdateWithoutRestaurantsInput, MenuItemsUncheckedUpdateWithoutRestaurantsInput>
  }

  export type MenuItemsUpdateManyWithWhereWithoutRestaurantsInput = {
    where: MenuItemsScalarWhereInput
    data: XOR<MenuItemsUpdateManyMutationInput, MenuItemsUncheckedUpdateManyWithoutRestaurantsInput>
  }

  export type MenuItemsScalarWhereInput = {
    AND?: MenuItemsScalarWhereInput | MenuItemsScalarWhereInput[]
    OR?: MenuItemsScalarWhereInput[]
    NOT?: MenuItemsScalarWhereInput | MenuItemsScalarWhereInput[]
    MenuItemID?: IntFilter<"MenuItems"> | number
    RestaurantID?: IntNullableFilter<"MenuItems"> | number | null
    Name?: StringFilter<"MenuItems"> | string
    Description?: StringNullableFilter<"MenuItems"> | string | null
    Price?: DecimalFilter<"MenuItems"> | Decimal | DecimalJsLike | number | string
    IsAvailable?: BoolNullableFilter<"MenuItems"> | boolean | null
  }

  export type RestaurantsCreateWithoutMenuItemsInput = {
    OwnerID?: number | null
    RestaurantName: string
    Address: string
    Phone?: string | null
    Email?: string | null
    Availability: string
  }

  export type RestaurantsUncheckedCreateWithoutMenuItemsInput = {
    RestaurantID?: number
    OwnerID?: number | null
    RestaurantName: string
    Address: string
    Phone?: string | null
    Email?: string | null
    Availability: string
  }

  export type RestaurantsCreateOrConnectWithoutMenuItemsInput = {
    where: RestaurantsWhereUniqueInput
    create: XOR<RestaurantsCreateWithoutMenuItemsInput, RestaurantsUncheckedCreateWithoutMenuItemsInput>
  }

  export type RestaurantsUpsertWithoutMenuItemsInput = {
    update: XOR<RestaurantsUpdateWithoutMenuItemsInput, RestaurantsUncheckedUpdateWithoutMenuItemsInput>
    create: XOR<RestaurantsCreateWithoutMenuItemsInput, RestaurantsUncheckedCreateWithoutMenuItemsInput>
    where?: RestaurantsWhereInput
  }

  export type RestaurantsUpdateToOneWithWhereWithoutMenuItemsInput = {
    where?: RestaurantsWhereInput
    data: XOR<RestaurantsUpdateWithoutMenuItemsInput, RestaurantsUncheckedUpdateWithoutMenuItemsInput>
  }

  export type RestaurantsUpdateWithoutMenuItemsInput = {
    OwnerID?: NullableIntFieldUpdateOperationsInput | number | null
    RestaurantName?: StringFieldUpdateOperationsInput | string
    Address?: StringFieldUpdateOperationsInput | string
    Phone?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    Availability?: StringFieldUpdateOperationsInput | string
  }

  export type RestaurantsUncheckedUpdateWithoutMenuItemsInput = {
    RestaurantID?: IntFieldUpdateOperationsInput | number
    OwnerID?: NullableIntFieldUpdateOperationsInput | number | null
    RestaurantName?: StringFieldUpdateOperationsInput | string
    Address?: StringFieldUpdateOperationsInput | string
    Phone?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    Availability?: StringFieldUpdateOperationsInput | string
  }

  export type MenuItemsCreateManyRestaurantsInput = {
    MenuItemID?: number
    Name: string
    Description?: string | null
    Price: Decimal | DecimalJsLike | number | string
    IsAvailable?: boolean | null
  }

  export type MenuItemsUpdateWithoutRestaurantsInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    Price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    IsAvailable?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type MenuItemsUncheckedUpdateWithoutRestaurantsInput = {
    MenuItemID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    Price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    IsAvailable?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type MenuItemsUncheckedUpdateManyWithoutRestaurantsInput = {
    MenuItemID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    Price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    IsAvailable?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}