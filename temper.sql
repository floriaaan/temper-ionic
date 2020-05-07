-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           10.1.38-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Listage de la structure de la base pour temper
CREATE DATABASE IF NOT EXISTS `temper` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `temper`;

-- Listage de la structure de la table temper. measures
CREATE TABLE IF NOT EXISTS `measures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `probe` int(11) DEFAULT NULL,
  `temperature` double(22,0) NOT NULL,
  `humidity` double(22,0) NOT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_measures_probes` (`probe`),
  CONSTRAINT `FK_measures_probes` FOREIGN KEY (`probe`) REFERENCES `probes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;

-- Listage des données de la table temper.measures : ~45 rows (environ)
/*!40000 ALTER TABLE `measures` DISABLE KEYS */;
INSERT INTO `measures` (`id`, `probe`, `temperature`, `humidity`, `date`) VALUES
	(1, 1, 20, 50, NULL),
	(2, 1, 20, 51, NULL),
	(3, 1, 19, 60, NULL),
	(4, 1, 17, 60, NULL),
	(5, 1, 20, 57, NULL),
	(6, 1, 22, 56, NULL),
	(7, 1, 20, 51, NULL),
	(8, 1, 17, 51, NULL),
	(9, 1, 18, 53, NULL),
	(10, 1, 21, 59, NULL),
	(11, 1, 17, 58, NULL),
	(12, 1, 21, 54, NULL),
	(13, 1, 17, 51, NULL),
	(14, 1, 20, 58, NULL),
	(15, 1, 21, 54, NULL),
	(16, 1, 17, 59, NULL),
	(17, 1, 20, 50, NULL),
	(18, 1, 18, 52, NULL),
	(19, 1, 22, 56, NULL),
	(20, 1, 17, 50, NULL),
	(21, 1, 21, 50, NULL),
	(22, 1, 23, 57, NULL),
	(23, 1, 23, 51, NULL),
	(24, 1, 20, 58, NULL),
	(25, 1, 19, 56, NULL),
	(26, 1, 23, 51, NULL),
	(27, 2, 17, 59, '2020-05-06 00:00:00'),
	(28, 2, 21, 57, '2020-05-06 00:00:00'),
	(29, 2, 17, 57, '2020-05-06 00:00:00'),
	(30, 2, 23, 57, '2020-05-06 12:01:53'),
	(31, 2, 20, 52, '2020-05-06 12:01:54'),
	(32, 2, 23, 55, '2020-05-06 12:01:55'),
	(33, 2, 19, 50, '2020-05-06 12:01:56'),
	(34, 2, 22, 58, '2020-05-06 12:01:57'),
	(35, 2, 21, 55, '2020-05-06 12:01:58'),
	(36, 2, 18, 60, '2020-05-06 12:01:59'),
	(37, 2, 19, 53, '2020-05-06 12:02:00'),
	(38, 2, 17, 56, '2020-05-06 12:02:01'),
	(39, 2, 18, 51, '2020-05-06 12:02:02'),
	(40, 2, 17, 53, '2020-05-06 12:02:03'),
	(41, 2, 18, 55, '2020-05-06 12:02:04'),
	(42, 2, 21, 53, '2020-05-06 12:02:05'),
	(43, 2, 18, 54, '2020-05-06 12:02:06'),
	(44, 2, 20, 53, '2020-05-06 12:02:07'),
	(45, 2, 17, 53, '2020-05-06 12:02:08'),
	(46, 2, 20, 60, '2020-05-06 12:02:09'),
	(47, 2, 17, 52, '2020-05-06 12:02:10'),
	(48, 2, 17, 53, '2020-05-06 12:02:11'),
	(49, 2, 18, 51, '2020-05-06 12:02:12'),
	(50, 2, 19, 53, '2020-05-06 12:02:13'),
	(51, 2, 20, 51, '2020-05-06 12:02:14');
/*!40000 ALTER TABLE `measures` ENABLE KEYS */;

-- Listage de la structure de la table temper. probes
CREATE TABLE IF NOT EXISTS `probes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `gps_lon` double DEFAULT NULL,
  `gps_lat` double DEFAULT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK_probes_users` (`user`),
  CONSTRAINT `FK_probes_users` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Listage des données de la table temper.probes : ~2 rows (environ)
/*!40000 ALTER TABLE `probes` DISABLE KEYS */;
INSERT INTO `probes` (`id`, `name`, `user`, `gps_lon`, `gps_lat`, `state`) VALUES
	(1, 'CPU de Turing', 1, 41.7, 1.69, 1),
	(2, 'Garage', 1, NULL, NULL, 0);
/*!40000 ALTER TABLE `probes` ENABLE KEYS */;

-- Listage de la structure de la table temper. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(70) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Listage des données de la table temper.users : ~0 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
	(1, 'floriaaan', NULL, 'azerty');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
