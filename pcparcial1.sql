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

-- Volcando datos para la tabla pcparcial1.empleados: ~0 rows (aproximadamente)
DELETE FROM `empleados`;
INSERT INTO `empleados` (`id`, `nombre`, `apellido`, `email`, `telefono`, `direccion`, `fechaNacimiento`, `puesto`, `salario`, `fechaIngreso`, `proyectoId`, `estado`, `createdAt`, `updatedAt`) VALUES
	(1, 'Miguel', 'Garcia', 'miguel@email.com', '32416137', 'Zona 4 Totonicapan, Ciudad', '2003-01-01', 'Desarrollador', 2500.00, '2020-08-01', 1, 1, '2025-08-22 18:23:15', '2025-08-22 18:41:00'),
	(3, 'Juan', 'Pérez', 'juan.perez@email.com', '5551234567', 'Calle 123, Ciudad', '1990-01-01', 'Desarrollador', 1500.00, '2020-05-01', NULL, 0, '2025-08-22 18:23:15', '2025-08-22 18:23:36'),
	(4, 'Angel', 'Garcia', 'migue@email.com', '32416137', 'Zona 2 Totonicapan, Ciudad', '2003-01-01', 'Desarrollador', 2500.00, '2020-05-01', 1, 1, '2025-08-22 18:23:15', '2025-08-22 18:33:51'),
	(6, 'Marcos', 'Garcia', 'marcos@email.com', '32416137', 'Zona 2 Totonicapan, Ciudad', '2003-01-01', 'Desarrollador', 2500.00, '2020-05-01', NULL, 1, '2025-08-22 18:29:55', '2025-08-22 18:29:55'),
	(7, 'Lucas', 'Garcia', 'lucas@email.com', '32416137', 'Zona 2 Totonicapan, Ciudad', '2003-01-01', 'Desarrollador', 2500.00, '2020-05-01', NULL, 1, '2025-08-22 18:45:06', '2025-08-22 18:45:06');

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

-- Volcando datos para la tabla pcparcial1.proyectos: ~0 rows (aproximadamente)
DELETE FROM `proyectos`;
INSERT INTO `proyectos` (`id`, `nombre`, `descripcion`, `fechaInicio`, `fechaFin`, `porcentajeCompletado`, `estado`, `createdAt`, `updatedAt`) VALUES
	(1, 'Proyecto A', 'Desarrollo de software', '2025-09-01', '2025-12-31', 50, 1, '2025-08-22 18:23:15', '2025-08-22 18:23:15'),
	(2, 'Proyecto C', 'Desarrollo de softwareee', '2025-09-11', '2025-12-11', 20, 1, '2025-08-22 18:23:15', '2025-08-22 18:23:15');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
