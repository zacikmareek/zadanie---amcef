const { User } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { response } = require("express");

function jwtSignUser(user) {
  const ONE_HOUR = 60 * 60;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_HOUR,
  });
}

module.exports = {
  async register(req, res) {
    try {
      const isUser = await User.findOne({
        where: {
          email_address: req.body.email_address,
        },
      });
      if (!isUser) {
        const user = await User.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email_address: req.body.email_address,
          phone_number: req.body.phone_number,
          password: req.body.password,
          address: req.body.address,
          zip: req.body.zip,
          country: req.body.country,
          note: req.body.note,
          role: req.body.role,
        });
        const userJson = user.toJSON();
        delete userJson.password;
        res.status(201).send({
          message: "Registrácia prebehla úspešne.",
          details: userJson,
        });
        return;
      }
      res.status(400).send({
        error: "Email je už zaregistrovaný.",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "Nastala serverová chyba, skúste neskôr prosím.",
      });
    }
  },

  async login(req, res) {
    try {
      const email_address = req.body.email_address;
      const password = req.body.password;

      const user = await User.findOne({
        where: {
          email_address: email_address,
        },
      });
      if (!user) {
        return res.status(403).send({
          error: "Nesprávne prihlasovacie údaje!",
        });
      }
      const isPasswordValid = await user.comparePassword(
        password,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(403).send({
          error: "Nesprávne prihlasovacie údaje!",
        });
      }
      const userJson = user.toJSON();
      delete userJson.password;
      res.cookie("token", jwtSignUser(userJson), {
        maxAge: 3600,
        httpOnly: false,
        secure: false,
      });
      res.status(200).send({
        id: response.id,
        details: userJson,
        message: "Prihlásenie prebehlo úspešne!",
        token: jwtSignUser(userJson),
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "Nastala serverová chyba, skúste neskôr prosím.",
      });
    }
  },

  async logout(req, res) {
    try {
      res.clearCookie("token");
      res.status(200).send({
        message: "Odhlásenie prebehlo úspešne.",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "Nastala serverová chyba, skúste neskôr prosím.",
      });
    }
  },
};
