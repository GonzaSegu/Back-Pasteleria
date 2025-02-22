--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2025-02-14 21:17:44 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3730 (class 1262 OID 17081)
-- Name: pasteleria; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE pasteleria WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';


ALTER DATABASE pasteleria OWNER TO postgres;

\connect pasteleria

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 17134)
-- Name: categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categoria (
    id integer NOT NULL,
    nombre_categoria character varying(50) NOT NULL,
    activo boolean DEFAULT true
);


ALTER TABLE public.categoria OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 17133)
-- Name: categoria_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categoria_id_seq OWNER TO postgres;

--
-- TOC entry 3731 (class 0 OID 0)
-- Dependencies: 225
-- Name: categoria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categoria_id_seq OWNED BY public.categoria.id;


--
-- TOC entry 220 (class 1259 OID 17090)
-- Name: comuna; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comuna (
    id integer NOT NULL,
    nombre_comuna character varying(50) NOT NULL,
    region_id integer
);


ALTER TABLE public.comuna OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17089)
-- Name: comuna_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comuna_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comuna_id_seq OWNER TO postgres;

--
-- TOC entry 3732 (class 0 OID 0)
-- Dependencies: 219
-- Name: comuna_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comuna_id_seq OWNED BY public.comuna.id;


--
-- TOC entry 238 (class 1259 OID 17248)
-- Name: detalle_orden; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_orden (
    id integer NOT NULL,
    producto_id integer,
    orden_id integer,
    porcion_id integer,
    cantidad integer NOT NULL,
    precio integer NOT NULL
);


ALTER TABLE public.detalle_orden OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 17247)
-- Name: detalle_orden_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_orden_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalle_orden_id_seq OWNER TO postgres;

--
-- TOC entry 3733 (class 0 OID 0)
-- Dependencies: 237
-- Name: detalle_orden_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_orden_id_seq OWNED BY public.detalle_orden.id;


--
-- TOC entry 234 (class 1259 OID 17186)
-- Name: estado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estado (
    id integer NOT NULL,
    nombre_estado character varying(50) NOT NULL
);


ALTER TABLE public.estado OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 17185)
-- Name: estado_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estado_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estado_id_seq OWNER TO postgres;

--
-- TOC entry 3734 (class 0 OID 0)
-- Dependencies: 233
-- Name: estado_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estado_id_seq OWNED BY public.estado.id;


--
-- TOC entry 230 (class 1259 OID 17150)
-- Name: forma; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.forma (
    id integer NOT NULL,
    nombre_forma character varying(50) NOT NULL,
    activo boolean DEFAULT true
);


ALTER TABLE public.forma OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 17149)
-- Name: forma_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.forma_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.forma_id_seq OWNER TO postgres;

--
-- TOC entry 3735 (class 0 OID 0)
-- Dependencies: 229
-- Name: forma_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.forma_id_seq OWNED BY public.forma.id;


--
-- TOC entry 236 (class 1259 OID 17230)
-- Name: orden; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orden (
    id integer NOT NULL,
    user_id integer,
    monto_total integer NOT NULL,
    fecha_orden timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    estado_id integer
);


ALTER TABLE public.orden OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 17229)
-- Name: orden_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orden_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orden_id_seq OWNER TO postgres;

--
-- TOC entry 3736 (class 0 OID 0)
-- Dependencies: 235
-- Name: orden_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orden_id_seq OWNED BY public.orden.id;


--
-- TOC entry 228 (class 1259 OID 17142)
-- Name: porcion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.porcion (
    id integer NOT NULL,
    nombre_porcion character varying(50) NOT NULL,
    activo boolean DEFAULT true
);


ALTER TABLE public.porcion OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 17141)
-- Name: porcion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.porcion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.porcion_id_seq OWNER TO postgres;

--
-- TOC entry 3737 (class 0 OID 0)
-- Dependencies: 227
-- Name: porcion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.porcion_id_seq OWNED BY public.porcion.id;


