/**
 * Created by ane on 12/5/14.
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'tianji',
    password: 'tianji',
    database:'tianji',
    port: 3306
});
var selectSQL = 'SELECT * FROM ceos ';
var insertSQL2 = 'update corp_backs set photo=? ,ceo_name=? ,ceo_position=? ,ceo_info=? where id =?';

pool.getConnection(function (err, conn) {
    if (err) console.log("POOL ==> " + err);

    conn.query(selectSQL,function(err,rows){
        if (err) console.log(err);
        console.log("INSERT RUTERN==> ");
        console.log(rows[0].id);
        for (var i=0; i<rows.length; i++){
            conn.query(insertSQL2,[rows[i].photo,rows[i].name,rows[i].position,rows[i].info,rows[i].id],function(err,row2s){
                if (err) console.log(err);
                console.log(row2s);
            });
        }
    });
    conn.release();
});
