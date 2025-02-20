-- Active: 1729696527596@@127.0.0.1@5434@pasteleria4

-- CREAR DATABASE en TERMINAL e ingresar a ella
CREATE DATABASE pasteleria WITH ENCODING='UTF8';
\c pasteleria;

-- CREAR TABLAS
CREATE TABLE Region (
    id SERIAL PRIMARY KEY,
    nombre_region VARCHAR(150) NOT NULL
);
INSERT INTO Region (nombre_region) VALUES
('Región de Arica y Parinacota'),
('Región de Tarapacá'),
('Región de Antofagasta'),
('Región de Atacama'),
('Región de Coquimbo'),
('Región de Valparaíso'),
('Región Metropolitana de Santiago'),
('Región del Libertador General Bernardo OHiggins'),
('Región del Maule'),
('Región de Ñuble'),
('Región del Biobío'),
('Región de La Araucanía'),
('Región de Los Ríos'),
('Región de Los Lagos'),
('Región de Aysén del General Carlos Ibáñez del Campo'),
('Región de Magallanes y de la Antártica Chilena');

CREATE TABLE Comuna (
    id SERIAL PRIMARY KEY,
    nombre_comuna VARCHAR(50) NOT NULL,
    region_id INTEGER REFERENCES Region(id) ON DELETE CASCADE
);
INSERT INTO Comuna (nombre_comuna, region_id) VALUES
('Cerrillos', 7),
('Cerro Navia', 7),
('Conchalí', 7),
('El Bosque', 7),
('Estación Central', 7),
('Huechuraba', 7),
('Independencia', 7),
('La Cisterna', 7),
('La Florida', 7),
('La Granja', 7),
('La Pintana', 7),
('La Reina', 7),
('Las Condes', 7),
('Lo Barnechea', 7),
('Lo Espejo', 7),
('Lo Prado', 7),
('Macul', 7),
('Maipú', 7),
('Ñuñoa', 7),
('Pedro Aguirre Cerda', 7),
('Peñalolén', 7),
('Providencia', 7),
('Pudahuel', 7),
('Quilicura', 7),
('Quinta Normal', 7),
('Recoleta', 7),
('Renca', 7),
('San Joaquín', 7),
('San Miguel', 7),
('San Ramón', 7),
('Santiago', 7),
('Vitacura', 7);



CREATE TABLE Rol (
    id SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL
);
INSERT INTO Rol (nombre_rol) VALUES ('admin'), ('user');


CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(11) UNIQUE, -- Puede ser NULL para administradores
    comuna_id INTEGER REFERENCES Comuna(id) ON DELETE SET NULL, -- Puede ser NULL
    direccion VARCHAR(255), -- Puede ser NULL
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    rol_id INTEGER REFERENCES Rol(id) ON DELETE RESTRICT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Categoria (
    id SERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(50) NOT NULL,
    activo BOOLEAN DEFAULT TRUE -- Nuevo campo para activar/desactivar categoría
);

INSERT INTO Categoria (nombre_categoria) 
VALUES 
('Sin gluten'), 
('Pie'),
('Tortas'), 
('Kuchen');



CREATE TABLE Forma (
    id SERIAL PRIMARY KEY,
    nombre_forma VARCHAR(50) NOT NULL,
    activo BOOLEAN DEFAULT TRUE -- Nuevo campo para activar/desactivar forma
);
INSERT INTO Forma (nombre_forma, activo)
VALUES 
('Redonda', true),
('Cuadrada', true);

CREATE TABLE Porcion (
    id SERIAL PRIMARY KEY,
    nombre_porcion VARCHAR(50) NOT NULL,
    activo BOOLEAN DEFAULT TRUE -- Nuevo campo para activar/desactivar porción
);

INSERT INTO Porcion (nombre_porcion, activo)
VALUES 
('10', true),
('20', true),
('30', true);


CREATE TABLE Producto (
    id SERIAL PRIMARY KEY,
    nombre_producto VARCHAR(50) NOT NULL,
    precio INTEGER NOT NULL,
    stock INTEGER NOT NULL,
    imagen_url TEXT,
    azucar BOOLEAN DEFAULT TRUE,
    gluten BOOLEAN DEFAULT TRUE,
    lactosa BOOLEAN DEFAULT TRUE,
    categoria_id INTEGER REFERENCES Categoria(id) ON DELETE RESTRICT,
    porcion_id INTEGER REFERENCES Porcion(id) ON DELETE RESTRICT,
    forma_id INTEGER REFERENCES Forma(id) ON DELETE RESTRICT,
    activo BOOLEAN DEFAULT TRUE -- Permite desactivar productos sin eliminarlos
);


