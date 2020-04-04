var express = require('express');
var app = express();
var session = require('express-session');
var sql = require("mssql");
var fs = require('fs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
let multer = require("multer");
let path = require("path");
let dayjs = require("dayjs")
var config = {
    user: 'hoanganh1',
    password: 'nhatle12',
    server: 'localhost',
    database: 'hoanganh'
};
var config1 = {
    user: 'hoanganh1',
    password: 'nhatle12',
    server: 'localhost',
    database: 'anh'
};
const Sequelize = require('sequelize')
const sequelize = new Sequelize({
    dialect: 'mssql',
    database: 'hoanganh',
    username: 'hoanganh1',
    host: 'localhost',
    port: '1433',
    password: 'nhatle12',
    logging: true,
})
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
// var bcrypt = require('bcrypt')
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/shirt/abcabc', function (req, res, next) {
    var body = req.body;
    // console.log(body);

    res.send("body");
    //  var sql1 = "insert into khachhang values ("+"'"+body.name+"'"+","+"'"+body.username+"'"+","+"'"+body.password+"'"+ ");" +"create table "+body.username+" (id int, ten varchar(50));";
    //  sequelize.query(sql1);
});
app.get('/data', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query('select * from Khachhang ', function (err, recordset) {
            sql.close();
            res.json(recordset.recordsets[0]);
            console.log(res.json(recordset.recordsets[0]))
        });
    });
});


app.post('/datageneral', function (req, res) {
    var body=req.body.name
    var order
    if (req.body.order!==undefined) order=req.body.order
    console.log(req.body)
    var sql="select * from products where (";
    for (var i=0;i<body.length;i++){
        if (i!==(body.length-1)){
            sql=sql+"Link like '"+body[i]+"%' or "
        } else {
            sql=sql+"Link like '"+body[i]+"%') "
            sql=sql+order
            // console.log(order)
        }
    }
    console.log(sql)
    sequelize.query(sql, { type: sequelize.QueryTypes.SELECT})
    .then(users => {
    // console.log(users)
    res.send(users)
    })
});

app.get('/products', function (req, res) {
    sequelize.query("select Products.active,Products.id,Products.Name,Products.Price,Products.NewPrice,Products.Link,Products.Description,Products.name_kodau,kho.sizeS,kho.sizeM,kho.sizeL from Products inner join kho on kho.id=Products.id ;", { type: sequelize.QueryTypes.SELECT})
    .then(users => {
    // console.log(users)
    res.send(users)
    })
});
app.post("/getproduct",function(req,res){
    var link=req.body.link;
    sequelize.query("select Products.active,Products.id,Products.Name,Products.Price,Products.NewPrice,Products.Link,Products.Description,Products.name_kodau,kho.sizeS,kho.sizeM,kho.sizeL from Products inner join kho on kho.id=Products.id where Link='"+link+"'", { type: sequelize.QueryTypes.SELECT})
    .then(user=>{
        res.send(user)
    })
})

sequelize.query("select Link from products;", { type: sequelize.QueryTypes.SELECT})
    .then(users => {
    // console.log(users);
    users.map((menu, index) => {
        var path = '/anh/';
        var    path1 = path + menu.Link+'_1';
        var    path2 = path + menu.Link+'_2';
        var    path3 = path + menu.Link+'_3';
        var    path4 = path + menu.Link+'_4';
        var    path5 = path + menu.Link+'_5';
        var link1 = '/anh/' + menu.Link +'_1'+ '.jpg';
        var link2 = '/anh/' + menu.Link +'_2'+ '.jpg';
        var link3 = '/anh/' + menu.Link +'_3'+ '.jpg';
        var link4 = '/anh/' + menu.Link +'_4'+ '.jpg';
        var link5 = '/anh/' + menu.Link +'_5'+ '.jpg';

        app.get(path1, function (req, res) {
            res.sendFile(__dirname + link1);
        })
        app.get(path2, function (req, res) {
            res.sendFile(__dirname + link2);
        })
        app.get(path3, function (req, res) {
            res.sendFile(__dirname + link3);
        })
        app.get(path4, function (req, res) {
            res.sendFile(__dirname + link4);
        })
        app.get(path5, function (req, res) {
            res.sendFile(__dirname + link5);
        })
    })
    })


