/*
 Navicat Premium Data Transfer

 Source Server         : 本机
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3306
 Source Schema         : express

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 20/10/2022 16:14:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ckb_price
-- ----------------------------
DROP TABLE IF EXISTS `ckb_price`;
CREATE TABLE `ckb_price` (
  `id` int NOT NULL AUTO_INCREMENT,
  `exchange` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `price_json` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of ckb_price
-- ----------------------------
BEGIN;
INSERT INTO `ckb_price` VALUES (1, 'coingecko', '{\"nervos-network\":{\"usd\":0.00367143}}');
INSERT INTO `ckb_price` VALUES (2, 'binance', '[{\"id\":20927795,\"price\":\"0.00360000\",\"qty\":\"16666.00000000\",\"quoteQty\":\"59.99760000\",\"time\":1665662380047,\"isBuyerMaker\":false,\"isBestMatch\":true}]');
INSERT INTO `ckb_price` VALUES (3, 'cryptocom', '{\"code\":0,\"method\":\"public/get-trades\",\"result\":{\"instrument_name\":\"CKB_USDT\",\"data\":[{\"dataTime\":1665662589474,\"d\":2946944480555221607,\"s\":\"BUY\",\"p\":0.003574,\"q\":2,\"t\":1665662589468,\"i\":\"CKB_USDT\"},{\"dataTime\":1665662585916,\"d\":2946944361061049767,\"s\":\"SELL\",\"p\":0.003553,\"q\":9,\"t\":1665662585905,\"i\":\"CKB_USDT\"},{\"dataTime\":1665661658746,\"d\":2946913249548689511,\"s\":\"BUY\",\"p\":0.003601,\"q\":63,\"t\":1665661658711,\"i\":\"CKB_USDT\"}]}}');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
