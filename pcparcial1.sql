-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.30 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para pcparcial1
CREATE DATABASE IF NOT EXISTS `pcparcial1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pcparcial1`;

-- Volcando estructura para tabla pcparcial1.empleados
CREATE TABLE IF NOT EXISTS `empleados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `puesto` varchar(100) NOT NULL,
  `salario` decimal(10,2) NOT NULL,
  `fechaIngreso` date NOT NULL,
  `proyectoId` int DEFAULT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_a5c9113abdd7c58a2290208119` (`email`),
  KEY `FK_79ba2083722ea9390406ae0803b` (`proyectoId`),
  CONSTRAINT `FK_79ba2083722ea9390406ae0803b` FOREIGN KEY (`proyectoId`) REFERENCES `proyectos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla pcparcial1.empleados: ~5 rows (aproximadamente)
DELETE FROM `empleados`;
INSERT INTO `empleados` (`id`, `nombre`, `apellido`, `email`, `telefono`, `direccion`, `fechaNacimiento`, `puesto`, `salario`, `fechaIngreso`, `proyectoId`, `estado`, `createdAt`, `updatedAt`) VALUES
	(1, 'Miguel', 'Garcia', 'miguel@email.com', '32416137', 'Zona 4 Totonicapan, Ciudad', '2003-01-01', 'Desarrollador', 2500.00, '2020-08-01', 1, 1, '2025-08-22 18:23:15', '2025-08-22 18:41:00'),
	(3, 'Juan', 'Pérez', 'juan.perez@email.com', '5551234567', 'Calle 123, Ciudad', '1990-01-01', 'Desarrollador', 1500.00, '2020-05-01', NULL, 0, '2025-08-22 18:23:15', '2025-08-22 18:23:36'),
	(4, 'Angel', 'Garcia', 'migue@email.com', '32416137', 'Zona 2 Totonicapan, Ciudad', '2003-01-01', 'Desarrollador', 2500.00, '2020-05-01', 1, 1, '2025-08-22 18:23:15', '2025-08-22 18:33:51'),
	(6, 'Marcos', 'Garcia', 'marcos@email.com', '32416137', 'Zona 2 Totonicapan, Ciudad', '2003-01-01', 'Desarrollador', 2500.00, '2020-05-01', NULL, 1, '2025-08-22 18:29:55', '2025-08-22 18:29:55'),
	(7, 'Lucas', 'Garcia', 'lucas@email.com', '32416137', 'Zona 2 Totonicapan, Ciudad', '2003-01-01', 'Desarrollador', 2500.00, '2020-05-01', NULL, 1, '2025-08-22 18:45:06', '2025-08-22 18:45:06'),
	(58, 'Juan', 'Pérez', 'juan.perez1@example.com', '555123001', 'Calle 1, Zona 1', '1990-05-12', 'Desarrollador', 5500.00, '2020-01-15', 1, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(59, 'María', 'Gómez', 'maria.gomez2@example.com', '555123002', 'Calle 2, Zona 2', '1988-08-22', 'Diseñadora', 4800.00, '2019-03-10', 2, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(60, 'Carlos', 'López', 'carlos.lopez3@example.com', '555123003', 'Calle 3, Zona 3', '1992-11-02', 'Administrador', 6000.00, '2021-06-05', 1, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(61, 'Ana', 'Martínez', 'ana.martinez4@example.com', '555123004', 'Calle 4, Zona 4', '1995-07-18', 'Analista', 5200.00, '2022-02-12', 3, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(62, 'Luis', 'Ramírez', 'luis.ramirez5@example.com', '555123005', 'Calle 5, Zona 5', '1991-03-09', 'Contador', 5800.00, '2020-09-01', 2, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(63, 'Sofía', 'Fernández', 'sofia.fernandez6@example.com', '555123006', 'Calle 6, Zona 6', '1989-01-30', 'Secretaria', 4000.00, '2018-07-20', 1, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(64, 'Pedro', 'Jiménez', 'pedro.jimenez7@example.com', '555123007', 'Calle 7, Zona 7', '1993-04-25', 'Ingeniero', 6200.00, '2020-12-15', 3, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(65, 'Laura', 'Hernández', 'laura.hernandez8@example.com', '555123008', 'Calle 8, Zona 8', '1994-06-11', 'Asistente', 4100.00, '2021-03-22', 2, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(66, 'Diego', 'Castillo', 'diego.castillo9@example.com', '555123009', 'Calle 9, Zona 9', '1996-09-19', 'Diseñador', 4500.00, '2022-04-30', 1, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(67, 'Valeria', 'Morales', 'valeria.morales10@example.com', '555123010', 'Calle 10, Zona 10', '1990-12-14', 'Gerente', 7000.00, '2019-05-18', 2, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(68, 'Andrés', 'Cruz', 'andres.cruz11@example.com', '555123011', 'Calle 11, Zona 11', '1992-08-07', 'Supervisor', 5300.00, '2021-10-11', 3, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(69, 'Camila', 'Díaz', 'camila.diaz12@example.com', '555123012', 'Calle 12, Zona 12', '1997-03-29', 'Analista', 4900.00, '2022-07-05', 1, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(70, 'Javier', 'Ortiz', 'javier.ortiz13@example.com', '555123013', 'Calle 13, Zona 13', '1995-11-16', 'Vendedor', 4600.00, '2020-08-22', 2, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(71, 'Paola', 'Reyes', 'paola.reyes14@example.com', '555123014', 'Calle 14, Zona 14', '1987-10-01', 'Marketing', 5100.00, '2018-09-10', 3, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(72, 'Fernando', 'Torres', 'fernando.torres15@example.com', '555123015', 'Calle 15, Zona 15', '1991-02-18', 'Soporte', 4300.00, '2019-12-03', 1, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(73, 'Isabel', 'Vargas', 'isabel.vargas16@example.com', '555123016', 'Calle 16, Zona 16', '1993-05-23', 'Recursos Humanos', 5500.00, '2021-01-19', 2, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(74, 'Hugo', 'Flores', 'hugo.flores17@example.com', '555123017', 'Calle 17, Zona 17', '1994-07-04', 'Ingeniero', 6200.00, '2022-08-27', 3, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(75, 'Natalia', 'Silva', 'natalia.silva18@example.com', '555123018', 'Calle 18, Zona 18', '1996-09-12', 'Analista', 4700.00, '2020-11-14', 1, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(76, 'Ricardo', 'Mendoza', 'ricardo.mendoza19@example.com', '555123019', 'Calle 19, Zona 19', '1989-06-27', 'Gerente', 7500.00, '2018-10-01', 2, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(77, 'Lucía', 'Ramos', 'lucia.ramos20@example.com', '555123020', 'Calle 20, Zona 20', '1992-01-03', 'Secretaria', 4000.00, '2019-01-25', 3, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(78, 'Tomás', 'Navarro', 'tomas.navarro21@example.com', '555123021', 'Calle 21, Zona 21', '1995-02-15', 'Administrador', 5900.00, '2021-06-09', 1, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(79, 'Gabriela', 'Campos', 'gabriela.campos22@example.com', '555123022', 'Calle 22, Zona 22', '1991-04-20', 'Diseñadora', 5000.00, '2020-02-18', 2, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(80, 'Miguel', 'Arias', 'miguel.arias23@example.com', '555123023', 'Calle 23, Zona 23', '1990-07-08', 'Contador', 5600.00, '2019-04-12', 3, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(81, 'Elena', 'Guerrero', 'elena.guerrero24@example.com', '555123024', 'Calle 24, Zona 24', '1994-10-30', 'Analista', 4800.00, '2021-09-03', 1, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35'),
	(82, 'Santiago', 'Mora', 'santiago.mora25@example.com', '555123025', 'Calle 25, Zona 25', '1996-12-21', 'Soporte', 4500.00, '2022-05-29', 2, 1, '2025-08-22 19:06:35', '2025-08-22 19:06:35');

-- Volcando estructura para tabla pcparcial1.proyectos
CREATE TABLE IF NOT EXISTS `proyectos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `porcentajeCompletado` float NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla pcparcial1.proyectos: ~2 rows (aproximadamente)
DELETE FROM `proyectos`;
INSERT INTO `proyectos` (`id`, `nombre`, `descripcion`, `fechaInicio`, `fechaFin`, `porcentajeCompletado`, `estado`, `createdAt`, `updatedAt`) VALUES
	(1, 'Proyecto A', 'Desarrollo de software', '2025-09-01', '2025-12-31', 50, 1, '2025-08-22 18:23:15', '2025-08-22 18:23:15'),
	(2, 'Proyecto C', 'Desarrollo de softwareee', '2025-09-11', '2025-12-11', 20, 1, '2025-08-22 18:23:15', '2025-08-22 18:23:15'),
	(3, 'Sistema de Inventario', 'Proyecto para gestionar el inventario de la empresa.', '2023-01-01', '2023-06-30', 100, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32'),
	(4, 'Aplicación Móvil Ventas', 'Desarrollo de app móvil para el equipo de ventas.', '2023-02-15', '2023-09-15', 95, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32'),
	(5, 'Migración a la Nube', 'Migración de servidores locales a AWS.', '2023-03-01', '2023-08-01', 90, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32'),
	(6, 'Página Web Corporativa', 'Rediseño completo de la página web.', '2023-04-01', '2023-07-15', 100, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32'),
	(7, 'CRM Clientes', 'Implementación de sistema CRM para clientes.', '2023-05-10', '2023-12-31', 80, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32'),
	(8, 'E-commerce Tienda', 'Creación de tienda en línea para productos.', '2023-06-01', '2023-11-01', 75, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32'),
	(9, 'ERP Financiero', 'Sistema de gestión de finanzas integrado.', '2023-07-01', '2024-01-31', 60, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32'),
	(10, 'Automatización de Reportes', 'Automatización de reportes mensuales en Power BI.', '2023-08-01', '2023-09-30', 100, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32'),
	(11, 'Chatbot Soporte', 'Implementación de chatbot para servicio al cliente.', '2023-08-15', '2023-12-15', 70, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32'),
	(12, 'Seguridad Informática', 'Mejora de protocolos de ciberseguridad.', '2023-09-01', '2024-03-01', 50, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32'),
	(13, 'App Recursos Humanos', 'Aplicación para control de empleados y asistencia.', '2023-10-01', '2024-02-28', 40, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32'),
	(14, 'Sistema de Pagos', 'Integración con pasarelas de pago en línea.', '2023-10-15', '2024-04-15', 30, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32'),
	(15, 'Plataforma E-learning', 'Desarrollo de cursos en línea internos.', '2023-11-01', '2024-05-01', 25, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32'),
	(16, 'Optimización Base de Datos', 'Mejorar rendimiento de consultas SQL.', '2023-11-15', '2024-01-15', 65, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32'),
	(17, 'Control de Producción', 'Software para control de líneas de producción.', '2023-12-01', '2024-06-01', 20, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32'),
	(18, 'Marketing Digital', 'Campaña digital con redes sociales y SEO.', '2023-12-10', '2024-02-10', 55, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32'),
	(19, 'Aplicación de Logística', 'Gestión de rutas y transportes de la empresa.', '2024-01-01', '2024-07-01', 15, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32'),
	(20, 'Sistema de Reservas', 'Plataforma para reservas en línea.', '2024-01-15', '2024-06-30', 10, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32'),
	(21, 'Gestión Documental', 'Sistema para manejo de documentos internos.', '2024-02-01', '2024-08-01', 5, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32'),
	(22, 'Inteligencia Artificial', 'Implementación de IA en procesos internos.', '2024-02-15', '2024-12-15', 0, 1, '2025-08-22 19:06:32', '2025-08-22 19:06:32');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
