/*
Navicat MySQL Data Transfer

Source Server         : jun
Source Server Version : 50626
Source Host           : localhost:3306
Source Database       : daimengwuyu

Target Server Type    : MYSQL
Target Server Version : 50626
File Encoding         : 65001

Date: 2017-06-19 12:06:36
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
INSERT INTO `dianzan` VALUES ('18', '孙俊威', '2017-6-19 10:52:10');
INSERT INTO `dianzan` VALUES ('21', '高山语', '2017-6-19 11:33:31');

-- ----------------------------
-- Table structure for `guanzhu`
-- ----------------------------
DROP TABLE IF EXISTS `guanzhu`;
CREATE TABLE `guanzhu` (
  `login_userid` varchar(255) DEFAULT NULL,
  `guanzhu_username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of guanzhu
-- ----------------------------
INSERT INTO `guanzhu` VALUES ('高山语', '孙俊威');

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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES ('18', '孙俊威', 'picture/a18bjl1.jpg,picture/a18bjl2.jpg', '2017-6-19 9:47:6', '夏天的冰激凌', '给大家讲一个悲伤的故事，今天我出去晒太阳，然后就化掉了，完。', '1', '0');
INSERT INTO `message` VALUES ('19', '孙俊威', 'picture/a18fs3.jpg', '2017-6-19 9:59:11', '一只努力的风扇', '主人抓住我的胳膊对我说，小风扇呐，我夏天就要靠你了啊！你要加油呐。----我好感动啊！我要转到天荒地老！', '0', '0');
INSERT INTO `message` VALUES ('21', '高山语', 'picture/a10nsfj3.jpg,picture/a18sj4.jpg,picture/a19sj1.jpg', '2017-6-19 11:32:51', '有觉悟的手机', '别再玩我啦，天天玩手机的人一点都不酷~去看看大自然的风景吧~', '1', '0');

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
INSERT INTO `user_information` VALUES ('孙俊威', 'sunjunwei11', 'picture/a2xqx1.jpg', '18771022119', '18771022119@163.com', '武汉理工大学_西院_狮城公寓_731');
INSERT INTO `user_information` VALUES ('高山语', 'sunjunwei11', 'picture/a2xqx4.jpg', '18771022119', '18771022119@163.com', '武汉理工大学_西院_狮城公寓_731');
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
