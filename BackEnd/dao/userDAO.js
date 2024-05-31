const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const User = require("../bo/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const UserID = "a";

const createUserWithEmail = (profile) => {
  mssql.connect(dbConfig, function (err, result) {
    const request = new mssql.Request()
      .input("Email", profile.emails[0]?.value)
      .input("UserName", mssql.NVarChar, profile.displayName)
      .input("UserID", UserID)
      .input("RoleID", mssql.Int, 3);
    request.query(
      `INSERT INTO Users(UserID, Email, UserName, RoleID) values (@UserID, @Email, @UserName, @RoleID);`,
      (err, res) => {
        if (err) return false;
        return true;
      }
    );
  });
};

const userDAO = {
  findAllUsers: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request();
        request.query(`SELECT * FROM Users;`, (err, res) => {
          if (err) reject(err);

          resolve(res.recordset);
        });
      });
    });
  },
  login: (login) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request()
          .input("PhoneNumber", mssql.VarChar, login.PhoneNumber)
          .input("Password", mssql.VarChar, login.Password);
        request.query(
          `SELECT UserID, UserName, RoleID, Password
          FROM Users
          WHERE PhoneNumber = @PhoneNumber`,
          (err, res) => {
            if (err) reject(err);

            const user = res.recordset[0];

            if (!user) {
              return resolve({
                err: login.PhoneNumber + " is not exist",
              });
            }

            const passwordIsValid = bcrypt.compareSync(
              login.Password,
              user.Password
            );

            if (!passwordIsValid)
              return resolve({
                err: "Incorrect password",
              });

            const token = jwt.sign(
              {
                id: user.UserID,
                role: user.RoleID,
                userName: user.UserName,
              },
              "HelloMilkyShop",
              {
                expiresIn: 60, //thời gian(s)
              }
            );

            resolve({
              auth: true,
              token: token,
            });
          }
        );
      });
    });
  },
  register: (name, phone, password, role) => {
    const user = new User(UserID, name, phone, null, password, role);
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request().input(
          "PhoneNumber",
          user.PhoneNumber
        );

        request.query(
          `SELECT UserID FROM Users WHERE PhoneNumber = @PhoneNumber;`,
          (err, res) => {
            if (err) {
              return reject("Internal server error");
            }

            if (res.recordset.length > 0) {
              return resolve({
                err: "Phone number already in use",
              });
            }

            const insertRequest = new mssql.Request()
              .input("UserID", user.UserID)
              .input("UserName", mssql.NVarChar, user.UserName)
              .input("PhoneNumber", user.PhoneNumber)
              .input("PasswordHash", user.Password)
              .input("RoleID", mssql.Int, user.RoleID || 3);
            insertRequest.query(
              `INSERT INTO Users (UserID, UserName, PhoneNumber, Password, RoleID) VALUES (@UserID, @UserName, @PhoneNumber, @PasswordHash, @RoleID);`,
              (err, res) => {
                if (err) {
                  console.error("Insert query execution error:", err);
                  return reject({
                    mes: "Internal server error",
                  });
                }

                resolve({
                  mes: "User registered successfully",
                });
              }
            );
          }
        );
      });
    });
  },
  findOrCreate: (profile) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const checkMail = new mssql.Request().input(
          "Email",
          profile.emails[0].value
        );
        checkMail.query(
          `SELECT UserID FROM Users WHERE Email = @Email;`,
          (err, res) => {
            if (err) reject(err);
            if (res.recordset.length > 0) resolve();
            else {
              const request = new mssql.Request()
                .input("UserID", UserID)
                .input("UserName", mssql.NVarChar, profile.displayName)
                .input("Email", profile.emails[0]?.value)
                .input("RoleID", mssql.Int, 3);
              request.query(
                `INSERT INTO Users(UserID, UserName, Email, RoleID) values (@UserID, @UserName, @Email, @RoleID)`,
                (err, res) => {
                  if (err) reject(err);
                  resolve();
                }
              );
            }
          }
        );
      });
    });
  },

  loginEmail: (email) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request().input(
          "Email",
          mssql.VarChar,
          email
        );
        request.query(
          `SELECT UserID, UserName, RoleID 
          FROM Users
          WHERE Email = @Email`,
          (err, res) => {
            if (err) reject(err);

            const user = res.recordset[0];

            if (!user) {
              return resolve({
                err: email + " is not exist",
              });
            }

            const token = jwt.sign(
              {
                id: user.UserID,
                role: user.RoleID,
                userName: user.UserName,
              },
              "HelloMilkyShop",
              {
                expiresIn: 60, //thời gian(s)
              }
            );

            resolve({
              auth: true,
              token: token,
            });
          }
        );
      });
    });
  },
};

module.exports = userDAO;
