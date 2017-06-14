/*
Navicat MySQL Data Transfer

Source Server         : jun
Source Server Version : 50626
Source Host           : localhost:3306
Source Database       : daimengwuyu

Target Server Type    : MYSQL
Target Server Version : 50626
File Encoding         : 65001

Date: 2017-06-14 19:52:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `dianzan`
-- ----------------------------
DROP TABLE IF EXISTS `dianzan`;
CREATE TABLE `dianzan` (
  `message_id` int(255) NOT NULL,
  `dianzan_username` varchar(255) NOT NULL,
  `dianzan_time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dianzan
-- ----------------------------
INSERT INTO `dianzan` VALUES ('15', '孙俊威', '2017-6-12 13:40:26');
INSERT INTO `dianzan` VALUES ('14', '孙俊威', '2017-6-12 13:42:15');

-- ----------------------------
-- Table structure for `message`
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `user_picture` varchar(255) DEFAULT NULL,
  `message_time` varchar(255) DEFAULT '0000-00-00 00:00:00',
  `renwusheding` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `dianzan_number` int(10) DEFAULT '0',
  `pinglun_number` int(10) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES ('11', '孙俊威', 'picture/zzm1.jpg,picture/zzm3.jpg', '2017-6-9 16:35:34', '112', '21是', '0', '3');
INSERT INTO `message` VALUES ('12', '孙俊威', 'picture/zzm3.jpg,picture/zzm4.jpg,picture/zzm6.jpg', '2017-6-9 16:36:10', 'dog', '感受到分', '0', '3');
INSERT INTO `message` VALUES ('13', '孙俊威', 'picture/zzm6.jpg', '2017-6-9 22:42:0', '书本', '来，我给你们精神食粮', '0', '0');
INSERT INTO `message` VALUES ('14', '孙俊威', 'picture/zzm4.jpg,picture/zzm5.jpg,picture/zzm6.jpg,picture/zzm7.jpg', '2017-6-10 16:34:12', '篮球', '今天这场比赛，真的是精心策划的一场比赛啊。', '1', '0');
INSERT INTO `message` VALUES ('15', '孙俊威', 'picture/zzm1.jpg,picture/zzm3.jpg,picture/zzm4.jpg,picture/zzm6.jpg,picture/zzm7.jpg', '2017-6-10 16:38:30', '手机', '别玩我了，再玩要被你玩坏了。', '1', '0');

-- ----------------------------
-- Table structure for `pinglun`
-- ----------------------------
DROP TABLE IF EXISTS `pinglun`;
CREATE TABLE `pinglun` (
  `message_id` int(255) NOT NULL,
  `pinglun_username` varchar(255) NOT NULL,
  `pinglun_content` varchar(255) NOT NULL,
  `pinglun_time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pinglun
-- ----------------------------
INSERT INTO `pinglun` VALUES ('12', '孙俊威', '哒哒哒大的', '2017-6-12 17:16:36');
INSERT INTO `pinglun` VALUES ('12', '孙俊威', '哒哒哒大的冯绍峰', '2017-6-12 17:17:12');
INSERT INTO `pinglun` VALUES ('11', '孙俊威', 'ggg', '2017-6-12 17:17:52');
INSERT INTO `pinglun` VALUES ('12', '孙俊威', 'ggg发士大夫', '2017-6-12 17:22:44');
INSERT INTO `pinglun` VALUES ('11', '孙俊威', '撒敌法', '2017-6-12 22:55:10');
INSERT INTO `pinglun` VALUES ('11', '孙俊威', '发布一条评论', '2017-6-13 16:40:7');

-- ----------------------------
-- Table structure for `user_information`
-- ----------------------------
DROP TABLE IF EXISTS `user_information`;
CREATE TABLE `user_information` (
  `userid` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `selected_head_pic_src` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_information
-- ----------------------------
INSERT INTO `user_information` VALUES ('孙俊威', '123456', 'picture/zzm3.jpg', '18771022119', '18771022119@163.com', '武汉理工大学东院');
INSERT INTO `user_information` VALUES ('孙俊威啊', '11', 'picture/zzm3.jpg', '企鹅', '方法', '-');
INSERT INTO `user_information` VALUES ('234', '11', 'picture/zzm5.jpg', '-', '-', '-');
INSERT INTO `user_information` VALUES ('2332', '33', 'picture/zzm4.jpg', '-', '-', '-');
INSERT INTO `user_information` VALUES ('345', '55', 'picture/zzm3.jpg', '-', '-', '-');
DROP TRIGGER IF EXISTS `whenInsert`;
DELIMITER ;;
CREATE TRIGGER `whenInsert` AFTER INSERT ON `dianzan` FOR EACH ROW BEGIN
  UPDATE message SET dianzan_number = dianzan_number+1 WHERE id=NEW.message_id;
END
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `whenDelete`;
DELIMITER ;;
CREATE TRIGGER `whenDelete` AFTER DELETE ON `dianzan` FOR EACH ROW BEGIN
  UPDATE message SET dianzan_number = dianzan_number-1 WHERE id=OLD.message_id;
END
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `pinglunInsert`;
DELIMITER ;;
CREATE TRIGGER `pinglunInsert` AFTER INSERT ON `pinglun` FOR EACH ROW BEGIN
  UPDATE message SET pinglun_number = pinglun_number+1 WHERE id=NEW.message_id;
END
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `pinglunDelete`;
DELIMITER ;;
CREATE TRIGGER `pinglunDelete` AFTER DELETE ON `pinglun` FOR EACH ROW BEGIN
  UPDATE message SET pinglun_number = pinglun_number-1 WHERE id=OLD.message_id;
END
;;
DELIMITER ;