app.get('/anh/banner3', function (req, res) {
    res.sendFile(__dirname + "/anh/banner.jpg");
});
app.get('/92vay', function (req, res) {
    res.sendFile(__dirname + "/anh/92vay.jpg");
});
app.get('/92quan', function (req, res) {
    res.sendFile(__dirname + "/anh/92quan.jpg");
});
app.get('/anh', function (req, res) {
    res.sendFile(__dirname + "/anh/logo.jpg");
});
app.use(express.static('anh'));
app.get('/logo', function (req, res) {
    res.sendFile(__dirname + "/anh/logo.png");
});
app.get('/anh/menu-ao-92w', function (req, res) {
    res.sendFile(__dirname + "/anh/menu-ao-92w.jpg");
});
app.get('/anh/banner2', function (req, res) {
    res.sendFile(__dirname + "/anh/banner2.jpg");
});
app.get('/anh/banner4', function (req, res) {
    res.sendFile(__dirname + "/anh/80.jpg");
});
app.get('/anh/ao', function (req, res) {
    res.sendFile(__dirname + "/anh/ao.jpg");
});
app.get('/anh/nhom', function (req, res) {
    res.sendFile(__dirname + "/anh/nhom.jpg");
});
app.get('/anh/thay', function (req, res) {
    res.sendFile(__dirname + "/anh/thay.jpg");
});
app.get('/anh/thay1', function (req, res) {
    res.sendFile(__dirname + "/anh/thay1.jpg");
}); 
app.get('/anh/duc', function (req, res) {
    res.sendFile(__dirname + "/anh/duc.jpg");
});
app.get('/anh/tra', function (req, res) {
    res.sendFile(__dirname + "/anh/tra.jpg");
});
app.get('/anh/dat', function (req, res) {
    res.sendFile(__dirname + "/anh/dat.jpg");
});
app.get('/anh/hoanganh', function (req, res) {
    res.sendFile(__dirname + "/anh/hoanganh.jpg");
});
app.get('/anh/quan', function (req, res) {
    res.sendFile(__dirname + "/anh/quan.jpg");
});
app.get('/anh/vay', function (req, res) {
    res.sendFile(__dirname + "/anh/vay.jpg");
});
app.get('/anh/banner-web-92_1', function (req, res) {
    res.sendFile(__dirname + "/anh/banner-web-92_1.jpg");
});
app.get('/logo1', function (req, res) {
    res.sendFile(__dirname + "/anh/logo1.png");
});
app.get('/bct', function (req, res) {
    res.sendFile(__dirname + "/anh/bct.jpg");
});
app.get('/anh/111', function (req, res) {
    res.sendFile(__dirname + "/anh/2.jpg");
});


app.use(passport.initialize());
app.use(session({
    secret: "mysecret",
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 1000 * 60*60*24
    }
}))
app.use(passport.session());

app.post('/login1', (req, res)=> {
    body=req.body;
    
    sequelize.query("SELECT * FROM khachhang", { type: sequelize.QueryTypes.SELECT})
    .then(users => {
    console.log(users)
    const db=users;
    const userabc= db.find(user => user.username == body.username);
    console.log(userabc)
    if (userabc && userabc.password == body.password ) {
        req.session.username = req.body.username;
        req.session.name=userabc.name;
        return res.send("thanh cong")
        } else { 
            req.session.username = undefined ;
            req.session.name = undefined ;
            res.send("that bai")
                }
    })
});
app.post('/loginadmin', (req, res)=> {
    body=req.body;
    sequelize.query("SELECT * FROM admin1", { type: sequelize.QueryTypes.SELECT})
    .then(users => {
    console.log(users)
    const db=users;
    const userabc= db.find(user => user.username == body.username);
    console.log(userabc)
    if (userabc && userabc.password == body.password ) {
        req.session.usernameadmin = req.body.username;
        // req.session.name=userabc.name;
        console.log(req.session.usernameadmin,'aaa',req.session.username)
        return res.send("thanh cong")
        } else { 
            req.session.usernameadmin = undefined ;
            // req.session.name = undefined ;
            console.log(session.session)
            res.send("that bai")
                }
    })
    
});