--
-- TOC entry 232 (class 1259 OID 17158)
-- Name: producto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.producto (
    id integer NOT NULL,
    nombre_producto character varying(50) NOT NULL,
    precio integer NOT NULL,
    stock integer NOT NULL,
    imagen_url text,
    azucar boolean DEFAULT true,
    gluten boolean DEFAULT true,
    lactosa boolean DEFAULT true,
    categoria_id integer,
    porcion_id integer,
    forma_id integer,
    activo boolean DEFAULT true
);


ALTER TABLE public.producto OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 17157)
-- Name: producto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.producto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.producto_id_seq OWNER TO postgres;

--
-- TOC entry 3738 (class 0 OID 0)
-- Dependencies: 231
-- Name: producto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.producto_id_seq OWNED BY public.producto.id;


--
-- TOC entry 218 (class 1259 OID 17083)
-- Name: region; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.region (
    id integer NOT NULL,
    nombre_region character varying(150) NOT NULL
);


ALTER TABLE public.region OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 17082)
-- Name: region_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.region_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.region_id_seq OWNER TO postgres;

--
-- TOC entry 3739 (class 0 OID 0)
-- Dependencies: 217
-- Name: region_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.region_id_seq OWNED BY public.region.id;


--
-- TOC entry 222 (class 1259 OID 17102)
-- Name: rol; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol (
    id integer NOT NULL,
    nombre_rol character varying(50) NOT NULL
);


ALTER TABLE public.rol OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17101)
-- Name: rol_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rol_id_seq OWNER TO postgres;

--
-- TOC entry 3740 (class 0 OID 0)
-- Dependencies: 221
-- Name: rol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rol_id_seq OWNED BY public.rol.id;


--
-- TOC entry 224 (class 1259 OID 17109)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    apellido character varying(50) NOT NULL,
    telefono character varying(11),
    comuna_id integer,
    direccion character varying(255),
    email character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    rol_id integer NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17108)
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_seq OWNER TO postgres;

--
-- TOC entry 3741 (class 0 OID 0)
-- Dependencies: 223
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;


--
-- TOC entry 3506 (class 2604 OID 17137)
-- Name: categoria id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria ALTER COLUMN id SET DEFAULT nextval('public.categoria_id_seq'::regclass);


--
-- TOC entry 3501 (class 2604 OID 17093)
-- Name: comuna id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comuna ALTER COLUMN id SET DEFAULT nextval('public.comuna_id_seq'::regclass);


--
-- TOC entry 3520 (class 2604 OID 17251)
-- Name: detalle_orden id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_orden ALTER COLUMN id SET DEFAULT nextval('public.detalle_orden_id_seq'::regclass);


--
-- TOC entry 3517 (class 2604 OID 17189)
-- Name: estado id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado ALTER COLUMN id SET DEFAULT nextval('public.estado_id_seq'::regclass);


--
-- TOC entry 3510 (class 2604 OID 17153)
-- Name: forma id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forma ALTER COLUMN id SET DEFAULT nextval('public.forma_id_seq'::regclass);


--
-- TOC entry 3518 (class 2604 OID 17233)
-- Name: orden id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orden ALTER COLUMN id SET DEFAULT nextval('public.orden_id_seq'::regclass);


--
-- TOC entry 3508 (class 2604 OID 17145)
-- Name: porcion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.porcion ALTER COLUMN id SET DEFAULT nextval('public.porcion_id_seq'::regclass);


--
-- TOC entry 3512 (class 2604 OID 17161)
-- Name: producto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto ALTER COLUMN id SET DEFAULT nextval('public.producto_id_seq'::regclass);


--
-- TOC entry 3500 (class 2604 OID 17086)
-- Name: region id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.region ALTER COLUMN id SET DEFAULT nextval('public.region_id_seq'::regclass);


--
-- TOC entry 3502 (class 2604 OID 17105)
-- Name: rol id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol ALTER COLUMN id SET DEFAULT nextval('public.rol_id_seq'::regclass);


--
-- TOC entry 3503 (class 2604 OID 17112)
-- Name: usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);


--
-- TOC entry 3712 (class 0 OID 17134)
-- Dependencies: 226
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categoria VALUES (1, 'Sin gluten', true);
INSERT INTO public.categoria VALUES (2, 'Pie', true);
INSERT INTO public.categoria VALUES (3, 'Tortas', true);
INSERT INTO public.categoria VALUES (4, 'Kuchen', true);


