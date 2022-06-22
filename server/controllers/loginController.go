package controllers

import (
	"errors"
	"time"

	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gofiber/fiber/v2"
	"github.com/npumiratpong/gogame/server/models"
	"golang.org/x/crypto/bcrypt"
)

var mySigningKey = []byte("mysupersecretphrase")

func getUserAndPassword() *models.User {

	userAccount := &models.Account{Email: "admin@admin.com", Password: "admin"}
	password, _ := bcrypt.GenerateFromPassword([]byte(userAccount.Password), 14)

	user := &models.User{
		Email:    userAccount.Email,
		Password: password,
	}
	return user
}

func Hello(c *fiber.Ctx) error {
	return c.SendString("Hello, World 👋!")
}

func GenerateJWT(user string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)

	claims["authorized"] = true
	claims["issuer"] = user
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	tokenString, err := token.SignedString(mySigningKey)
	if err != nil {
		return "", err
	}
	return tokenString, nil

}

func Login(c *fiber.Ctx) error {

	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}
	// Assuming we are getting user from DB
	user := getUserAndPassword()

	if data["email"] != user.Email {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "User not found",
		})
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.SendStatus(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect password",
		})
	}

	validToken, err := GenerateJWT(user.Email)
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Could not login",
		})
	}
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    validToken,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func User(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")

	if len(cookie) > 0 {

		token, err := jwt.Parse(cookie, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, errors.New("unexpected signing method")
			}
			return mySigningKey, nil
		})

		if err != nil {
			c.Status(fiber.StatusInternalServerError)
			return c.JSON(fiber.Map{
				"message": "Something went wrong",
			})

		}

		if token.Valid {
			c.Status(fiber.StatusAccepted)
			return c.JSON(token.Claims)
		} else {
			c.Status(fiber.StatusUnauthorized)
			return c.JSON(fiber.Map{
				"message": "Unauthorized!",
			})
		}
	} else {
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{
			"message": "User is not Authorized",
		})
	}
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	c.Status(fiber.StatusOK)
	return c.JSON(fiber.Map{
		"message": "Logged out successfully",
	})
}