app.post('/search',(req,res)=>{

     search=req.body.search;
    // var abc=search;
    // console.log("b:",abc)
    app.get('/search2', (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        // console.log("b1:",search)
        if (search)  {
            res.send(search) 
            // console.log("a:",search)
            return
        }
            else res.send('ALL');
    })
    app.get('/search1', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        sequelize.query("select * from products where ( Name LIKE N'%"+search+"%' or name_kodau like N'%"+search+"%');", { type: sequelize.QueryTypes.SELECT})
        .then(users => {
            // console.log(search)
            if (users) return res.send(users) 
            else res.send('');
        
        })
    
})
res.send("a")
})
app.post('/create', (req, res)=> {
    var body = req.body;
    sequelize.query("SELECT * FROM khachhang", { type: sequelize.QueryTypes.SELECT})
    .then(users => {
    console.log(users)
    const db=users;
    const userabc= db.find(user => user.username == body.username);
    // console.log(userabc)
    if (userabc && userabc.password == body.password ) {
        return res.send("that bai")
        } else { 
            var sql1 = "insert into khachhang values (" + "N'" + body.name + "'" + "," + "'" + body.username + "'" + "," + "'" + body.password + "'" + ");" ;
            // var sql1="insert into khachhang values ( 'name')"
            sequelize.query(sql1);
            req.session.username = body.username;
            req.session.name=body.name;
            // console.log(req.session);   
            // console.log(body);
            res.send("thanh cong")
                }
    })
    
});
app.get('/test', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    if (req.session.username) return res.send(req.session.username) 
        else res.send('chua dang nhap');
})
app.get('/testadmin', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    if (req.session.usernameadmin) return res.send(req.session.usernameadmin) 
        else res.send('chua dang nhap');
})
app.get('/test1', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');  
    // console.log('b',req.session)
    if (req.session.name) return res.send(req.session.name) 
        else res.send('chua dang nhap');
})
app.get('/logout',(req,res)=>{
    req.session.username=undefined;
    req.session.name=undefined;
    res.send("dang xuat")
})
sequelize.authenticate()
    .then(function () {
        console.log('adad')
    })
app.post("/add",(req,res)=>{
    var body = req.body;
    sequelize.query("select order2.username,order2.id,order2.soluong,order2.size,Products.Name,Products.NewPrice,Products.Link from order2 inner join Products on order2.id=Products.id where ( order2.username='"+req.session.username+"' and order2.id="+body.id+" and order2.size='"+body.size+"');", { type: sequelize.QueryTypes.SELECT})
    .then(users => {
    // console.log(users.length)
    // console.log('a')
    const db=users;
    // c
    if (db.length>0){
            var sql1 = "UPDATE order2 set soluong=soluong+"+body.soluong+" where (username='"+ req.session.username+ "' and id="+body.id+" and size='"+body.size+"');" ;
            sequelize.query(sql1);
            return;
        } else {
        var sql1 = "insert into order2 values (" + "N'" + req.session.username + "'" + "," + "'" + body.id + "'" + "," + "'" + body.soluong + "'," + "'" + body.size + "'" +");" ;
        sequelize.query(sql1);
    }
    
    })
    
})
let diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "anh");
    },
    filename: (req, file, callback) => {
      let math = ["image/png", "image/jpeg"];
      if (math.indexOf(file.mimetype) === -1) {
        let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
        return callback(errorMess, null);
      }
      let filename = `${file.originalname}`;
      callback(null, filename);
    }
  });
  
  let uploadFile = multer({storage: diskStorage}).array("file");