--
-- TOC entry 3706 (class 0 OID 17090)
-- Dependencies: 220
-- Data for Name: comuna; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.comuna VALUES (1, 'Cerrillos', 7);
INSERT INTO public.comuna VALUES (2, 'Cerro Navia', 7);
INSERT INTO public.comuna VALUES (3, 'Conchalí', 7);
INSERT INTO public.comuna VALUES (4, 'El Bosque', 7);
INSERT INTO public.comuna VALUES (5, 'Estación Central', 7);
INSERT INTO public.comuna VALUES (6, 'Huechuraba', 7);
INSERT INTO public.comuna VALUES (7, 'Independencia', 7);
INSERT INTO public.comuna VALUES (8, 'La Cisterna', 7);
INSERT INTO public.comuna VALUES (9, 'La Florida', 7);
INSERT INTO public.comuna VALUES (10, 'La Granja', 7);
INSERT INTO public.comuna VALUES (11, 'La Pintana', 7);
INSERT INTO public.comuna VALUES (12, 'La Reina', 7);
INSERT INTO public.comuna VALUES (13, 'Las Condes', 7);
INSERT INTO public.comuna VALUES (14, 'Lo Barnechea', 7);
INSERT INTO public.comuna VALUES (15, 'Lo Espejo', 7);
INSERT INTO public.comuna VALUES (16, 'Lo Prado', 7);
INSERT INTO public.comuna VALUES (17, 'Macul', 7);
INSERT INTO public.comuna VALUES (18, 'Maipú', 7);
INSERT INTO public.comuna VALUES (19, 'Ñuñoa', 7);
INSERT INTO public.comuna VALUES (20, 'Pedro Aguirre Cerda', 7);
INSERT INTO public.comuna VALUES (21, 'Peñalolén', 7);
INSERT INTO public.comuna VALUES (22, 'Providencia', 7);
INSERT INTO public.comuna VALUES (23, 'Pudahuel', 7);
INSERT INTO public.comuna VALUES (24, 'Quilicura', 7);
INSERT INTO public.comuna VALUES (25, 'Quinta Normal', 7);
INSERT INTO public.comuna VALUES (26, 'Recoleta', 7);
INSERT INTO public.comuna VALUES (27, 'Renca', 7);
INSERT INTO public.comuna VALUES (28, 'San Joaquín', 7);
INSERT INTO public.comuna VALUES (29, 'San Miguel', 7);
INSERT INTO public.comuna VALUES (30, 'San Ramón', 7);
INSERT INTO public.comuna VALUES (31, 'Santiago', 7);
INSERT INTO public.comuna VALUES (32, 'Vitacura', 7);


--
-- TOC entry 3724 (class 0 OID 17248)
-- Dependencies: 238
-- Data for Name: detalle_orden; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.detalle_orden VALUES (3, 1, 2, 2, 10, 1000);
INSERT INTO public.detalle_orden VALUES (4, 1, 3, 2, 10, 1000);
INSERT INTO public.detalle_orden VALUES (5, 2, 4, 3, 60, 2000);
INSERT INTO public.detalle_orden VALUES (6, 12, 5, 2, 3, 13499);
INSERT INTO public.detalle_orden VALUES (7, 1, 5, 3, 100, 1000);
INSERT INTO public.detalle_orden VALUES (8, 9, 5, 3, 3, 15999);
INSERT INTO public.detalle_orden VALUES (9, 12, 6, 2, 3, 13499);
INSERT INTO public.detalle_orden VALUES (10, 1, 6, 3, 100, 1000);


--
-- TOC entry 3720 (class 0 OID 17186)
-- Dependencies: 234
-- Data for Name: estado; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.estado VALUES (1, 'Pendiente');
INSERT INTO public.estado VALUES (2, 'Confirmada');
INSERT INTO public.estado VALUES (3, 'Preparando');
INSERT INTO public.estado VALUES (4, 'Lista para Envío');
INSERT INTO public.estado VALUES (5, 'En Camino');
INSERT INTO public.estado VALUES (6, 'Entregada');
INSERT INTO public.estado VALUES (7, 'Cancelada');
INSERT INTO public.estado VALUES (8, 'Rechazada');
INSERT INTO public.estado VALUES (9, 'Devuelta');


