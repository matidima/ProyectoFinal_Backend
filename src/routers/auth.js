import { Router } from "express";
import passport from "passport";
import { PassportAuth } from "../middlewares/index.js";

const router = Router();

router.get("/", PassportAuth.Authenticated, (req, res) => {
    res.redirect("login");
});

router.post("/login",
  passport.authenticate("login"), (req, res) => {
    try {
      res.status(200).send({success: true, message: "Inicio de sesion exitoso"})
    } catch (error) {
      res.status(400).send({success: false, message: "Error de inicio de sesión"})
    }
  }
);

router.post("/register",
  passport.authenticate("register"), (req, res) => {
    try {
      res.status(200).send({success: true, message: "Registro exitoso"})
    } catch (error) {
      res.status(400).send({success: false, message: "Error de registro"})
    }
  }
);

export { router as AuthRouter};