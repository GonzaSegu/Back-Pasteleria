-- Active: 1729696527596@@127.0.0.1@5434@pasteleria

-- CREAR DATABASE en TERMINAL e ingresar a ella
CREATE DATABASE pasteleria WITH ENCODING='UTF8';
\c pasteleria;

-- CREAR TABLAS
CREATE TABLE Region (
    id SERIAL PRIMARY KEY,
    nombre_region VARCHAR(150) NOT NULL
);

CREATE TABLE Comuna (
    id SERIAL PRIMARY KEY,
    nombre_comuna VARCHAR(50) NOT NULL,
    region_id INTEGER REFERENCES Region(id) ON DELETE CASCADE
);

CREATE TABLE Rol (
    id SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL
);

CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(11) UNIQUE, -- Puede ser NULL para administradores
    comuna_id INTEGER REFERENCES Comuna(id) ON DELETE SET NULL, -- Puede ser NULL
    direccion VARCHAR(255), -- Puede ser NULL
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    rol_id INTEGER NOT NULL REFERENCES Rol(id) ON DELETE RESTRICT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Categoria (
    id SERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(50) NOT NULL,
    activo BOOLEAN DEFAULT TRUE -- Nuevo campo para activar/desactivar categoría
);

CREATE TABLE Porcion (
    id SERIAL PRIMARY KEY,
    nombre_porcion VARCHAR(50) NOT NULL,
    activo BOOLEAN DEFAULT TRUE -- Nuevo campo para activar/desactivar porción
);

CREATE TABLE Forma (
    id SERIAL PRIMARY KEY,
    nombre_forma VARCHAR(50) NOT NULL,
    activo BOOLEAN DEFAULT TRUE -- Nuevo campo para activar/desactivar forma
);

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
    forma_id INTEGER REFERENCES Porcion(id) ON DELETE RESTRICT,
    activo BOOLEAN DEFAULT TRUE -- Permite desactivar productos sin eliminarlos
);

CREATE TABLE Estado (
    id SERIAL PRIMARY KEY,
    nombre_estado VARCHAR(50) NOT NULL
);


CREATE TABLE Orden (
    id SERIAL PRIMARY KEY,
    fecha_orden TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES Usuario(id) ON DELETE CASCADE,
    monto_total INTEGER NOT NULL,
    estado_id INT REFERENCES Estado(id) ON DELETE RESTRICT
);

