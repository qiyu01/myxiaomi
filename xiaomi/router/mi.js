const express = require('express');
//引入连接池模块
const pool = require('../pool.js');
//console.log(pool);
//创建路由器对象
const router = express.Router();
//往路由器对象添加路由


//获取category列表
router.get("/v1/category_restful", (req, res) => {
    // console.log(_uname + "~~~~~" + _upwd);
    var sql = "select * from category";
    pool.query(sql, [], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send("0");
        }
    });
});
router.get("/v1/category_list", (req, res) => {
    // console.log(_uname + "~~~~~" + _upwd);
    var sql = "select * from category_list";
    pool.query(sql, [], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send("0");
        }
    });
});



//使用用户名登录
router.get("/v1/login_restful/:uname&:upwd", (req, res) => {
    // 获取参数变量,看见冒号
    var _uname = req.params.uname;
    var _upwd = req.params.upwd;
    // console.log(_uname + "~~~~~" + _upwd);
    var sql = "select * from xiaomi_user where uname=? and upwd=?";
    pool.query(sql, [_uname, _upwd], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send("1");
        } else {
            var sql = "select * from xiaomi_user where email=? and upwd=?";
            pool.query(sql, [_uname, _upwd], (err, result) => {
                if (err) throw err;
                if (result.length > 0) {
                    res.send("1");
                } else {
                    var sql = "select * from xiaomi_user where phone=? and upwd=?";
                    pool.query(sql, [_uname, _upwd], (err, result) => {
                        if (err) throw err;
                        if (result.length > 0) {
                            res.send("1");
                        } else {
                            res.send("0");
                        }
                    });
                }
            });


        }
    });
});
//使用手机号码登录
router.get("/v1/get_verifycode/:uphone", (req, res) => {
    var _uphone = req.params.uphone;
    var sql = "select * from xiaomi_user where phone=?";
    pool.query(sql, [_uphone], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send("0");
        }
        // console.log(typeof(result));

    });
});

// 用户注册步骤1--输入手机号
router.get("/v1/register_restful/:uphone", (req, res) => {
    // 获取参数变量,看见冒号
    var _uphone = req.params.uphone;
    // var _upwd=req.params.upwd;
    //// console.log(_uphone+"~~~~~"+_upwd);
    var phone_exist = "select * from xiaomi_user where phone=?"

    pool.query(phone_exist, _uphone, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send("2");
        } else {
            var post = {
                uname: "null",
                upwd: "null",
                email: "null",
                phone: _uphone,
                verifycode: "1314"
            };
            var sql = "insert into xiaomi_user set ?";
            pool.query(sql, post, (err, result) => {
                if (err) throw err;
                if (result.affectedRows > 0) {
                    res.send("1");
                } else {
                    res.send("0");
                }
            });
        }
    });

});

//用户注册步骤2--通过输入的手机号获取验证码
router.get("/v1/register_verifycode/:uphone", (req, res) => {
    var _uphone = req.params.uphone;
    // var _uphone="18814127200";
    var sql = "select * from xiaomi_user where phone=?";
    pool.query(sql, [_uphone], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send("0");
        }
        // console.log(typeof(result));

    });
});

// 用户注册步骤3--确认密码
router.get("/v1/confirm_restful/:uname&:uphone&:upwd&:verifycode", (req, res) => {
    // 获取参数变量,看见冒号
    var _uname = req.params.uname;
    // console.log(_uname);
    var _uphone = req.params.uphone;
    var _upwd = req.params.upwd;
    var _verifycode = req.params.verifycode;
    // console.log(_uphone + "~~~~~" + _upwd);
    var post = {
        uname: _uname,
        upwd: _upwd,
        email: "phoneregister@qq.com",
        phone: _uphone,
        verifycode: _verifycode
    };
    var sql = `UPDATE xiaomi_user SET upwd=?,uname=? where phone=?`;
    pool.query(sql, [_upwd, _uname, _uphone], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send("1");
        } else {
            res.send("0");
        }
    });
});

//查询图片模块

