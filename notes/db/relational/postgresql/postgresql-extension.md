---
title: PostgreSQL Extension
---

# PostgreSQL Extension

- [pgpartman/pg_partman](https://github.com/pgpartman/pg_partman)
  Partition management extension for PostgreSQL
- [omniti-labs/pg_jobmon](https://github.com/omniti-labs/pg_jobmon)
  PostgreSQL Extension for logging and monitoring automated jobs
- [2ndQuadrant/repmgr](https://github.com/2ndQuadrant/repmgr)
- [xocolatl/periods](https://github.com/xocolatl/periods)
  PERIODs and SYSTEM VERSIONING for PostgreSQL
- [dimitri/pgextwlist](https://github.com/dimitri/pgextwlist)
  PostgreSQL Extension Whitelisting
- [pgq/pgq](https://github.com/pgq/pgq)
  Queue for PostgreSQL
- [pgspider](https://github.com/pgspider)

**FDW**

| name              | desc                                                         |
| ----------------- | ------------------------------------------------------------ |
| dblink            | connect to other PostgreSQL databases from within a database |
| file_fdw          | foreign-data wrapper for flat file access                    |
| hstore            | data type for storing sets of (key, value) pairs             |
| hstore_pllua      | Hstore transform for Lua                                     |
| hstore_plluau     | Hstore transform for untrusted Lua                           |
| hstore_plpython3u | transform between hstore and plpython3u                      |
| postgres_fdw      | foreign-data wrapper for remote PostgreSQL servers           |
| [sqlite_fdw]      | SQLite FDW for PostgreSQL                                    |

[sqlite_fdw]: https://github.com/pgspider/sqlite_fdw

**DateType**

| name             | desc                                                     |
| ---------------- | -------------------------------------------------------- |
| citext           | data type for case-insensitive character strings         |
| cube             | data type for multidimensional cubes                     |
| isn              | data types for international product numbering standards |
| ltree            | data type for hierarchical tree-like structures          |
| ltree_plpython3u | transform between ltree and plpython3u                   |

**Index**

| name       | desc                                             |
| ---------- | ------------------------------------------------ |
| bloom      | bloom access method - signature file based index |
| btree_gin  | support for indexing common datatypes in GIN     |
| btree_gist | support for indexing common datatypes in GiST    |
| hypopg     | Hypothetical indexes for PostgreSQL              |

**功能**

| name    | desc                         |
| ------- | ---------------------------- |
| pg_cron | Job scheduler for PostgreSQL |

**DB**

| name        | desc                                                              |
| ----------- | ----------------------------------------------------------------- |
| timescaledb | Enables scalable inserts and complex queries for time-series data |
| pgq         | Generic queue for PostgreSQL                                      |

**PL**

| name          | desc                                                     |
| ------------- | -------------------------------------------------------- |
| pldbgapi      | server-side support for debugging PL/pgSQL functions     |
| pllua         | Lua as a procedural language                             |
| plluau        | Lua as an untrusted procedural language                  |
| plpgsql       | PL/pgSQL procedural language                             |
| plpgsql_check | extended check for plpgsql functions                     |
| plprofiler    | server-side support for profiling PL/pgSQL functions     |
| plproxy       | Database partitioning implemented as procedural language |
| plpython3u    | PL/Python3U untrusted procedural language                |
| pltcl         | PL/Tcl procedural language                               |
| pltclu        | PL/TclU untrusted procedural language                    |

**postgis**

| name                     | desc                                                       |
| ------------------------ | ---------------------------------------------------------- |
| postgis                  | PostGIS geometry and geography spatial types and functions |
| postgis_raster           | PostGIS raster types and functions                         |
| postgis_raster-3         | PostGIS raster types and functions                         |
| postgis_sfcgal           | PostGIS SFCGAL functions                                   |
| postgis_sfcgal-3         | PostGIS SFCGAL functions                                   |
| postgis_tiger_geocoder   | PostGIS tiger geocoder and reverse geocoder                |
| postgis_tiger_geocoder-3 | PostGIS tiger geocoder and reverse geocoder                |
| postgis_topology         | PostGIS topology spatial types and functions               |
| postgis_topology-3       | PostGIS topology spatial types and functions               |
| postgis-3                | PostGIS geometry and geography spatial types and functions |

**MISC**

| name                           | desc                                                                                                                |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| address_standardizer           | Used to parse an address into constituent elements. Generally used to support geocoding address normalization step. |
| address_standardizer_data_us   | Address Standardizer US dataset example                                                                             |
| address_standardizer_data_us-3 | Address Standardizer US dataset example                                                                             |
| address_standardizer-3         | Used to parse an address into constituent elements. Generally used to support geocoding address normalization step. |
| adminpack                      | administrative functions for PostgreSQL                                                                             |
| amcheck                        | functions for verifying relation integrity                                                                          |
| autoinc                        | functions for autoincrementing fields                                                                               |
| decoderbufs                    | Logical decoding plugin that delivers WAL stream changes using a Protocol Buffer format                             |
| dict_int                       | text search dictionary template for integers                                                                        |
| dict_xsyn                      | text search dictionary template for extended synonym processing                                                     |
| earthdistance                  | calculate great-circle distances on the surface of the Earth                                                        |
| fuzzystrmatch                  | determine similarities and distance between strings                                                                 |
| insert_username                | functions for tracking who changed a table                                                                          |
| intagg                         | integer aggregator and enumerator (obsolete)                                                                        |
| intarray                       | functions, operators, and index support for 1-D arrays of integers                                                  |
| jsonb_plpython3u               | transform between jsonb and plpython3u                                                                              |
| lo                             | Large Object maintenance                                                                                            |
| moddatetime                    | functions for tracking last modification time                                                                       |
| pageinspect                    | inspect the contents of database pages at a low level                                                               |
| pg_auth_mon                    | monitor connection attempts per user                                                                                |
| pg_buffercache                 | examine the shared buffer cache                                                                                     |
| pg_freespacemap                | examine the free space map (FSM)                                                                                    |
| pg_mon                         | monitor queries                                                                                                     |
| pg_partman                     | Extension to manage partitioned tables by time or ID                                                                |
| pg_permissions                 | view object permissions and compare them with the desired state                                                     |
| pg_prewarm                     | prewarm relation data                                                                                               |
| pg_repack                      | Reorganize tables in PostgreSQL databases with minimal locks                                                        |
| pg_stat_kcache                 | Kernel statistics gathering                                                                                         |
| pg_stat_statements             | track planning and execution statistics of all SQL statements executed                                              |
| pg_trgm                        | text similarity measurement and index searching based on trigrams                                                   |
| pg_visibility                  | examine the visibility map (VM) and page-level visibility info                                                      |
| pgaudit                        | provides auditing functionality                                                                                     |
| pgcrypto                       | cryptographic functions                                                                                             |
| pgl_ddl_deploy                 | automated ddl deployment using pglogical                                                                            |
| pglogical                      | PostgreSQL Logical Replication                                                                                      |
| pglogical_origin               | Dummy extension for compatibility when upgrading from Postgres 9.4                                                  |
| pglogical_ticker               | Have an accurate view on pglogical replication delay                                                                |
| pgrowlocks                     | show row-level locking information                                                                                  |
| pgstattuple                    | show tuple-level statistics                                                                                         |
| refint                         | functions for implementing referential integrity (obsolete)                                                         |
| seg                            | data type for representing line segments or floating-point intervals                                                |
| set_user                       | similar to SET ROLE but with added logging                                                                          |
| sslinfo                        | information about SSL certificates                                                                                  |
| tablefunc                      | functions that manipulate whole tables, including crosstab                                                          |
| tcn                            | Triggered change notifications                                                                                      |
| tsm_system_rows                | TABLESAMPLE method which accepts number of rows as a limit                                                          |
| tsm_system_time                | TABLESAMPLE method which accepts time in milliseconds as a limit                                                    |
| unaccent                       | text search dictionary that removes accents                                                                         |
| uuid-ossp                      | generate universally unique identifiers (UUIDs)                                                                     |
| xml2                           | XPath querying and XSLT                                                                                             |
