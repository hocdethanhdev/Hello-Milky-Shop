const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const User = require("../bo/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const UserID = "a";

const userDAO = {

  changePassword: (Password, UserID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);
        const request = new mssql.Request()
          .input("Password", mssql.VarChar, Password)
          .input("UserID", mssql.VarChar, UserID);
        request.query(
          `UPDATE Users SET Password = @Password WHERE UserID = @UserID;`,
          (err, res) => {
            if (err) return reject(err);
            resolve({
              err: res.rowsAffected > 0 ? 0 : 1
            });
            mssql.close();
          }
        );
      });
    });
  },

  checkOldPassword: (OldPass, UserID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);
        const request = new mssql.Request()
          .input("OldPass", mssql.VarChar, OldPass)
          .input("UserID", mssql.VarChar, UserID);
        request.query(
          `SELECT UserID FROM Users WHERE UserID = @UserID AND Password = @OldPass;`,
          (err, res) => {
            if (err) return reject(err);
            resolve({
              status: res?.recordset[0] !== null ? true : false
            });
            mssql.close();
          }
        );
      });
    });
  },

  usePoint : (UserID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);
        const request = new mssql.Request()
          .input("UserID", mssql.VarChar, UserID);
        request.query(
          `UPDATE Users SET Point = 0 WHERE UserID = @UserID;`,
          (err, res) => {
            if (err) return reject(err);
            resolve({
              err: res.rowsAffected > 0 ? 0 : 1
            });
          }
        );
      });
    });
  },

  countUserByRole : (RoleID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);
        const request = new mssql.Request()
          .input("RoleID", mssql.Int, RoleID);
        request.query(
          `SELECT COUNT(UserID) AS count FROM Users WHERE RoleID = @RoleID;`,
          (err, res) => {
            if (err) return reject(err);
            resolve({
              err: res.recordset[0] !== null ? 0 : 1,
              count: res?.recordset[0].count
            });
            mssql.close();
          }
        );
      });
    });
  },

  forgetPassword : (Password, UserID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);
        const request = new mssql.Request()
          .input("Password", mssql.VarChar, Password)
          .input("UserID", mssql.VarChar, UserID);
        request.query(
          `UPDATE Users SET Password = @Password WHERE UserID = @UserID;`,
          (err, res) => {
            if (err) return reject(err);
            resolve({
              err: res.rowsAffected[0] > 0 ? 0 : 1,
              mes: res.rowsAffected[0] > 0 ? "Change password successfully" : "Error in forgetPassword"
            });
            mssql.close();
          }
        );
      });
    });
  },

  checkPhoneNumber: (PhoneNumber) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request().input("PhoneNumber", mssql.VarChar, PhoneNumber);
        request.query(
          `SELECT UserID FROM Users WHERE PhoneNumber = @PhoneNumber;`,
          (err, res) => {
            if (err) return reject(err);
            resolve({
              err: res.recordset.length > 0 ? 0 : 1,
              mes: res?.recordset?.length > 0 ? "Exist" : "Not found",
              data: res.recordset.length > 0 ? res.recordset.UserID : null
            });
          }
        );
      });
    });
  },

  getUserByID: (id) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request().input("UserID", id);
        request.query(
          `
        SELECT UserName, PhoneNumber, Email, Point
        FROM Users u
        WHERE UserID = @UserID;`,
          (err, res) => {
            if (err) reject(err);
            if (res.recordset[0])
              resolve({
                err: 0,
                mes: "OK",
                data: res.recordset[0],
              });
            else {
              resolve({
                err: 1,
                mes: "Not found",
              });
            }
          }
        );
      });
    });
  },

  getOne: (id) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request().input("UserID", id);
        request.query(
          `
        SELECT UserName, u.RoleID, RoleName, Point
        FROM Users u
        JOIN Role r ON u.RoleID = r.RoleID
        WHERE UserID = @UserID;`,
          (err, res) => {
            if (err) reject(err);
            if (res.recordset[0])
              resolve({
                err: 0,
                mes: "OK",
                data: res.recordset[0],
              });
            else {
              resolve({
                err: 1,
                mes: "Not found",
              });
            }
          }
        );
      });
    });
  },
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
  deleteUser: (param_id) => {
    return new Promise((resolve, reject) => {
      const Status = "0";
      mssql.connect(dbConfig, function (err, result) {
        var request = new mssql.Request()
          .input("UserID", param_id)
          .input("Status", Status);
        request.query(
          `UPDATE Users SET Status = @Status WHERE UserID = @UserID;`,
          (err, res) => {
            if (err) reject(err);
            resolve({
              message: "0",
            });
          }
        );
      });
    });
  },
  updateUser: (param_id, userObject) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        var request = new mssql.Request()
          .input("UserID", param_id)
          .input("Status", mssql.Bit, userObject.Status)
          .input("RoleID", mssql.Int, userObject.RoleID);

        request.query(
          `UPDATE Users SET RoleID = @RoleID  WHERE UserID = @UserID
          ;`,
          (err, res) => {
            if (err) reject(err);
            resolve({
              message: "Edit successfully",
            });
          }
        );
      });
    });
  },
  findUserByRoleID: (ID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request().input("ID", ID);
        request.query(
          `SELECT *
          FROM Users
          WHERE RoleID = @ID
           
          `,
          (err, res) => {
            if (err) reject(err);
            resolve(res);
          }
        );
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
                err: 1,
                mes: login.PhoneNumber + " is not exist",
              });
            }

            const passwordIsValid = bcrypt.compareSync(
              login.Password,
              user.Password
            );

            if (!passwordIsValid)
              return resolve({
                err: 2,
                mes: "Incorrect password",
              });

            const token = jwt.sign(
              {
                id: user.UserID,
                role: user.RoleID,
                userName: user.UserName,
              },
              "HelloMilkyShop",
              {
                expiresIn: 60 * 30, //thời gian(s)
              }
            );

            resolve({
              err: 0,
              auth: true,
              token: token,
            });
          }
        );
      });
    });
  },
  register: (name, phone, password, role) => {
    const user = new User(UserID, name, phone, null, password, 1000, null, 1, role);
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
                err: 2,
                mes: "Phone number already in use",
              });
            }

            const insertRequest = new mssql.Request()
              .input("UserID", user.UserID)
              .input("UserName", mssql.NVarChar, user.UserName)
              .input("PhoneNumber", user.PhoneNumber)
              .input("PasswordHash", user.Password)
              .input("Point", mssql.Int, user.Point)
              .input("RoleID", mssql.Int, user.RoleID || 3);
            insertRequest.query(
              `INSERT INTO Users (UserID, UserName, PhoneNumber, Password, Point, RoleID) VALUES (@UserID, @UserName, @PhoneNumber, @PasswordHash, @Point, @RoleID);`,
              (err, res) => {
                if (err) {
                  console.error("Insert query execution error:", err);
                  return reject({
                    err: 1,
                    mes: "Internal server error",
                  });
                }

                resolve({
                  err: 0,
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
                .input("Point", mssql.Int, 1000)
                .input("RoleID", mssql.Int, 3);
              request.query(
                `INSERT INTO Users(UserID, UserName, Email, Point, RoleID) values (@UserID, @UserName, @Email, @Point, @RoleID)`,
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
                err: 1,
                message: email + " is not exist",
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
                expiresIn: 60 * 30, //thời gian(s)
              }
            );

            resolve({
              err: 0,
              auth: true,
              token: token,
            });
          }
        );
      });
    });
  },
  changePointOfUser: (UserID, MinusPoint) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        if (err) return reject(err);

        const request = new mssql.Request()
          .input("UserID", mssql.VarChar, UserID)
          .input("MinusPoint", mssql.Int, MinusPoint);

        request.query(
          `UPDATE Users 
           SET Point = Point - @MinusPoint 
           WHERE UserID = @UserID;
          `,
          (err, res) => {
            if (err) reject(err);
            resolve(res);
          })
      })
    })
  }
};

module.exports = userDAO;