router.get('/v1/searchPic/:pid', (req, res) => {
    let _pid = req.params.pid;
    //// console.log(req.params + '444444444444444444');//[object Object]444444444444444444

    let sql = 'select * from xiaomi_phone_pic where pid=?'
    pool.query(sql, [_pid], (err, result) => {
        if (err) throw err;
        res.send(result);
    })
});
//查询规格模块
router.get('/v1/searchEdi/:lid', (req, res) => {
    let _lid = req.params.lid;

    let sql = 'select * from xiaomi_phone where lid=?'
    pool.query(sql, [_lid], (err, result) => {
        if (err) throw err;
        res.send(result);
    })
});
//修改密码
router.put('/v1/update', (req, res) => {
    let _uname = req.body.uname;
    //// console.log(_uname);
    let _oldUpwd = req.body.oldUpwd;
    let _newUpwd = req.body.newUpwd;
    let _reUpwd = req.body.reUpwd;
    //// console.log(_reUpwd);
    pool.query('select * from xiaomi_user where uname=? and upwd=?', [_uname, _oldUpwd], (err, result) => {
        if (err) throw err;
        //console.log(result);

        if (result.length > 0) {
            pool.query('update xiaomi_user set upwd=? where uname=? ', [_reUpwd, _uname], (err, result) => {

                if (err) throw err;
                //console.log(result);
                if (result.changedRows > 0) {
                    res.send('1')
                } else {
                    res.send('2')
                }
            })
        } else {
            res.send('0')
        }
    });
});
//支付界面地址（活跃地址查询）
router.get('/v1/determineAdd/:uname', (req, res) => {
    let _uname = req.params.uname;
    // console.log(_uname);

    //// console.log(req.params + '444444444444444444');//[object Object]444444444444444444
    pool.query('select uid from xiaomi_user where uname=?', [_uname], (err, result) => {
        if (err) throw err;
        // res.send(result);
        let _uid = result[0].uid;
        //// console.log(_uid);


        let sql = 'select * from xiaomi_receiver_address where user_id=? and add_active=?'
        pool.query(sql, [_uid, '1'], (err, result) => {
            if (err) throw err;

            res.send(result);
        })

    })

});
//查询用户下所有的地址
router.get('/v1/searchAdd/:uname', (req, res) => {
    let _uname = req.params.uname;
    // console.log(_uname);

    //// console.log(req.params + '444444444444444444');//[object Object]444444444444444444
    pool.query('select uid from xiaomi_user where uname=?', [_uname], (err, result) => {
        if (err) throw err;
        // res.send(result);
        let _uid = result[0].uid;
        //// console.log(_uid);
        let sql = 'select * from xiaomi_receiver_address where user_id=? '
        pool.query(sql, [_uid], (err, result) => {
            if (err) throw err;

            res.send(result);
        })

    })

});
//查询订单
router.get('/v1/searchPro/:uname', (req, res) => {
    let _uname = req.params.uname;
    let arr = [];
    //// console.log(_uname);
    pool.query('select uid from xiaomi_user where uname=?', [_uname], (err, result) => {
        if (err) throw err;
        // res.send(result);
        if (result.length > 0) {
            let _uid = result[0].uid;
            //// console.log(_uid);
            pool.query('select product_id,p_id,count from xiaomi_shoppingcart_item where user_id=? and is_checked=?', [_uid, 1], (err, result) => {
                if (err) throw err;
                // //console.log(result);
                if (result.length > 0) {
                    pool.query(`SELECT pid,lid,price,title,spec,m1,pic_spec,count,(price*count) FROM xiaomi_phone,xiaomi_phone_pic,xiaomi_shoppingcart_item where lid=product_id and pid=p_id and user_id=? and is_checked=1;`, [_uid], (err, result) => {
                        if (err) throw err;
                        //console.log(result);
                        res.send(result);
                    })
                }
            })
        }
    })
});
//加入购物车模块
router.post('/v1/insert', (req, res) => {
    let _uname = req.body.uname;
    let _lid = req.body.lid;
    let _pid = req.body.pid;
    // console.log(_uname, _lid, _pid);
    // let _price = req.body.price;
    //// console.log(_lid, _pid + '*****');
    pool.query('select uid from xiaomi_user where uname=?', [_uname], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {

            //// console.log(result[0].uid);
            let _uid = result[0].uid;
            // console.log(_uid);

            //// console.log(_uid);
            //// console.log('***fsad');

            // //console.log(result);
            //// console.log(result.length);
            pool.query('select iid from xiaomi_shoppingcart_item where user_id=?', [_uid], (err, result) => {
                if (err) throw err;
                // console.log(result.length + '数量');
                if (result.length > 0) {
                    pool.query('select count from xiaomi_shoppingcart_item where product_id=? and p_id=? and user_id=? ', [_lid, _pid, _uid], (err, result) => {
                        if (err) throw err;
                        // //console.log(result);
                        //// console.log(result[0].count);
                        if (result.length > 0) {
                            let _count = result[0].count + 1;
                            // console.log(_count);
                            // let $lid = result[0].product_id;
                            // let $p_id = result[0].p_id;
                            // console.log('修改uid:' + _uid, _count);
                            pool.query('update xiaomi_shoppingcart_item set count=? where product_id=? and p_id=? and user_id=?', [_count, _lid, _pid, _uid], (err, result) => {
                                if (err) throw err;
                                // //console.log(result);
                                // console.log('修改成功');
                            });
                        } else {
                            // console.log('插入uid:' + _uid);
                            pool.query('insert into xiaomi_shoppingcart_item(user_id,product_id,p_id) values(?,?,?)', [_uid, _lid, _pid], (err, result) => {
                                if (err) throw err;
                                // //console.log(result);
                                // console.log('插入成功');
                            })
                        }
                    })
                } else {
                    pool.query('insert into xiaomi_shoppingcart_item(user_id,product_id,p_id) values(?,?,?)', [_uid, _lid, _pid], (err, result) => {
                        if (err) throw err;
                        // console.log('插入');
                        // //console.log(result);
                    })
                }
            });
        }
    })
});

