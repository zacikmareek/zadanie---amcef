const { User } = require("../models");

module.exports = {
  // async getAllUsers(req, res) {
  //   try {
  //     const users = await User.findAll();
  //     if (!users) {
  //       res.status(400).send({
  //         message: "Nenašli sa žiadny používatelia.",
  //       });
  //       return;
  //     }

  //     res.status(200).send({
  //       response: users,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).send({
  //       error: "Nastala serverová chyba, skúste neskôr prosím.",
  //     });
  //   }
  // },
  async getAllUsers(req, res) {
    try {
      const page = parseInt(req.params.page) || 1;
      const limit = parseInt(req.params.limit) || 10;
      const offset = (page - 1) * limit;

      const users = await User.findAll({ offset, limit });
      const totalCount = await User.count();

      const results = {
        totalCount,
      };

      if ((offset + limit) < totalCount) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }

      if (offset > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }

      results.users = users;
      console.log('toto', results);

      res.status(200).send(results);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "Nastala serverová chyba, skúste neskôr prosím.",
      });
    }
  },

  async getSpecificUserById(req, res) {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });

      if (!user) {
        return res.status(404).send({
          error: "Používateľ so zadaným ID sa nenašiel.",
        });
      }
      const userJson = user.toJSON();
      delete userJson.password;

      return res.status(200).send({
        message: userJson,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "Nastala serverová chyba, skúste neskôr prosím.",
      });
    }
  },

  async updateUser(req, res) {
    try {
      const updateUser = await User.update(
        {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email_address: req.body.email_address,
          phone_number: req.body.phone_number,
          address: req.body.address,
          zip: req.body.zip,
          country: req.body.country,
          note: req.body.note,
        },
        { returning: true, where: { id: req.params.id } }
      );

      if (!updateUser) {
        return res.status(404).send({
          error: "Používateľ so zadaným ID sa nenašiel.",
        });
      }
      return res.status(200).send({
        message: "Používateľ bol úspešne aktualizovaný.",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "Nastala serverová chyba, skúste neskôr prosím.",
      });
    }
  },

  async deleteUser(req, res) {
    try {
      const deleteUser = await User.destroy({
        returning: true,
        where: { id: req.params.id },
      });

      if (!deleteUser) {
        return res.status(404).send({
          error: "Používateľ so zadaným ID sa nenašiel.",
        });
      }
      return res.status(200).send({
        message: "Používateľ bol úspešne odstránený.",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "Nastala serverová chyba, skúste neskôr prosím.",
      });
    }
  },
};
