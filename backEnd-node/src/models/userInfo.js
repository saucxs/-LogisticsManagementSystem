const {query} = require('../utils/db');

/*注册用户-未激活*/
let insertUser= function (value) {
    let sql = "insert into user_info(name, password, email, role, activate, activateCode) values(?,?,?,?,?,?)"
    return query(sql, value)
}

/*注册用户-激活*/
let activateUser= function (activate, activateDate, email) {
    console.log(activate, email, 'activateCode--------------------')
    let sql = "update user_info SET activate = ?, activateDate = ? WHERE email = ? "
    return query(sql, [activate, activateDate, email])
}

/*通过activateCode查找用户信息 user_info*/
let findDataByActivateCode = function(activateCode) {
    let _sql = 'SELECT * FROM user_info WHERE activateCode= ? '
    return query(_sql, activateCode)
}
/*通过用户名查找用户信息 user_info*/
let findDataByName = function(name) {
    let _sql = 'SELECT * FROM user_info WHERE name= ? '
    return query(_sql, name)
}

// 通过用户名查找用户信息 user_info 不包括密码
let findUIByName = function(name) {
    let _sql = 'SELECT id ,name ,sex,avator,place,github FROM user_info WHERE name = ? '
    return query(_sql, name)
}

// 通过用户id查找用户信息 user_info 包括用户名，性别，头像，最后登录时间，状态等，不包括密码
let getUserInfo = (user_id) => {
    const _sql =
        'SELECT id AS user_id, name ,sex ,avator,place ,website,github,intro,status FROM user_info   WHERE  user_info.id =? '
    return query(_sql, [user_id]);
}

// 通过要查看的用户id 查询是否是本机用户的好友  如果是 返回user_id 和 remark 备注
let isFriend = (user_id, other_user_id, is_show) => {
    const _sql =
        'SELECT  * FROM user_user_relation  AS u WHERE  u.user_id = ? AND u.other_user_id = ? AND u.is_show = ? '
    return query(_sql, [user_id, other_user_id, is_show]);
}
// 加为好友 单方面
let addAsFriend = (user_id, other_user_id, time, is_show) => {
    const _sql =
        'INSERT INTO user_user_relation(user_id,other_user_id,time,is_show) VALUES (?,?,?,?)'
    return query(_sql, [user_id, other_user_id, time, is_show]);
}

// 删除好友
let delFriend = (is_show, user_id, other_user_id) => {
    const _sql =
        'UPDATE user_user_relation SET is_show = ? WHERE user_id = ? AND other_user_id = ?'
    return query(_sql, [is_show, user_id, other_user_id]);
}

//修改备注
let editorRemark = (remark, user_id, other_user_id, is_show) => {
    const _sql =
        'UPDATE  user_user_relation  SET remark = ?  WHERE  user_id = ? AND other_user_id = ? AND is_show = ?'
    return query(_sql, [remark, user_id, other_user_id, is_show]);
}

//修改我的信息
let editorInfo = function(data) {
    let _sql = ' UPDATE  user_info SET github = ?,website = ?,sex = ?,place = ? WHERE id = ? ; '
    return query(_sql, data)
}



module.exports = {
    insertUser,
    activateUser,
    findDataByName,
    findDataByActivateCode,
    findUIByName,
    getUserInfo,
    isFriend,
    addAsFriend,
    editorRemark,
    delFriend,
    editorInfo
}