CREATE TABLE Detalle_Orden (
    id SERIAL PRIMARY KEY,
    producto_id INTEGER REFERENCES Producto(id) ON DELETE RESTRICT,
    orden_id INTEGER REFERENCES Orden(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL,
    subtotal INTEGER NOT NULL
);



-- DATOS PARA DISTINTAS TABLAS
INSERT INTO Categoria (nombre_categoria) VALUES ('cat1'), ('cat2');
INSERT INTO Porcion (nombre_porcion) VALUES ('por1'), ('por2');
INSERT INTO Forma (nombre_forma) VALUES ('forma1'), ('forma2');

INSERT INTO Producto (nombre_producto, precio, stock, imagen_url, azucar, gluten, lactosa, categoria_id, porcion_id, forma_id)
VALUES 
    ('Producto1', 1000, 50, 'url1.jpg', true, true, true, 
        (SELECT id FROM Categoria WHERE nombre_categoria = 'cat1'),
        (SELECT id FROM Porcion WHERE nombre_porcion = 'por1'),
        (SELECT id FROM Forma WHERE nombre_forma = 'forma1')),
    ('Producto2', 2000, 30, 'url2.jpg', false, false, false,
        (SELECT id FROM Categoria WHERE nombre_categoria = 'cat2'),
        (SELECT id FROM Porcion WHERE nombre_porcion = 'por2'),
        (SELECT id FROM Forma WHERE nombre_forma = 'forma2'));

INSERT INTO Rol (nombre_rol) VALUES ('admin'), ('user');

INSERT INTO Usuario (nombre, apellido, email, password, rol_id)
VALUES 
('Admin1', 'Apellido1', 'admin1@example.com', 'hashed_password_1', 1),
('Admin2', 'Apellido2', 'admin2@example.com', 'hashed_password_2', 1);



INSERT INTO Region (nombre_region) VALUES
('Región de Arica y Parinacota'),
('Región de Tarapacá'),
('Región de Antofagasta'),
('Región de Atacama'),
('Región de Coquimbo'),
('Región de Valparaíso'),
('Región Metropolitana de Santiago'),
('Región del Libertador General Bernardo O’Higgins'),
('Región del Maule'),
('Región de Ñuble'),
('Región del Biobío'),
('Región de La Araucanía'),
('Región de Los Ríos'),
('Región de Los Lagos'),
('Región de Aysén del General Carlos Ibáñez del Campo'),
('Región de Magallanes y de la Antártica Chilena');


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


INSERT INTO Usuario (nombre, apellido, telefono, comuna_id, direccion, email, password, rol_id)
VALUES 
('User1', 'Apellido3', '987654321', 7,'Calle 123, Ciudad', 'user1@example.com', 'hashed_password_3', 2),
('User2', 'Apellido4', '912345678', 7,'Avenida 456, Ciudad', 'user2@example.com', 'hashed_password_4', 2);


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


-- para eliminar tabla PRODUCTO
DROP TABLE detalle_orden;
DROP TABLE producto;
DROP TABLE categoria;
DROP TABLE forma;
DROP TABLE porcion;


-- para eliminar tabla USUARIO
DROP TABLE orden;
DROP TABLE estado;
DROP TABLE usuario;
DROP TABLE rol;
DROP TABLE comuna;
DROP TABLE region;


-- Eliminar sesiones de usuario (hacerlo en terminal)

SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'pasteleria'
AND pid <> pg_backend_pid();



INSERT INTO Comuna (nombre_comuna, region_id) VALUES
-- Región de Arica y Parinacota (ID: 1)
('Arica', 1),
('Camarones', 1),
('Putre', 1),
('General Lagos', 1),
('Iquique', 2),
('Alto Hospicio', 2),
('Pozo Almonte', 2),
('Camiña', 2),
('Colchane', 2),
('Huara', 2),
('Pica', 2),
('Antofagasta', 3),
('Mejillones', 3),
('Sierra Gorda', 3),
('Taltal', 3),
('Calama', 3),
('Ollagüe', 3),
('San Pedro de Atacama', 3),
('Tocopilla', 3),
('María Elena', 3),
('Copiapó', 4),
('Caldera', 4),
('Tierra Amarilla', 4),
('Chañaral', 4),
('Diego de Almagro', 4),
('Vallenar', 4),
('Alto del Carmen', 4),
('Freirina', 4),
('Huasco', 4),
('La Serena', 5),
('Coquimbo', 5),
('Andacollo', 5),
('La Higuera', 5),
('Paiguano', 5),
('Vicuña', 5),
('Illapel', 5),
('Canela', 5),
('Los Vilos', 5),
('Salamanca', 5),
('Ovalle', 5),
('Combarbalá', 5),
('Monte Patria', 5),
('Punitaqui', 5),
('Río Hurtado', 5),
('Valparaíso', 6),
('Casablanca', 6),
('Concón', 6),
('Juan Fernández', 6),
('Puchuncaví', 6),
('Quintero', 6),
('Viña del Mar', 6),
('Isla de Pascua', 6),
('Los Andes', 6),
('Calle Larga', 6),
('Rinconada', 6),
('San Esteban', 6),
('La Ligua', 6),
('Cabildo', 6),
('Papudo', 6),
('Petorca', 6),
('Zapallar', 6),
('Quillota', 6),
('Calera', 6),
('Hijuelas', 6),
('La Cruz', 6),
('Nogales', 6),
('San Antonio', 6),
('Algarrobo', 6),
('Cartagena', 6),
('El Quisco', 6),
('El Tabo', 6),
('Santo Domingo', 6),
('San Felipe', 6),
('Catemu', 6),
('Llaillay', 6),
('Panquehue', 6),
('Putaendo', 6),
('Santa María', 6),
('Quilpué', 6),
('Limache', 6),
('Olmué', 6),
('Villa Alemana', 6),
('Rancagua', 8),
('Codegua', 8),
('Coinco', 8),
('Coltauco', 8),
('Doñihue', 8),
('Graneros', 8),
('Las Cabras', 8),
('Machalí', 8),
('Malloa', 8),
('Mostazal', 8),
('Olivar', 8),
('Peumo', 8),
('Pichidegua', 8),
('Quinta de Tilcoco', 8),
('Rengo', 8),
('Requínoa', 8),
('San Vicente', 8),
('Pichilemu', 8),
('La Estrella', 8),
('Litueche', 8),
('Marchihue', 8),
('Navidad', 8),
('Paredones', 8),
