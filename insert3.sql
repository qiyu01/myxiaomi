SET NAMES UTF8;
USE xiaomi;

/**商品类别**/
CREATE TABLE product_class(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  pname VARCHAR(32)
);
insert into product_class values 
(null,'手机'),
(null,'电视'),
(null,'显示器'),
(null,'家电'),
(null,'平板电脑'),
(null,'智能设备'),
(null,'耳机')
;