CREATE TABLE `images`
(
    `id`             int(11)      NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `tree_id`        int(11)      DEFAULT NULL,
    `image`          varchar(300) DEFAULT NULL,
    `image_high_res` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `text`           varchar(300) DEFAULT NULL,
    `hash`           char(32)     DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE `settings`
(
    `key`   varchar(30)  NOT NULL PRIMARY KEY,
    `value` varchar(200) NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = latin1;

CREATE TABLE `sponsors`
(
    `id`           int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `tree_id`      int(11)      DEFAULT NULL,
    `name`         varchar(250) DEFAULT NULL,
    `contribution` varchar(100) DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE `trees`
(
    `id`            int(11)  NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `description`   text,
    `date_planted`  date              DEFAULT NULL,
    `no_of_trees`   int(11)  NOT NULL DEFAULT '1',
    `location`      point             DEFAULT NULL,
    `location_name` varchar(100)      DEFAULT NULL,
    `last_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

ALTER TABLE `sponsors`
    ADD KEY `tree__fk` (`tree_id`),
    ADD CONSTRAINT `tree__fk` FOREIGN KEY (`tree_id`) REFERENCES `trees` (`id`);

INSERT INTO `settings` (`key`, value) VALUE ('highlight', 0);
INSERT INTO `settings` (`key`, value) VALUE ('tree_count', 0);

INSERT INTO `trees` (`id`, `description`, `date_planted`, `no_of_trees`, `location`, `location_name`, `last_modified`)
VALUES
(1, 'Pflanzung des ersten Baumes (Felsenbirne) - STR R.Kaufmann, Bgm. G.Hackl, VzBgm. W.Hauser, E.Pötzl und L.Födermayr', '2020-06-01', 1, 0x000000000101000000118c834bc7044840732ec55565d72c40, 'Dukartstraße - Ausfahrt Garage', '2020-09-13 20:18:07'),
(2, '6 Eichen gepflanzt in einem Steyrer Privatgarten.', '2020-06-01', 6, 0x00000000010100000000000000000000000000000000000000, 'Privatgarten', '2020-09-18 11:54:33'),
(3, 'Bei Zwischenbrücken wurde ein Fächerahorn gepflanzt.', '2020-06-01', 1, 0x000000000101000000f866406260054840699082a790d72c40, 'Zwischenbrücken', '2020-09-22 12:18:02'),
(4, 'Tatkräftig unterstützt wurde das Projekt durch Schülerinnen und Schüler der Volksschule Wehrgraben, die einen Kastanienbaum pflanzten.', '2020-08-03', 1, 0x000000000101000000289b7285770548401dacff7398cf2c40, 'VS Wehrgraben', '2020-09-19 20:14:30'),
(24, 'Danke - Schreiben der Schüler der VS Wehrgraben', '2020-08-25', 0, 0x00000000010100000000000000000000000000000000000000, '', '2020-09-25 04:43:36'),
(25, 'Christian Horst pflanzt Eiche am oberen Paddlerweg', '2020-08-25', 1, 0x000000000101000000e292e34ee90448408143a852b3d72c40, 'Oberer Paddlerweg', '2020-09-25 18:06:42'),
(26, 'Hauser Wilhelm, Vizebürgermeister der Stadt Steyr pflanzt einen Amberbaum vor dem neuen Taborlift', '2020-08-25', 1, 0x000000000101000000448655bc9105484080828b1535d82c40, 'Michaelerplatz', '2020-09-25 18:11:25'),
(27, 'Sonderschule in Gleink!\nEine Rosskastanie wird gepflanzt', '2020-08-25', 1, 0x00000000010100000022895e46b1084840fab836548cd32c40, 'Gleink', '2020-09-26 13:41:25'),
(28, 'Die Partnerstadt Plauen spendet eine EICHE anlässlich der 25 jährigen Partnerschaft!', '2020-08-25', 1, 0x000000000101000000462575029a044840130f289b72d52c40, 'Tomitzstrasse', '2020-09-26 13:42:14'),
(29, 'Die Tomitzstrasse wird mit 4 Linden und einer Eiche beschattet.\nLothar Fischer unterstützt mit einer großzügigen Spende das Projekt!', '2020-08-25', 2, 0x00000000010100000031b610e4a0044840f7afac3429d52c40, 'Tomitzsztrasse', '2020-09-25 18:33:00'),
(31, 'Gerald Hackl, Bürgermeister der Stadt Steyr übernimmt die Patenschaft für eine Linde vor seiner Schule, die Oberbank Steyr-Stadtplatz pflanzt eine Linde!', '2020-08-25', 2, 0x0000000001010000006a183e22a6044840a228d027f2d42c40, 'Tomitzstrasse', '2020-09-26 13:42:46'),
(32, 'Die Revitalisierung des BESERLPARKS NEU  erfolgt durch 7 Spitzahorn.\nWilhelm Hauser, Vizebürgermeister und Frau GM Frech übernehmen je eine Patenschaft.', '2020-08-25', 2, 0x0000000001010000002315c61682044840f5d6c05609d62c40, 'Bergerweg', '2020-09-25 18:58:32'),
(33, 'Schmidl Margot, Geretschläger Gaby und Heschl Anna  sind Paten für 3 weitere Spitzahorn.', '2020-08-25', 3, 0x000000000101000000e370e65773044840bd00fbe8d4d52c40, 'Bergerweg', '2020-09-25 19:03:37'),
(34, 'Die Firma MALEREI & FASSADEN übernimmt die Patenschaft für einen weiteren Spitzahorn im BESERLPARK neu', '2020-08-25', 1, 0x0000000001010000008638d6c56d044840f6285c8fc2d52c40, 'Bergerweg', '2020-09-25 19:09:22'),
(35, 'Die GRÜNE Fraktion spendet einen schon sieben Meter hohen Lederhülsenbaum beim Museum Arbeitswelt', '2020-08-25', 1, 0x00000000010100000005c58f31770548402ffa0ad28cd52c40, 'Museum Arbeitswelt', '2020-09-25 19:14:59'),
(36, 'Frau C.Silvan  pflanzt einen jungen Ginko Baum!', '2020-08-26', 1, 0x000000000101000000a20bea5be6044840d6390664afd72c40, 'Oberer Paddlerweg', '2020-09-26 13:46:18'),
(37, 'Sebastian Wieser übernimmt die Patenschaft für eine Säulenhainbuche am Brückenkopf der Rederbrücke.', '2020-09-07', 1, 0x000000000101000000444c89247a054840249c16bce8db2c40, 'Brückenkopf Rederbrücke', '2020-12-16 11:27:02'),
(38, 'Die Stadt Steyr pflanzt auf dem Parkplatz vor dem neuen Musikheim    7 Stk. Feldahorm (Acer campestre) und 1 Stk. Sommerlinde (Tilia platyphyllos).\n', '2020-09-10', 8, 0x00000000010100000064062ae3df034840f949b54fc7d32c40, 'Reithoffer Areal', '2020-09-26 16:59:00'),
(39, 'Frau Dr. Schubert übernimmt die Patenschaft für einen großen Ginko Baum.\n', '2020-09-10', 1, 0x0000000001010000001bd82ac1e2044840f2cd3637a6d72c40, 'Oberer  Paddelweg', '2020-12-16 11:54:58');