// 查询购物车
// router.get('/v1/searchcart/:uname', (req, res) => {
//     let _uname = req.params.uname;
//    // console.log(_uname);


//     pool.query('select uid from xiaomi_user where uname=?', [_uname], (err, result) => {
//         if (err) throw err;
//         let _uid = result[0].uid;
//        // console.log(_uid);
//        // console.log('***');

//         pool.query('select product_id,p_id from xiaomi_shoppingcart_item where user_id=?', [_uid], (err, result) => {
//             if (err) throw err;

//             if (result.length > 0) {
//                 let sql = 'SELECT price, m1, spec, pic_spec, title, iid, user_id, product_id, p_id, count, is_checked FROM xiaomi_phone, xiaomi_shoppingcart_item, xiaomi_phone_pic where lid = product_id and pid = p_id and user_id=?';
//                 pool.query(sql, [_uid], (err, result) => {
//                     if (err) throw err;
//                     if (result.length == 0) {
//                         res.send('0');
//                     } else {
//                         res.send(result);
//                         // //console.log(result);
//                     }
//                 })
//             }
//         })


//     })
//    // console.log('***');

// });

// 查询购物车
router.get('/v1/searchcart/:uname', (req, res) => {
    let _uname = req.params.uname;
    // console.log(_uname);


    pool.query('select uid from xiaomi_user where uname=?', [_uname], (err, result) => {
        if (err) throw err;
        let _uid = result[0].uid;
        // console.log(_uid);
        // console.log('***');

        pool.query('select product_id,p_id from xiaomi_shoppingcart_item where user_id=?', [_uid], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                let sql = '(SELECT  iid, m1, spec, pic_spec, title, price, user_id, product_id, p_id, count, is_checked FROM xiaomi_phone, xiaomi_shoppingcart_item, xiaomi_phone_pic where lid = product_id and pid = p_id and user_id=?)ORDER BY iid ASC';
                pool.query(sql, [_uid], (err, result) => {
                    if (err) throw err;
                    if (result.length == 0) {
                        res.send('0');
                    } else {
                        res.send(result);
                        //console.log(result);
                    }
                })
            }
        })


    })


});


//删除购物车商品
router.delete('/v1/del/:iid', (req, res) => {

    let str = req.params.iid;
    let arr = str.split('&')
    var $iid = arr[0];
    let $uname = arr[1];
    console.log('*****');

    console.log($iid, $uname);
    console.log('*****');
    pool.query('select uid from xiaomi_user where uname=?', [$uname], (err, result) => {
        if (err) throw err;
        // res.send(result);

        let $uid = result[0].uid;
        console.log($uid);

        pool.query('select  iid from  xiaomi_shoppingcart_item where user_id=?', [$uid], (err, result) => {
            if (err) throw err;
            $iidr = result[0].iid;
            // console.log($iidr);
            var $iid = arr[0];
            var $iid = parseInt($iid) + parseInt($iidr) - 1;
            console.log($iid);

            let sql = 'DELETE FROM xiaomi_shoppingcart_item WHERE iid=? and user_id=?';
            pool.query(sql, [$iid, $uid], (err, result) => {
                if (err) throw err;
                if (result.affectedRows > 0) {
                    res.send('1');
                    // console.log('删除成功');
                } else {
                    res.send('0');
                }
            });

        })
    })
});