--
-- TOC entry 3716 (class 0 OID 17150)
-- Dependencies: 230
-- Data for Name: forma; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.forma VALUES (1, 'Redonda', true);
INSERT INTO public.forma VALUES (2, 'Cuadrada', true);


--
-- TOC entry 3722 (class 0 OID 17230)
-- Dependencies: 236
-- Data for Name: orden; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.orden VALUES (2, 5, 10000, '2025-02-14 15:08:01.594341', 1);
INSERT INTO public.orden VALUES (3, 5, 10000, '2025-02-14 15:08:54.827138', 1);
INSERT INTO public.orden VALUES (4, 5, 120000, '2025-02-14 15:10:46.425966', 1);
INSERT INTO public.orden VALUES (5, 5, 188494, '2025-02-14 15:47:43.977863', 1);
INSERT INTO public.orden VALUES (6, 15, 140497, '2025-02-14 18:35:39.318981', 1);


--
-- TOC entry 3714 (class 0 OID 17142)
-- Dependencies: 228
-- Data for Name: porcion; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.porcion VALUES (1, '10', true);
INSERT INTO public.porcion VALUES (2, '20', true);
INSERT INTO public.porcion VALUES (3, '30', true);


--
-- TOC entry 3718 (class 0 OID 17158)
-- Dependencies: 232
-- Data for Name: producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.producto VALUES (1, 'Producto1', 1000, 50, 'url1.jpg', true, true, true, 1, 1, 1, true);
INSERT INTO public.producto VALUES (2, 'Producto2', 2000, 30, 'url2.jpg', false, false, false, 2, 2, 2, true);
INSERT INTO public.producto VALUES (3, 'Tarta de Chocolate Supremo', 10999, 100, 'ProductImage1.jpg', true, false, true, 1, 1, 1, true);
INSERT INTO public.producto VALUES (4, 'Pie de Limón Cremoso', 12999, 150, 'ProductImage2.jpg', true, true, true, 2, 2, 2, true);
INSERT INTO public.producto VALUES (5, 'Kuchen de Frambuesa Artesanal', 13999, 120, 'ProductImage3.jpg', true, true, true, 4, 1, 1, true);
INSERT INTO public.producto VALUES (6, 'Torta Tres Leches', 14999, 80, 'ProductImage4.jpg', true, true, true, 3, 1, 2, true);
INSERT INTO public.producto VALUES (7, 'Brownie Sin Gluten', 8999, 90, 'ProductImage5.jpg', true, false, true, 1, 2, 1, true);
INSERT INTO public.producto VALUES (8, 'Pie de Manzana Clásico', 11999, 110, 'ProductImage6.jpg', true, true, true, 2, 2, 2, true);
INSERT INTO public.producto VALUES (9, 'Kuchen de Nuez y Caramelo', 15999, 70, 'ProductImage7.jpg', true, true, true, 4, 2, 1, true);
INSERT INTO public.producto VALUES (10, 'Torta de Zanahoria Esponjosa', 13999, 95, 'ProductImage8.jpg', true, true, true, 3, 1, 2, true);
INSERT INTO public.producto VALUES (11, 'Galletas de Avena Sin Gluten', 7999, 200, 'ProductImage9.jpg', true, false, false, 1, 2, 1, true);
INSERT INTO public.producto VALUES (12, 'Pie de Queso Frutal', 13499, 130, 'ProductImage10.jpg', false, true, true, 2, 1, 2, true);


--
-- TOC entry 3704 (class 0 OID 17083)
-- Dependencies: 218
-- Data for Name: region; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.region VALUES (7, 'Región Metropolitana de Santiago');


--
-- TOC entry 3708 (class 0 OID 17102)
-- Dependencies: 222
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rol VALUES (1, 'admin');
INSERT INTO public.rol VALUES (2, 'user');