app.post('/addproduct',(req,res)=>{
    var body=req.body;
    console.log(body)
    sequelize.query("insert into Products values (N'"+body.Name+"',"+body.Price+","+body.NewPrice+",'"+body.Link+"',N'"+body.Description+"','"+body.name_kodau+"',1)")
    res.send("thanhcong")
})
app.post('/addkho',(req,res)=>{
    var body=req.body;
    sequelize.query("select id from Products where Link='"+body.Link+"'",{ type: sequelize.QueryTypes.SELECT})
    .then(users=>{
        console.log(users[0].id);
        sequelize.query("insert into kho values ("+users[0].id+","+body.slS+","+body.slM+","+body.slL+")")
    })
    res.send("thanhcong")
})
app.post("/addimg1",(req,res)=>{
    // console.log(req)
    uploadFile(req, res, (error) => {
        // Nếu có lỗi thì trả về lỗi cho client.
        // Ví dụ như upload một file không phải file ảnh theo như cấu hình của mình bên trên
        // if (error) {
        //   return res.send(`Error when trying to upload: ${error}`);
        // }
        console.log(req.files)
        
        req.files.map((menu, index) => {
            var length=menu.filename.length;
            var link="/anh/"+menu.filename.slice(0,length-3)
            var link1="/anh/"+menu.filename
            // res.sendFile(path.join(`${__dirname}/anh/${menu.filename}`));
            app.get(link, function (req, res) {
                res.sendFile(__dirname + link1);
            })
        })
        
      });
    //   res.send("thanh cong")
})
// app.get('/orderadmin1', (req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     var data=req.session.orderadmin;
//     console.log('a:',data,'aa',req.session)
//     if (data) return res.send(data) 
//     // else res.send('a')
//         else {
//             // var today=new Date();
//             var now=dayjs();
//             var date=now.format("YYYY-MM-DD")
//             var tomorow=now.add(1,"day").format("YYYY-MM-DD");
//             // console.log(date,'  ',tomorow);
//             // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//             // var tomorow = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
//             var data={data:[],time:[]}
//                 sequelize.query("select history.username,history.id,history.soluong,history.size,history.time,Products.Name,Products.NewPrice,Products.Link from history join Products on history.id=Products.id where history.timenhan>='"+date+"' and history.timenhan<'"+tomorow+"'", { type: sequelize.QueryTypes.SELECT})
//                 .then(users => {
//                 // res.send(data)
//                 data.data=users
//                 sequelize.query("select DISTINCT time,username from history where timenhan>='"+date+"' and time<'"+tomorow+"' order by time ", { type: sequelize.QueryTypes.SELECT})
//                 .then(users => {
//                 data.time=users
//                 res.send(data);
//                 // console.log(data)
//                 })    
//             })
//             };    
// })

app.get('/orderadmin2', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    var data=req.session.orderadmin;
    // console.log('a:',data,'aa',req.session)
    if (data) return res.send(data) 
    // else res.send('a')
        else {
            // var today=new Date();
            // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            // var tomorow = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
            var data={data:[],time:[]}
                sequelize.query("select order_confirm.username,order_confirm.id,order_confirm.soluong,order_confirm.size,order_confirm.time,Products.Name,Products.NewPrice,Products.Link from order_confirm join Products on order_confirm.id=Products.id ", { type: sequelize.QueryTypes.SELECT})
                .then(users => {
                // res.send(data)
                data.data=users
                sequelize.query("select DISTINCT time,username from order_confirm ", { type: sequelize.QueryTypes.SELECT})
                .then(users => {
                data.time=users
                res.send(data);
                // console.log(data)
                })    
            })
            };    
})
app.get('/newproduct',(req,res)=>{
    var data=[];
    sequelize.query("SELECT top(6) id FROM [hoanganh].[dbo].[history] group by id order by sum(soluong) desc",{type : sequelize.QueryTypes.SELECT})
    .then(users=>{
        users.map((user,index)=>{
            sequelize.query("select * from products where id="+user.id,{type:sequelize.QueryTypes.SELECT}).then(
                users1=>{
                    data[index]=users1[0];
                    // console.log(users1[0])
                    if (index==5){res.send(data)}
                }
            )
        })

    })
})
app.post('/revenue13', (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    var month=req.body.thang;
    // console.log(res.body)
    // var today=new Date;
    // var month=today.getMonth()+1;
    sequelize.query("select history.soluong,Products.NewPrice,day(history.time) as day from history join Products on history.id=Products.id where MONTH(history.time)="+month, { type: sequelize.QueryTypes.SELECT})
    .then(users => {
        var tong=[0,0,0,0,0,0];
        users.map((user,index)=>{
            if (user.day<=5){
                tong[0]=tong[0]+user.soluong*user.NewPrice;
            } else if (user.day<=10){
                tong[1]=tong[1]+user.soluong*user.NewPrice;                   
            } else if (user.day<=15){
                tong[2]=tong[2]+user.soluong*user.NewPrice;
            } else if (user.day<=20){
                tong[3]=tong[3]+user.soluong*user.NewPrice;                   
            }else if (user.day<=25){
                tong[4]=tong[4]+user.soluong*user.NewPrice;
            } else {
                tong[5]=tong[5]+user.soluong*user.NewPrice;
            }
        })
        res.send(tong)
    })    
})
app.post('/orderadmin',(req,res)=>{
    var body=req.body;
    // console.log(body);
        var date = body.date;
        var tomorow = body.tomorow;
        var data={data:[],time:[]}
        // if ()
            sequelize.query("select history.username,history.id,history.soluong,history.size,history.time,history.timenhan,Products.Name,Products.NewPrice,Products.Link from history join Products on history.id=Products.id where history.timenhan>='"+date+"' and history.timenhan<'"+tomorow+"'", { type: sequelize.QueryTypes.SELECT})
            .then(users => {
            data.data=users
                sequelize.query("select DISTINCT time,timenhan,username from history where timenhan>='"+date+"' and timenhan<'"+tomorow+"' order by time ", { type: sequelize.QueryTypes.SELECT})
                .then(users => {
                data.time=users;
            res.send(data);

                })    
            })
})
app.post('/repairproduct',(req,res)=>{
    var body=req.body;
    // console.log(body)
    // sequelize.query("insert into Products values (N'"+body.Name+"',"+body.Price+","+body.NewPrice+",'"+body.Link+"',N'"+body.Description+"','"+body.name_kodau+"')")
    var n="update Products set Name=N'"+body.Name+"',Price="+body.Price+",NewPrice="+body.NewPrice+",Link='"+body.Link+"',Description=N'"+body.Description+"',name_kodau='"+body.name_kodau+"' where id="+body.id +";";
    n=n+" update kho  set sizeS="+body.slS+",sizeM="+body.slM+",sizeL="+body.slL+" where id="+body.id+";"
    sequelize.query(n);
    res.send("thanh cong")
})
app.post('/confirmorder',(req,res)=>{
    console.log(req.body)
    var body=req.body.time;
    sequelize.query("select id,soluong,size from order_confirm  where (username='"+body.username+"' and time='"+body.time+"')", { type: sequelize.QueryTypes.SELECT})
    .then(users => {
            users.map((user,index)=>{
                var size="size"+user.size; 
                sequelize.query("update kho set "+size+"="+size+"-"+user.soluong+" where id="+user.id )
            })
    console.log(users)
})
    sql="update order_confirm set timenhan=GETDATE() where time='"+body.time +"'; insert into history select * from order_confirm where (username='"+body.username+"' and time='"+body.time+"');delete from order_confirm where (username='"+body.username+"' and time='"+body.time+"')"
    sequelize.query(sql)
    // sequelize.query("insert into history select * from order_confirm where (username='"+body.username+"' and time='"+body.time+"')")
    // sequelize.query("delete from order_confirm where (username='"+body.username+"' and time='"+body.time+"')")
    
    
})