//插入地址
router.post('/v1/insertAdd', (req, res) => {
    let _uname = req.body.uname;
    // console.log(_uname);
    pool.query('select uid from xiaomi_user where uname=?', [_uname], (err, result) => {
        if (err) throw err;
        // res.send(result);
        let _uid = result[0].uid;

        //// console.log(req.body);
        let receiver = req.body.receiver;
        let cellphone = req.body.cellphone;
        let address = req.body.address;
        let province = req.body.province;
        let city = req.body.city;
        let county = req.body.county;

        pool.query('insert into xiaomi_receiver_address(user_id,receiver,cellphone,address,province,city,county) values(?,?,?,?,?,?,?)', [_uid, receiver, cellphone, address, province, city, county], (err, result) => {
            if (err) throw err;
            //console.log(result);

        })

    });

});
//结算页面地址（订单寄到地址）
router.put('/v1/insertAddr', (req, res) => {
    let _uname = req.body.uname;

    // console.log(_uname);
    // var _aid = req.body.aid;
    //// console.log('******+++++++++********');
    //// console.log(_aid);
    //// console.log(_uname, _aid);
    pool.query('select uid from xiaomi_user where uname=?', [_uname], (err, result) => {
        if (err) throw err;
        // //console.log(result);
        //// console.log(result[0].uid);
        var _uid = result[0].uid;
        //// console.log(_uid);
        //// console.log('uid');
        pool.query('select  aid from xiaomi_receiver_address where user_id=?', [_uid], (err, result) => {
            if (err) throw err;
            // console.log(result[0].aid);
            var _aid = req.body.aid;
            //// console.log(_aid);
            var _aidr = parseInt(result[0].aid) + parseInt(_aid) - 1;
            //// console.log(_aidr);
            // update xiaomi_receiver_address set add_active = 0 where user_id = 1;
            pool.query('update xiaomi_receiver_address set add_active=? where user_id=?', [0, _uid], (err, result) => {
                if (err) throw err;
                pool.query('update xiaomi_receiver_address set add_active=? where aid=? and user_id=? ', [1, _aidr, _uid], (err, result) => {
                    if (err) throw err;
                    // //console.log(result);
                    if (result.changedRows > 0) {
                        res.send('1')
                    } else {
                        res.send('0')
                    }
                })
            })
        });



    })

});

// 根据复选按钮选中情况改变数据库的is_checked值
router.put('/v1/allupd/:uname', (req, res) => {
    let _uname = req.params.uname;
    pool.query('select uid from xiaomi_user where uname=?', [_uname], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            // res.send(result);
            let _uid = result[0].uid;
            //// console.log(_uname);
            let $is_checked = req.body.is_checked;
            let sql = 'update xiaomi_shoppingcart_item set is_checked=? where user_id=?'
            pool.query(sql, [$is_checked, _uid], (err, result) => {
                if (err) throw err;

                if (result.changedRows > 0) {
                    res.send('1');
                    //// console.log('修改is_check成功');
                } else {
                    res.send('0');
                }
            })
        }

    })


});

//复选框请求改变is_checked
router.put('/v1/upd', (req, res) => {
    let $uname = req.body.uname;
    // console.log($uname);

    let $is_checked = req.body.is_checked;
    // console.log('----------');

    // console.log($is_checked);
    // console.log('----------');
    let $count = req.body.count;
    pool.query('select uid from xiaomi_user where uname=?', [$uname], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            // res.send(result);
            let _uid = result[0].uid;
            let $is_checked = req.body.is_checked;
            pool.query('select iid  from xiaomi_shoppingcart_item where user_id=?', [_uid], (err, result) => {
                let $iidr = req.body.iid;

                var $iid = parseInt(result[0].iid) + parseInt($iidr) - 1;

                pool.query('update xiaomi_shoppingcart_item set count=?,is_checked=? where iid=? ', [$count, $is_checked, $iid], (err, result) => {
                    if (err) throw err;
                    //// console.log(99);
                    if (result.changedRows > 0) {
                        res.send('1')
                            //// console.log(88);
                    } else {
                        res.send('0')
                    }
                })
            })
        }
    })
});

router.put('/v1/upcount', (req, res) => {
    let $uname = req.body.uname;
    // let $iid = req.body.iid;
    let $count = req.body.count;
    console.log('******');
    console.log($uname, $count);

    console.log('******');

    pool.query('select uid from xiaomi_user where uname=?', [$uname], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            let $uid = result[0].uid;
            pool.query('select iid  from xiaomi_shoppingcart_item where user_id=?', [$uid], (err, result) => {
                if (err) throw err;
                let $iidr = req.body.iid;
                console.log($iidr);

                let $iid = parseInt(result[0].iid) + parseInt($iidr) - 1;
                pool.query('update xiaomi_shoppingcart_item set count=? where iid=? ', [$count, $iid], (err, result) => {
                    if (err) throw err;
                    // console.log(result);

                    // console.log(99);
                    if (result.affectedRows > 0) {
                        pool.query(' select count from xiaomi_shoppingcart_item where user_id=? and iid=?', [$uid, $iid], (err, result) => {
                            if (err) throw err;
                            console.log(result);
                            res.send(result)
                        })
                    } else {
                        res.send('0')
                    }
                })
            })
        }
    })
});
//路由器对象导出
module.exports = router;