INSERT INTO Producto (nombre_producto, precio, stock, imagen_url, azucar, gluten, lactosa, categoria_id, porcion_id, forma_id)
VALUES 
('Tarta de Chocolate Supremo', 10999, 100, 'ProductImage1.jpg', true, false, true, 1, 1, 1),
('Pie de Limón Cremoso', 12999, 150, 'ProductImage2.jpg', true, true, true, 2, 2, 2),
('Kuchen de Frambuesa Artesanal', 13999, 120, 'ProductImage3.jpg', true, true, true, 4, 1, 1),
('Torta Tres Leches', 14999, 80, 'ProductImage4.jpg', true, true, true, 3, 1, 2),
('Brownie Sin Gluten', 8999, 90, 'ProductImage5.jpg', true, false, true, 1, 2, 1),
('Pie de Manzana Clásico', 11999, 110, 'ProductImage6.jpg', true, true, true, 2, 2, 2),
('Kuchen de Nuez y Caramelo', 15999, 70, 'ProductImage7.jpg', true, true, true, 4, 2, 1),
('Torta de Zanahoria Esponjosa', 13999, 95, 'ProductImage8.jpg', true, true, true, 3, 1, 2),
('Galletas de Avena Sin Gluten', 7999, 200, 'ProductImage9.jpg', true, false, false, 1, 2, 1),
('Pie de Queso Frutal', 13499, 130, 'ProductImage10.jpg', false, true, true, 2, 1, 2);


CREATE TABLE Estado (
    id SERIAL PRIMARY KEY,
    nombre_estado VARCHAR(50) NOT NULL
);
INSERT INTO Estado (nombre_estado) VALUES
('Pendiente'),
('Confirmada'),
('Preparando'),
('Lista para Envío'),
('En Camino'),
('Entregada'),
('Cancelada'),
('Rechazada'),
('Devuelta');

CREATE TABLE Orden (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Usuario(id) ON DELETE CASCADE,
    monto_total INTEGER NOT NULL,
    fecha_orden TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_id INTEGER REFERENCES Estado(id) ON DELETE RESTRICT
);





CREATE TABLE Detalle_Orden (
    id SERIAL PRIMARY KEY,
    producto_id INTEGER REFERENCES Producto(id) ON DELETE RESTRICT,
    orden_id INTEGER REFERENCES Orden(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL,
    precio INTEGER NOT NULL
);


INSERT INTO Usuario (nombre, apellido, email, password, rol_id)
VALUES 
('Admin1', 'Apellido1', 'admin1@example.com', 'admin_password_1', 1),
('Admin2', 'Apellido2', 'admin2@example.com', 'admin_password_2', 1);
INSERT INTO Usuario (nombre, apellido, telefono, comuna_id, direccion, email, password, rol_id)
VALUES 
('User1', 'Apellido3', '987654321', 7,'Calle 123, Ciudad', 'user1@example.com', 'user_password_1', 2),
('User2', 'Apellido4', '912345678', 7,'Avenida 456, Ciudad', 'user2@example.com', 'user_password_2', 2);



/*

-- para eliminar tabla PRODUCTO
DROP TABLE detalle_orden;
DROP TABLE producto;
DROP TABLE categoria;
DROP TABLE forma;
DROP TABLE porcion;




Ejemplo de inserción de productos con subquerys:
INSERT INTO Producto (nombre_producto, precio, stock, imagen_url, azucar, gluten, lactosa, categoria_id, forma_id)
VALUES 
    ('Producto1', 1000, 50, 'url1.jpg', true, true, true, 
        (SELECT id FROM Categoria WHERE nombre_categoria = 'cat1'),
        (SELECT id FROM Forma WHERE nombre_forma = 'forma1')),
    ('Producto2', 2000, 30, 'url2.jpg', false, false, false,
        (SELECT id FROM Categoria WHERE nombre_categoria = 'cat2'),

        (SELECT id FROM Forma WHERE nombre_forma = 'forma2'));


-- Eliminar sesiones de usuario (hacerlo en terminal)

CREATE TABLE Detalle_Orden (
    id SERIAL PRIMARY KEY,
    producto_id INTEGER REFERENCES Producto(id) ON DELETE RESTRICT,
    orden_id INTEGER REFERENCES Orden(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL,
    precio INTEGER NOT NULL
);

  

*/