--
-- TOC entry 3710 (class 0 OID 17109)
-- Dependencies: 224
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usuario VALUES (2, 'Admin2', 'Apellido2', NULL, NULL, NULL, 'admin2@example.com', 'hashed_password_2', 1, '2025-02-10 06:04:58.246071', '2025-02-10 06:04:58.246071');
INSERT INTO public.usuario VALUES (3, 'User1', 'Apellido3', '987654321', 7, 'Calle 123, Ciudad', 'user1@example.com', 'hashed_password_3', 2, '2025-02-10 06:05:31.746421', '2025-02-10 06:05:31.746421');
INSERT INTO public.usuario VALUES (5, 'alonso matias', 'trinza zavala lucas', '900112233', 8, 'tres poniente 7990', 'alonsotrina22@gmail.com', '$2a$10$WMcGED42ZG8942AZqgUBY.3j9HpLJHLKn0yJaGPXKJLAqDbFuoy2m', 2, '2025-02-10 06:41:16.644339', '2025-02-10 06:41:16.644339');
INSERT INTO public.usuario VALUES (1, 'Admin admin', 'Apellido1 admin', '00 12345678', 8, 'av flores 456', 'admin1@example.com', 'hashed_password_1', 1, '2025-02-10 06:04:58.246071', '2025-02-10 06:04:58.246071');
INSERT INTO public.usuario VALUES (12, 'Lautaro', 'Trina', '123456789', 15, 'tres poniente 7990', 'lautaro@gmail.com', '$2a$10$Ax1PiETLOpv536ktDesnJ.KzIVMXK1Q6AmSMiBBi0Y9Yhh4oFF3J.', 2, '2025-02-12 13:18:30.074931', '2025-02-12 13:18:30.074931');
INSERT INTO public.usuario VALUES (14, 'Lucas', 'Trinas', '121212122', NULL, 'canal del carmen 0550', 'lucastrina@gmail.com', '$2a$10$d8W3qTAxIA.WUVRbyGhE7O4EASOR7jBE1WAWyUcJig.EORE0GHvP.', 2, '2025-02-12 13:29:56.929798', '2025-02-12 13:29:56.929798');
INSERT INTO public.usuario VALUES (15, 'vado', 'vado', '131313134', 4, 'pedro lira 456', 'vado@gmail.com', '$2a$10$d8W3qTAxIA.WUVRbyGhE7O4EASOR7jBE1WAWyUcJig.EORE0GHvP.', 1, '2025-02-12 13:32:46.648283', '2025-02-12 13:32:46.648283');


--
-- TOC entry 3742 (class 0 OID 0)
-- Dependencies: 225
-- Name: categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categoria_id_seq', 4, true);


--
-- TOC entry 3743 (class 0 OID 0)
-- Dependencies: 219
-- Name: comuna_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comuna_id_seq', 140, true);


--
-- TOC entry 3744 (class 0 OID 0)
-- Dependencies: 237
-- Name: detalle_orden_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalle_orden_id_seq', 10, true);


--
-- TOC entry 3745 (class 0 OID 0)
-- Dependencies: 233
-- Name: estado_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estado_id_seq', 9, true);


--
-- TOC entry 3746 (class 0 OID 0)
-- Dependencies: 229
-- Name: forma_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.forma_id_seq', 2, true);


--
-- TOC entry 3747 (class 0 OID 0)
-- Dependencies: 235
-- Name: orden_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orden_id_seq', 6, true);


--
-- TOC entry 3748 (class 0 OID 0)
-- Dependencies: 227
-- Name: porcion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.porcion_id_seq', 3, true);


--
-- TOC entry 3749 (class 0 OID 0)
-- Dependencies: 231
-- Name: producto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.producto_id_seq', 12, true);


--
-- TOC entry 3750 (class 0 OID 0)
-- Dependencies: 217
-- Name: region_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.region_id_seq', 21, true);


--
-- TOC entry 3751 (class 0 OID 0)
-- Dependencies: 221
-- Name: rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rol_id_seq', 2, true);


--
-- TOC entry 3752 (class 0 OID 0)
-- Dependencies: 223
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_seq', 15, true);


--
-- TOC entry 3534 (class 2606 OID 17140)
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id);


--
-- TOC entry 3524 (class 2606 OID 17095)
-- Name: comuna comuna_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comuna
    ADD CONSTRAINT comuna_pkey PRIMARY KEY (id);


--
-- TOC entry 3546 (class 2606 OID 17253)
-- Name: detalle_orden detalle_orden_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_orden
    ADD CONSTRAINT detalle_orden_pkey PRIMARY KEY (id);


