-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-12-2024 a las 17:44:38
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `farmedic`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_venta`
--

CREATE TABLE `detalle_venta` (
  `id_detalle` int(11) NOT NULL,
  `det_cantidad` int(11) NOT NULL,
  `det_vencimiento` date NOT NULL,
  `id_det_lote` int(11) NOT NULL,
  `id_det_prod` int(11) NOT NULL,
  `lote_id_prov` int(255) NOT NULL,
  `id_det_venta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `laboratorio`
--

CREATE TABLE `laboratorio` (
  `id_laboratorio` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `laboratorio`
--

INSERT INTO `laboratorio` (`id_laboratorio`, `nombre`, `avatar`) VALUES
(183, 'ABBOTT', 'lab_default.png'),
(184, 'AC FARMA', 'lab_default.png'),
(185, 'ACCORD', 'lab_default.png'),
(186, 'AJRLABS', 'lab_default.png'),
(187, 'ANDREU', 'lab_default.png'),
(188, 'ANSOLAT', 'lab_default.png'),
(189, 'ARIAL PERU', 'lab_default.png'),
(190, 'ATRAL', 'lab_default.png'),
(191, 'AXONPHARMA', 'lab_default.png'),
(192, 'BABYGUU', 'lab_default.png'),
(193, 'BABYSEC', 'lab_default.png'),
(194, 'BAGO', 'lab_default.png'),
(195, 'BAHIA', 'lab_default.png'),
(196, 'BAYER', 'lab_default.png'),
(197, 'BEIERSDORF', 'lab_default.png'),
(198, 'BIOS PERU', 'lab_default.png'),
(199, 'BOEHRINGER', 'lab_default.png'),
(200, 'BONAPHARM', 'lab_default.png'),
(201, 'BRAUN PERU', 'lab_default.png'),
(202, 'CAFERMA', 'lab_default.png'),
(203, 'CFALAB', 'lab_default.png'),
(204, 'CIFARMA', 'lab_default.png'),
(205, 'CIPA S.A.', 'lab_default.png'),
(206, 'COLGATE', 'lab_default.png'),
(207, 'COPERINSA', 'lab_default.png'),
(208, 'DAEWON', 'lab_default.png'),
(209, 'DANY', 'lab_default.png'),
(210, 'DAXOLAB', 'lab_default.png'),
(211, 'DELFARMA', 'lab_default.png'),
(212, 'DEUTSCHE PH.', 'lab_default.png'),
(213, 'DISNEY MARKET', 'lab_default.png'),
(214, 'DOLAPHARM', 'lab_default.png'),
(215, 'DR. ZAIDMAN', 'lab_default.png'),
(216, 'DRONNVELS', 'lab_default.png'),
(217, 'DROPESAC', 'lab_default.png'),
(218, 'DUREX', 'lab_default.png'),
(219, 'ELIFARMA', 'lab_default.png'),
(220, 'ELIFARMACIA', 'lab_default.png'),
(221, 'EUROFARMA', 'lab_default.png'),
(222, 'FARMAKONSUMA', 'lab_default.png'),
(223, 'FARMAQUIL', 'lab_default.png'),
(224, 'FARMIND. GEN', 'lab_default.png'),
(225, 'FARMINDUSTRIA', 'lab_default.png'),
(226, 'FARVET', 'lab_default.png'),
(227, 'GALENICOS', 'lab_default.png'),
(228, 'GALENTIC', 'lab_default.png'),
(229, 'GARDEN HOUSE', 'lab_default.png'),
(230, 'GEDEON', 'lab_default.png'),
(231, 'GENCO PHARMA', 'lab_default.png'),
(232, 'GENERION', 'lab_default.png'),
(233, 'GENFAR', 'lab_default.png'),
(234, 'GENOMALAB', 'lab_default.png'),
(235, 'GILSAN', 'lab_default.png'),
(236, 'GLAXO', 'lab_default.png'),
(237, 'GLAXO S.K.', 'lab_default.png'),
(238, 'GLOBAL PHARMA', 'lab_default.png'),
(239, 'GO TO MARKET', 'lab_default.png'),
(240, 'GOOD BRANDS', 'lab_default.png'),
(241, 'GRUNENTHAL', 'lab_default.png'),
(242, 'HENO DE PRAVIA', 'lab_default.png'),
(243, 'HERSIL', 'lab_default.png'),
(244, 'INDUFAR', 'lab_default.png'),
(245, 'INDUQUIMICA', 'lab_default.png'),
(246, 'INTIPHARMA', 'lab_default.png'),
(247, 'INTRADEVCO', 'lab_default.png'),
(248, 'IQ FARMA', 'lab_default.png'),
(249, 'ITF FARM. PERU', 'lab_default.png'),
(250, 'JOHNSON', 'lab_default.png'),
(251, 'KIMBERLY', 'lab_default.png'),
(252, 'KOLYNOS', 'lab_default.png'),
(253, 'KONZIL', 'lab_default.png'),
(254, 'LABOFAR', 'lab_default.png'),
(255, 'LABOGEN', 'lab_default.png'),
(256, 'LABOT', 'lab_default.png'),
(257, 'LAFARMED', 'lab_default.png'),
(258, 'LAFARPE', 'lab_default.png'),
(259, 'LANSIER', 'lab_default.png'),
(260, 'LIPHARMA', 'lab_default.png'),
(261, 'LUSA', 'lab_default.png'),
(262, 'LUXOR', 'lab_default.png'),
(263, 'MARFAN', 'lab_default.png'),
(264, 'MARKOS', 'lab_default.png'),
(265, 'MATERIAL MED', 'lab_default.png'),
(266, 'MAVER', 'lab_default.png'),
(267, 'MEDICO BIOLOGICO COLICHON', 'lab_default.png'),
(268, 'MEDIFARMA', 'lab_default.png'),
(269, 'MEDIFARMA OFTALMICO', 'lab_default.png'),
(270, 'MEDROCK', 'lab_default.png'),
(271, 'MEGA CARE', 'lab_default.png'),
(272, 'MEGA LIFESCIENCES', 'lab_default.png'),
(273, 'MEGALABS', 'lab_default.png'),
(274, 'MENTHLAB', 'lab_default.png'),
(275, 'MERCK PERU', 'lab_default.png'),
(276, 'MOCO DE GORILA', 'lab_default.png'),
(277, 'NATULAB', 'lab_default.png'),
(278, 'NEOPAN', 'lab_default.png'),
(279, 'NESTLE', 'lab_default.png'),
(280, 'NIVEA', 'lab_default.png'),
(281, 'NOSOTRAS', 'lab_default.png'),
(282, 'NOVARTIS', 'lab_default.png'),
(283, 'OM PHARMA', 'lab_default.png'),
(284, 'OQ PHARMA', 'lab_default.png'),
(285, 'ORGANON', 'lab_default.png'),
(286, 'PACOCHA', 'lab_default.png'),
(287, 'PAK FARMA', 'lab_default.png'),
(288, 'PERFUMERIA VARIOS', 'lab_default.png'),
(289, 'PERUFARMA', 'lab_default.png'),
(290, 'PFIZER', 'lab_default.png'),
(291, 'PHARMAGEN', 'lab_default.png'),
(292, 'PHARMED', 'lab_default.png'),
(293, 'PHARMEX', 'lab_default.png'),
(294, 'PIEL', 'lab_default.png'),
(295, 'PLENITUD', 'lab_default.png'),
(296, 'PORTUGAL', 'lab_default.png'),
(297, 'PORTUGAL COSMET', 'lab_default.png'),
(298, 'PORTUGAL MARCA', 'lab_default.png'),
(299, 'PRESERVATIVOS', 'lab_default.png'),
(300, 'PROCTER & G.', 'lab_default.png'),
(301, 'PRODESA', 'lab_default.png'),
(302, 'PROTISA', 'lab_default.png'),
(303, 'QUILAB', 'lab_default.png'),
(304, 'QUIMICA SUIZA', 'lab_default.png'),
(305, 'RECAMIER SAC', 'lab_default.png'),
(306, 'ROCHE', 'lab_default.png'),
(307, 'ROEMMERS', 'lab_default.png'),
(308, 'ROWE', 'lab_default.png'),
(309, 'ROXFARMA', 'lab_default.png'),
(310, 'RUCEF', 'lab_default.png'),
(311, 'SANOFI', 'lab_default.png'),
(312, 'SANTOLEE', 'lab_default.png'),
(313, 'SAVAL LAB.', 'lab_default.png'),
(314, 'SCHWARZKOPF', 'lab_default.png'),
(315, 'SEBAL FARMA', 'lab_default.png'),
(316, 'SHERFARMA', 'lab_default.png'),
(317, 'SIEGFRIED', 'lab_default.png'),
(318, 'SMART PHARMA', 'lab_default.png'),
(319, 'SPEED STICK', 'lab_default.png'),
(320, 'TEATRICAL', 'lab_default.png'),
(321, 'TECNOFARMA', 'lab_default.png'),
(322, 'TERBONOVA', 'lab_default.png'),
(323, 'TEVA', 'lab_default.png'),
(324, 'THEFAR', 'lab_default.png'),
(325, 'TOALLAS HIGIEN', 'lab_default.png'),
(326, 'TOBAL', 'lab_default.png'),
(327, 'TUINIES', 'lab_default.png'),
(328, 'UNILEVER', 'lab_default.png'),
(329, 'UNIMED', 'lab_default.png'),
(330, 'VICKS', 'lab_default.png'),
(331, 'VITALINE', 'lab_default.png'),
(332, 'VITALIS', 'lab_default.png'),
(333, 'VITIS', 'lab_default.png'),
(334, 'WELLNESS', 'lab_default.png'),
(335, 'ZAMBON', 'lab_default.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lote`
--

CREATE TABLE `lote` (
  `id_lote` int(11) NOT NULL,
  `stock` int(3) NOT NULL,
  `vencimiento` date NOT NULL,
  `lote_id_prod` int(11) NOT NULL,
  `lote_id_prov` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `lote`
--

INSERT INTO `lote` (`id_lote`, `stock`, `vencimiento`, `lote_id_prod`, `lote_id_prov`) VALUES
(31, 21, '2025-04-01', 43, 27),
(32, 50, '2025-04-01', 42, 27);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presentacion`
--

CREATE TABLE `presentacion` (
  `id_presentacion` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `presentacion`
--

INSERT INTO `presentacion` (`id_presentacion`, `nombre`) VALUES
(11, 'UND'),
(12, 'PQT'),
(13, 'CAJA'),
(14, 'POTE'),
(15, 'SOBRE'),
(16, 'TIRA'),
(17, 'TABLETA'),
(18, 'SACHET');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `concentracion` varchar(255) DEFAULT NULL,
  `adicional` varchar(255) DEFAULT NULL,
  `precio` float NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `prod_lab` int(11) NOT NULL,
  `prod_tip_prod` int(11) NOT NULL,
  `prod_present` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre`, `concentracion`, `adicional`, `precio`, `avatar`, `prod_lab`, `prod_tip_prod`, `prod_present`) VALUES
(42, 'CARAMELO MULTIBI. MENTA / NARANJA', 'Cloruro de Decualinio 0.25mg y Benzocaína 10mg', '', 3.56, '674de109f1acc-multibioticos-mentanaranja-304x304px.jpg', 183, 66, 15),
(43, 'DIXI 35', 'Ciproterona acetato 2mg Y Etinilestradiol 0,035mg', 'null', 42, '674de231ae171-Dixi35-2mg.png', 183, 26, 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id_proveedor` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `telefono` int(11) NOT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`id_proveedor`, `nombre`, `telefono`, `correo`, `direccion`, `avatar`) VALUES
(27, 'proveedor1', 999999999, 'proveedor1@correo.com', 'villa maria del triunfo', 'prov_default.png'),
(28, 'proveedor2', 937537345, 'proveedor2@correo.com', 'villa maria del triunfo', 'prov_default.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_producto`
--

CREATE TABLE `tipo_producto` (
  `id_tip_prod` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `tipo_producto`
--

INSERT INTO `tipo_producto` (`id_tip_prod`, `nombre`) VALUES
(25, 'GEL'),
(26, 'PASTILLA'),
(27, 'AGUA'),
(28, 'ALCOHOHOL'),
(29, 'ABOCATH'),
(30, 'CAPSULA'),
(31, 'AMPOLLA'),
(32, 'CREMA'),
(33, 'ACEITE'),
(34, 'SOBRES'),
(35, 'PAÑALES'),
(36, 'JARABE'),
(37, 'JABON'),
(38, 'PEDIATRICO'),
(39, 'GOTAS'),
(40, 'POLVO'),
(41, 'AGUJA'),
(42, 'JERINGA'),
(43, 'SPRAY'),
(44, 'DESODORANTE'),
(45, 'TOALLA HÚMEDA'),
(46, 'CHAMPÚ'),
(47, 'TALCO'),
(48, 'PROTECTOR SOLAR'),
(49, 'LOCION'),
(50, 'GOMITAS'),
(51, 'CEPILLO'),
(52, 'PASTA DENTAL'),
(53, 'ENJUAGUE BUCAL'),
(54, 'HILO DENTAL'),
(55, 'MAQUILLAJE'),
(56, 'TINTE'),
(57, 'LABIAL'),
(58, 'GASA'),
(59, 'ALCOHOL'),
(60, 'VENDA'),
(61, 'SUERO'),
(62, 'GUANTE'),
(63, 'TAMPON'),
(64, 'LUBRICANTE'),
(65, 'SALES'),
(66, 'CARAMELO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_us`
--

CREATE TABLE `tipo_us` (
  `id_tipo_us` int(11) NOT NULL,
  `nombre_tipo` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `tipo_us`
--

INSERT INTO `tipo_us` (`id_tipo_us`, `nombre_tipo`) VALUES
(1, 'Propietario'),
(2, 'Administrador'),
(3, 'Quimico'),
(4, 'Tecnico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre_us` varchar(45) NOT NULL,
  `apellidos_us` varchar(45) NOT NULL,
  `edad` date NOT NULL,
  `dni_us` varchar(45) NOT NULL,
  `contrasena_us` varchar(45) NOT NULL,
  `telefono_us` int(11) DEFAULT NULL,
  `residencia_us` varchar(45) DEFAULT NULL,
  `correo_us` varchar(25) DEFAULT NULL,
  `sexo_us` varchar(25) DEFAULT NULL,
  `adicional_us` varchar(500) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `us_tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_us`, `apellidos_us`, `edad`, `dni_us`, `contrasena_us`, `telefono_us`, `residencia_us`, `correo_us`, `sexo_us`, `adicional_us`, `avatar`, `us_tipo`) VALUES
(1, 'Carlos Luis', 'Ricaldi Suasnabar', '1984-04-11', '10448541865', 'C@rl0s04', 980961693, 'Lima', 'carlosricaldi.18@gmail.co', 'Masculino', 'Buen jefe', '67449a05bfdbd-avatar.png', 1),
(2, 'Carlos Luis', 'Ricaldi Suasnabar', '1984-04-11', '44854186', '04Lui5R', 123456789, NULL, NULL, NULL, NULL, '673591f1976b6-avatar.png', 2),
(3, 'Elizabeth', 'Quispe', '0000-00-00', '16161616', '1234', NULL, NULL, NULL, NULL, NULL, '673588aa1116d-avatarf1.png', 3),
(4, 'kevin', 'calixto', '1998-05-31', '76807727', '1998Kevalo', NULL, NULL, NULL, NULL, NULL, '673593c6e1888-logo.png', 4),
(5, 'kevinc', 'calixto', '2024-11-01', '98765432', '147258', NULL, NULL, NULL, NULL, NULL, '6736a351700f0-default.png', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `id_venta` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `cliente` varchar(45) DEFAULT NULL,
  `dni` int(11) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `vendedor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta_producto`
--

CREATE TABLE `venta_producto` (
  `id_ventaproducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `subtotal` float NOT NULL,
  `producto_id_producto` int(11) NOT NULL,
  `venta_id_venta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_det_venta_idx` (`id_det_venta`);

--
-- Indices de la tabla `laboratorio`
--
ALTER TABLE `laboratorio`
  ADD PRIMARY KEY (`id_laboratorio`);

--
-- Indices de la tabla `lote`
--
ALTER TABLE `lote`
  ADD PRIMARY KEY (`id_lote`),
  ADD KEY `lote_id_prod_idx` (`lote_id_prod`),
  ADD KEY `lote_id_prov_idx` (`lote_id_prov`);

--
-- Indices de la tabla `presentacion`
--
ALTER TABLE `presentacion`
  ADD PRIMARY KEY (`id_presentacion`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `prod_lab_idx` (`prod_lab`),
  ADD KEY `prod_tip_prod_idx` (`prod_tip_prod`),
  ADD KEY `prod_present_idx` (`prod_present`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id_proveedor`);

--
-- Indices de la tabla `tipo_producto`
--
ALTER TABLE `tipo_producto`
  ADD PRIMARY KEY (`id_tip_prod`);

--
-- Indices de la tabla `tipo_us`
--
ALTER TABLE `tipo_us`
  ADD PRIMARY KEY (`id_tipo_us`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `us_tipo_idx` (`us_tipo`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `vendedor` (`vendedor`);

--
-- Indices de la tabla `venta_producto`
--
ALTER TABLE `venta_producto`
  ADD PRIMARY KEY (`id_ventaproducto`),
  ADD KEY `fk_venta_has_producto_producto1_idx` (`producto_id_producto`),
  ADD KEY `fk_venta_has_producto_venta1_idx` (`venta_id_venta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `laboratorio`
--
ALTER TABLE `laboratorio`
  MODIFY `id_laboratorio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=336;

--
-- AUTO_INCREMENT de la tabla `lote`
--
ALTER TABLE `lote`
  MODIFY `id_lote` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `presentacion`
--
ALTER TABLE `presentacion`
  MODIFY `id_presentacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `tipo_producto`
--
ALTER TABLE `tipo_producto`
  MODIFY `id_tip_prod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT de la tabla `tipo_us`
--
ALTER TABLE `tipo_us`
  MODIFY `id_tipo_us` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `venta`
--
ALTER TABLE `venta`
  MODIFY `id_venta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `venta_producto`
--
ALTER TABLE `venta_producto`
  MODIFY `id_ventaproducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD CONSTRAINT `id_det_venta` FOREIGN KEY (`id_det_venta`) REFERENCES `venta` (`id_venta`);

--
-- Filtros para la tabla `lote`
--
ALTER TABLE `lote`
  ADD CONSTRAINT `lote_id_prod` FOREIGN KEY (`lote_id_prod`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `lote_id_prov` FOREIGN KEY (`lote_id_prov`) REFERENCES `proveedor` (`id_proveedor`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `prod_lab` FOREIGN KEY (`prod_lab`) REFERENCES `laboratorio` (`id_laboratorio`),
  ADD CONSTRAINT `prod_present` FOREIGN KEY (`prod_present`) REFERENCES `presentacion` (`id_presentacion`),
  ADD CONSTRAINT `prod_tip_prod` FOREIGN KEY (`prod_tip_prod`) REFERENCES `tipo_producto` (`id_tip_prod`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `us_tipo` FOREIGN KEY (`us_tipo`) REFERENCES `tipo_us` (`id_tipo_us`);

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`vendedor`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `venta_producto`
--
ALTER TABLE `venta_producto`
  ADD CONSTRAINT `fk_venta_has_producto_producto1` FOREIGN KEY (`producto_id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `fk_venta_has_producto_venta1` FOREIGN KEY (`venta_id_venta`) REFERENCES `venta` (`id_venta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
