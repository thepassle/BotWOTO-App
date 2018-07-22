const express = require('express');
const router = express.Router();
const mysql = require('mysql');
// const socket = require('socket.io-client').connect('ws://botwoto.kujio.org:8086', {secure: true, reconnect: true, rejectUnauthorized: false});
const dotenv = require('dotenv');
const { parsed } = dotenv.config();
const utf8 = require('utf8');

var net = require('net');

var HOST = 'botwoto.kujio.org';
var PORT = 8086;


// HISTORY ENDPOINT:
// SELECT `command`, `reply`, `clearance`, `id`, `byUser`, `updatedAt` FROM `history` WHERE command='!anime' ORDER BY id DESC
// on click paper-item in list, open modal, do request
// beetje styling, beetje state management

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    charset: 'utf8mb4',
    multipleStatements: true
});

router.get('/history/:command', function(req, res) {
    console.log(req.params.command);
    db.getConnection(function(err, connection) {
        db.query('SELECT * FROM history WHERE command = ? ORDER BY id DESC', [req.params.command], function (error, results, fields) {
            connection.release();
            if (error) throw error;
            return res.send({ data: results });
        });
    });

});

router.get('/commands', function(req, res) {
	db.getConnection(function(err, connection) {
	    db.query('SELECT * FROM '+process.env.DATABASE_TABLE+' ORDER BY command ASC', function (error, results, fields) {
    	    connection.release();

	        if (error) throw error;
            if(req.session && req.session.passport && req.session.passport.user) {
                console.log(req.user);
    	        return res.send({ a: 'a', user: req.user, error: false, data: results, isLoggedIn: true });
            } else {
                console.log(req.user);
                return res.send({ b: 'b', user: req.user, error: false, data: results, isLoggedIn: false });
            }
	    });
    });

});

// Add a new command  
router.post('/commands', function (req, res) {
    const command = req.body.command;
    const reply = req.body.reply;
    const clearance = req.body.clearance;
    const user = req.body.user;

    if (!command || !reply || !clearance) {
        return res.status(400).send({ error:true, message: 'Please provide reply, command and clearance' });
    }

    var currentdate = new Date(); 
    var updatedAtDate = currentdate.getDate() + "-"
                    + (currentdate.getMonth()+1)  + "-" 
                    + currentdate.getFullYear() + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

    db.query("INSERT INTO "+process.env.DATABASE_TABLE+" (command, reply, clearance) VALUES (?, ?, ?); INSERT INTO history (command, reply, clearance, byUser, updatedAt) VALUES (?,?,?,?,?);", [command, reply, clearance, command, reply, clearance, user, updatedAtDate], function (error, results, fields) {
        if (error) throw error;
        console.log("sent:");
        console.log(utf8.encode(JSON.stringify({"action": 'add_command', "level": clearance, "trigger": command, "response": reply})));
        var client = new net.Socket();
        client.connect(PORT, HOST, function(){
            client.write(JSON.stringify({"action": 'add_command', "level": clearance, "trigger": command, "response": reply}));
            client.destroy();
        });
        return res.send({ error: false, data: {command, clearance, reply}, message: 'New command has been created successfully.' });
    });
});
 
//  Update command by trigger
router.put('/commands/:command', function (req, res) {
    const command = req.body.command;
    const reply = req.body.reply;
    const clearance = req.body.clearance;
    const user = req.body.user;

    if (!command || !reply || !clearance) {
        return res.status(400).send({ error: command, message: 'Please provide reply, command and clearance' });
    }
    
    var currentdate = new Date(); 
    var updatedAtDate = currentdate.getDate() + "-"
                    + (currentdate.getMonth()+1)  + "-" 
                    + currentdate.getFullYear() + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

    db.query("UPDATE "+process.env.DATABASE_TABLE+" SET reply = ?, clearance = ? WHERE command = ?; INSERT INTO history (command, reply, clearance, byUser, updatedAt) VALUES (?,?,?,?,?);", [reply, clearance, command, command, reply, clearance, user, updatedAtDate], function (error, results, fields) {
        if (error) throw error;
        console.log("sent:");
        console.log(utf8.encode(JSON.stringify({"action": 'edit_command', "level": clearance, "trigger": command, "response": reply})));
        var client = new net.Socket();
        client.connect(PORT, HOST, function(){
            client.write(JSON.stringify({"action": 'edit_command', "level": clearance, "trigger": command, "response": reply}));
            client.destroy();
        });
        return res.send({ error: false, data: {command, reply, clearance}, message: 'Command has been updated successfully.' });
    });
});
 
//  Delete command
router.delete('/commands/:command', function (req, res) {
    const command = req.params.command;
    const reply = req.body.reply;
    const clearance = req.body.clearance;

     if (!command) {
        return res.status(400).send({ error: command, message: 'Please provide command to delete.' });
    }

    db.query('DELETE FROM '+process.env.DATABASE_TABLE+' WHERE command = ?; DELETE FROM history WHERE command = ?', [command, command], function (error, results, fields) {
        if (error) throw error;
        console.log("sent:");
        console.log(utf8.encode(JSON.stringify({"action": 'del_command', "level": clearance, "trigger": command, "response": reply})));
        var client = new net.Socket();
        client.connect(PORT, HOST, function(){
            client.write(JSON.stringify({"action": 'del_command', "level": clearance, "trigger": command, "response": reply}));
            client.destroy();
        });
        return res.send({ error: false, data: {command}, message: 'Command has been deleted successfully.' });
    });
 
});

module.exports = router;