app.post("/deleteP",(req,res)=>{
    var body=req.body
    console.log(body)
    var link1='./anh/'+body.link+"_1.jpg"
    var link2='./anh/'+body.link+"_2.jpg"
    var link3='./anh/'+body.link+"_3.jpg"
    var link4='./anh/'+body.link+"_4.jpg"
    var link5='./anh/'+body.link+"_5.jpg"
    var arr=[link1,link2,link3,link4,link5]
    arr.map((user,index)=>{
        fs.unlink(user, function (err) {
            // if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        });
    })
    sequelize.query("delete from Products where id="+body.id+"; delete from kho where id="+body.id+";")
    res.send("thang cong")
    
})
app.post("/activeP",(req,res)=>{
    var body=req.body;
    console.log(body)
    var active=Math.abs(body.active-1);
    sequelize.query("update Products set active="+active+" where id="+body.id)
    res.send("thanh cong")

})
app.post('/update', (req, res)=> {
    body=req.body;
    res.send(body)
    // sequelize.query("delete from order2 where username='"+req.session.username+"';");
    // body.map()
    body.data.map((menu, index) => {
        if (menu.soluong<=0) {
            var sql1 = "delete from order2 where ( username='"+ req.session.username+ "' and id="+menu.id+" and size='"+menu.size+"')" ;
            sequelize.query(sql1);
        } else {
        var sql1 = "update order2 set soluong="+menu.soluong+" where id="+menu.id;
        sequelize.query(sql1);
        }
    })
});
app.post('/thanhtoan', (req, res)=> {
    body=req.body.data;
    console.log(body)
    sql1="insert into order_confirm(username,id,soluong,size,time) values"
    // res.send(body)
    var menu=body;
    var d=0;
    for (var i=0;i<=menu.length-1;i++) {
        if (menu[i].soluong>0){
           d=d+1;
        }
    }
    if (d==1){
        for (var i=0;i<=menu.length-1;i++) {
            if (menu[i].soluong>0){
                    sql1=sql1+ "('" + menu[i].username + "'" + "," + "'" + menu[i].id + "'" + "," + "'" + menu[i].soluong + "'," + "'" + menu[i].size + "', GETDATE() " +");" ;
                }
            }
        }
     else {
        for (var i=0;i<=menu.length-1;i++) {
            if (menu[i].soluong>0){
                if (i!=menu.length-1){
                    sql1=sql1+ "('" + menu[i].username + "'" + "," + "'" + menu[i].id + "'" + "," + "'" + menu[i].soluong + "'," + "'" + menu[i].size + "', GETDATE() " +")," ;
                } else {
                    sql1=sql1+ "('" + menu[i].username + "'" + "," + "'" + menu[i].id + "'" + "," + "'" + menu[i].soluong + "'," + "'" + menu[i].size + "', GETDATE() " +");" ;
                }
            }
        }
    }
    sequelize.query(sql1);
});
app.post('/clear', (req, res)=> {
    body=req.body;
    res.send(body)
    sequelize.query("delete from order2 where username='"+req.session.username+"';");

});
app.post('/delete', (req, res)=> {
    body=req.body;
    res.send(body)
    sequelize.query("delete from order2 where username='"+req.session.username+"'"+" and id="+body.id+" and size='"+body.size+"';");

});
// console.log(session);
app.post('/user', (req, res) => {
    var body = req.body;
    var email = body.email;
    var password = body.password;
    res.send(body);
});
app.get('/order', function (req, res) {
    sequelize.query("select order2.username,order2.id,order2.soluong,order2.size,Products.Name,Products.NewPrice,Products.Link from order2 inner join Products on order2.id=Products.id where order2.username='"+req.session.username+"';", { type: sequelize.QueryTypes.SELECT})
    .then(users => {
        res.send(users)
    // console.log(users)
});
});
app.get('/order1', function (req, res) {
    sequelize.query("select order2.username,order2.id,order2.soluong,order2.size,Products.Name,Products.NewPrice,Products.Link from order2 inner join Products on order2.id=Products.id where order2.username='"+req.session.username+"';", { type: sequelize.QueryTypes.SELECT})
    .then(users => {
        res.send(users)
    // console.log(users)
});
});
// sequelize.query("select * from history  ", { type: sequelize.QueryTypes.SELECT})
//     .then(users => {
//         // res.send(users)
//     // console.log(users)
    
//     users.map((time,index)=>{
//         var time1=dayjs(time.time).format('YYYY-MM-DD HH:mm:ss')
//         var tomorow1=dayjs(time1).add(1, 'day').format('YYYY-MM-DD HH:mm:ss');
//         // sequelize.query("insert into time values('"+tomorow1+"');");
//         sql="insert into time values ('"+time.username+"',"+time.id+","+time.soluong+",'"+time.size+"','"+tomorow1+"')";
//         console.log(sql);
//         sequelize.query(sql);
//         console.log(time.time);
//     })
// });
app.get('/history1', function (req, res) {
    sequelize.query("select history.username,history.id,history.soluong,history.size,history.time,Products.Name,Products.NewPrice,Products.Link from history join Products on history.id=Products.id where history.username='"+req.session.username   +"';", { type: sequelize.QueryTypes.SELECT})
    .then(users => {
        res.send(users)
    // console.log(users)
    });
});
app.get('/history_time', function (req, res) {
    sequelize.query("select DISTINCT time from history where username='"+req.session.username   +"' order by time desc;", { type: sequelize.QueryTypes.SELECT})
    .then(users => {
        res.send(users)
    // console.log(users)
    });
});
app.get('/order_confirm1', function (req, res) {
    sequelize.query("select order_confirm.username,order_confirm.id,order_confirm.soluong,order_confirm.size,order_confirm.time,Products.Name,Products.NewPrice,Products.Link from order_confirm join Products on order_confirm.id=Products.id where order_confirm.username='"+req.session.username   +"';", { type: sequelize.QueryTypes.SELECT})
    .then(users => {
        res.send(users)
    // console.log(users)
    });
});
app.get('/order_confirm1_time', function (req, res) {
    sequelize.query("select DISTINCT time from order_confirm where username='"+req.session.username   +"' order by time desc;", { type: sequelize.QueryTypes.SELECT})
    .then(users => {
        res.send(users)
    // console.log(users)
    });
});
app.listen(process.env.port || 4000, function () {
    console.log('Server is running..on Port 4000');
});