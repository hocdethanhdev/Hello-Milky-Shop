const mssql = require("mssql");
const dbConfig = require("../config/db.config");

const chatDAO = {
  getChatUnseen: (ChatRoom) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request().input(
          "ChatRoom",
          mssql.NVarChar,
          ChatRoom
        );
        request.query(
          `
          Select COUNT(Message) as count 
          from Message m JOIN Chat c 
          ON c.ChatRoom = m.ChatRoom
          WHERE c.ChatRoom = @ChatRoom AND m.TimeStamp > 
          (SELECT TOP 1 TimeStamp 
          FROM Message m
          WHERE SUBSTRING(UserID, 1, 1) = 'S'
          ORDER BY TimeStamp DESC);`,
          (err, res) => {
            if (err) reject(err);
            resolve({
              err: res.recordset[0].count !== null ? 0 : 1,
              count: res.recordset[0].count,
            });
          }
        );
      });
    });
  },
  getAllChatUnseen: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request();
        request.query(`
          SELECT COUNT(m.Message) AS count, c.ChatRoom
          FROM Message m
          JOIN Chat c ON c.ChatRoom = m.ChatRoom
          WHERE m.TimeStamp > (
          SELECT MAX(sub_m.TimeStamp)
          FROM Message sub_m
          WHERE SUBSTRING(sub_m.UserID, 1, 1) = 'S'
          AND sub_m.ChatRoom = m.ChatRoom
          )
          GROUP BY c.ChatRoom;
          ;`,
          (err, res) => {
            if (err) reject(err);
            resolve({
              err: res.recordset.length > 0 ? 0 : 1,
              data: res.recordset ?? null,
            });
          }
        );
      });
    });
  },
  getAllMessageByChatRoom: (ChatRoom) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request().input(
          "ChatRoom",
          mssql.NVarChar,
          ChatRoom
        );
        request.query(
          `SELECT Message, m.UserID, UserName, TimeStamp
          FROM Message m
          JOIN Users u ON u.UserID = m.UserID
          WHERE ChatRoom = @ChatRoom
          ORDER BY TimeStamp;`,
          (err, res) => {
            if (err) reject(err);
            resolve({
              err: res.recordset.length > 0 ? 0 : 1,
              data: res.recordset ?? null,
            });
          }
        );
      });
    });
  },
  saveMessage: (Message, UserID, ChatRoom) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request()
          .input("Message", mssql.NVarChar, Message)
          .input("UserID", mssql.VarChar, UserID)
          .input("ChatRoom", mssql.VarChar, ChatRoom);
        request.query(
          `INSERT INTO Message (Message, UserID, ChatRoom, TimeStamp) values (@Message, @UserID, @ChatRoom, SYSDATETIME());`,
          (err, res) => {
            if (err) reject(err);
            resolve({
              err: res.rowsAffected > 0 ? 1 : 0,
            });
          }
        );
      });
    });
  },
  getAllChatRoom: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request();
        request.query(`SELECT * FROM Chat;`, (err, res) => {
          if (err) reject(err);
          resolve({
            err: res.recordset.length > 0 ? 0 : 1,
            data: res.recordset ?? null,
          });
        });
      });
    });
  },
  findRoom: (memberId) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request().input(
          "ChatRoom",
          mssql.VarChar,
          memberId
        );
        request.query(
          `SELECT * FROM Chat WHERE ChatRoom = @ChatRoom;`,
          (err, res) => {
            if (err) reject(err);
            resolve({
              err: res.recordset.length === 0 ? 1 : 0,
              data: res.recordset[0] ?? null,
            });
          }
        );
      });
    });
  },
  createChat: (memberId) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request().input(
          "ChatRoom",
          mssql.VarChar,
          memberId
        );
        request.query(
          `INSERT INTO Chat(ChatRoom) values (@ChatRoom);`,
          (err, res) => {
            if (err) reject(err);
            resolve({
              err: res?.rowsAffected > 0 ? 0 : 1,
            });
          }
        );
      });
    });
  },
};
module.exports = chatDAO;
