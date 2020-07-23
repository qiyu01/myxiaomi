SET NAMES UTF8;
DROP DATABASE IF EXISTS xiaomi;
CREATE DATABASE xiaomi CHARSET=UTF8;
USE xiaomi;


/**所有分类**/
CREATE TABLE category(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  cname VARCHAR(32)
);
insert into category values 
('1000','手机 手机卡'),
('1001','电视 盒子'),
('1002','笔记本 显示器'),
('1003','家电 插线板'),
('1004','出行 穿戴'),
('1005','智能 路由器'),
('1006','电源 配件'),
('1007','健康 儿童'),
('1008','耳机 音箱'),
('1009','生活 箱包');
/**大分类下的小分类**/
CREATE TABLE category_list(
  lid INT PRIMARY KEY AUTO_INCREMENT,
  lname VARCHAR(32),
  clid INT,
  img_sr VARCHAR(256),
  FOREIGN KEY(clid) REFERENCES category(cid)
);