--
-- TOC entry 3542 (class 2606 OID 17191)
-- Name: estado estado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado
    ADD CONSTRAINT estado_pkey PRIMARY KEY (id);


--
-- TOC entry 3538 (class 2606 OID 17156)
-- Name: forma forma_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forma
    ADD CONSTRAINT forma_pkey PRIMARY KEY (id);


--
-- TOC entry 3544 (class 2606 OID 17236)
-- Name: orden orden_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orden
    ADD CONSTRAINT orden_pkey PRIMARY KEY (id);


--
-- TOC entry 3536 (class 2606 OID 17148)
-- Name: porcion porcion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.porcion
    ADD CONSTRAINT porcion_pkey PRIMARY KEY (id);


--
-- TOC entry 3540 (class 2606 OID 17169)
-- Name: producto producto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id);


--
-- TOC entry 3522 (class 2606 OID 17088)
-- Name: region region_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.region
    ADD CONSTRAINT region_pkey PRIMARY KEY (id);


--
-- TOC entry 3526 (class 2606 OID 17107)
-- Name: rol rol_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (id);


--
-- TOC entry 3528 (class 2606 OID 17122)
-- Name: usuario usuario_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_key UNIQUE (email);


--
-- TOC entry 3530 (class 2606 OID 17118)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 3532 (class 2606 OID 17120)
-- Name: usuario usuario_telefono_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_telefono_key UNIQUE (telefono);


--
-- TOC entry 3547 (class 2606 OID 17096)
-- Name: comuna comuna_region_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comuna
    ADD CONSTRAINT comuna_region_id_fkey FOREIGN KEY (region_id) REFERENCES public.region(id) ON DELETE CASCADE;


--
-- TOC entry 3555 (class 2606 OID 17259)
-- Name: detalle_orden detalle_orden_orden_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_orden
    ADD CONSTRAINT detalle_orden_orden_id_fkey FOREIGN KEY (orden_id) REFERENCES public.orden(id) ON DELETE CASCADE;


--
-- TOC entry 3556 (class 2606 OID 17264)
-- Name: detalle_orden detalle_orden_porcion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_orden
    ADD CONSTRAINT detalle_orden_porcion_id_fkey FOREIGN KEY (porcion_id) REFERENCES public.porcion(id) ON DELETE RESTRICT;


--
-- TOC entry 3557 (class 2606 OID 17254)
-- Name: detalle_orden detalle_orden_producto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_orden
    ADD CONSTRAINT detalle_orden_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.producto(id) ON DELETE RESTRICT;


--
-- TOC entry 3553 (class 2606 OID 17242)
-- Name: orden orden_estado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orden
    ADD CONSTRAINT orden_estado_id_fkey FOREIGN KEY (estado_id) REFERENCES public.estado(id) ON DELETE RESTRICT;


--
-- TOC entry 3554 (class 2606 OID 17237)
-- Name: orden orden_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orden
    ADD CONSTRAINT orden_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.usuario(id) ON DELETE CASCADE;


--
-- TOC entry 3550 (class 2606 OID 17170)
-- Name: producto producto_categoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categoria(id) ON DELETE RESTRICT;


--
-- TOC entry 3551 (class 2606 OID 17180)
-- Name: producto producto_forma_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_forma_id_fkey FOREIGN KEY (forma_id) REFERENCES public.porcion(id) ON DELETE RESTRICT;


--
-- TOC entry 3552 (class 2606 OID 17175)
-- Name: producto producto_porcion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_porcion_id_fkey FOREIGN KEY (porcion_id) REFERENCES public.porcion(id) ON DELETE RESTRICT;


--
-- TOC entry 3548 (class 2606 OID 17123)
-- Name: usuario usuario_comuna_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_comuna_id_fkey FOREIGN KEY (comuna_id) REFERENCES public.comuna(id) ON DELETE SET NULL;


--
-- TOC entry 3549 (class 2606 OID 17128)
-- Name: usuario usuario_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.rol(id) ON DELETE RESTRICT;


-- Completed on 2025-02-14 21:17:44 -03

--
-- PostgreSQL database dump complete
--

