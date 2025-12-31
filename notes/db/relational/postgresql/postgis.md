---
title: PostGIS
---

# PostGIS

- [PostGIS Website](https://postgis.net/)
- [PostGIS Function Support Matrix](https://postgis.net/docs/manual-2.4/PostGIS_Special_Functions_Index.html#PostGIS_TypeFunctionMatrix)

## Related Libraries

- [GEOS](https://trac.osgeo.org/geos)
- [GDAL](http://gdal.org/) - Geospatial Data Abstraction Library
- [SFCGAL](http://www.sfcgal.org/) - C++ wrapper around CGAL
- [CGAL](https://www.cgal.org/) - Computational Geometry Algorithms Library
- [JTS](https://github.com/locationtech/jts) - Java Topology Suite
- [Geotools](http://www.geotools.org/) - Open Source Java GIS Toolkit

## Installation (Docker)

```bash
docker run --rm -it --name pals-pg \
  -e POSTGRES_PASSWORD=postgres \
  -p 15432:5432 \
  postgis/postgis:14-3.4-alpine
```

## SQL Snippets

### Enable Extensions

```sql
CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology;
-- Optional
CREATE EXTENSION postgis_sfcgal;
CREATE EXTENSION fuzzystrmatch;
CREATE EXTENSION postgis_tiger_geocoder;
CREATE EXTENSION address_standardizer;
```

### Basic Geometry Operations

```sql
-- Create table with Geometry column
CREATE TABLE gtest (
    id serial primary key,
    name varchar(20),
    geom geometry(LINESTRING)
);

-- Insert Data
INSERT INTO gtest (ID, NAME, GEOM)
VALUES (1, 'First Geometry', ST_GeomFromText('LINESTRING(2 3,4 5,6 5,7 8)'));

-- Spatial Query: Contains
SELECT id, the_geom
FROM thetable
WHERE ST_Contains(the_geom,'POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))');

-- Spatial Query: Distance (Within Radius)
SELECT * FROM geotable
WHERE ST_DWithin(geocolumn, 'POINT(1000 1000)', 100.0);

-- Nearest Neighbor (KNN) using <-> (center distance)
SELECT name, gid
FROM geonames
ORDER BY geom <-> st_setsrid(st_makepoint(-90,40),4326)
LIMIT 10;
```

### Coordinate Systems & Projections (SRID)

- **SRID 4326 (WGS 84)**: Standard GPS coordinates (Longitude, Latitude).
- **SRID 3857 (Web Mercator)**: Used by Google Maps, OpenStreetMap.

```sql
-- Transform/Reproject
SELECT ST_Transform(the_geom, 4269) FROM geotable;

-- Set SRID when creating point
SELECT ST_SetSRID(ST_MakePoint(longitude, latitude), 4326);
```

## Coordinate Ordering Notes

- **Lng/Lat (x/y)**: PostGIS, GeoJSON, MongoDB, KML, OpenLayers
- **Lat/Lng (y/x)**: Leaflet, Google Maps API, ArangoDB

> Note: `ST_FlipCoordinates` can be used to swap x and y.

## References

- [Spatial Reference System (SRID)](https://en.wikipedia.org/wiki/Spatial_reference_system)
- [EPSG:4326 vs EPSG:3857](https://gis.stackexchange.com/questions/48949/epsg-3857-or-4326-for-googlemaps-openstreetmap-and-leaflet)
- [GCJ-02 (Mars Coordinate System)](https://en.wikipedia.org/wiki/Restrictions_on_geographic_data_in_China)
