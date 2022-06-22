package controllers

import (
	"math/rand"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

var Num int = rand.Intn(10)
var count int = 1

func randomInt(c *int) {
	*c = rand.Intn(10)
}

func RandomNumber(c *fiber.Ctx) error {
	randomInt(&Num)
	return c.JSON(Num)
}

func Guess(c *fiber.Ctx) error {

	var data map[string]string

	count = count + 1

	if err := c.BodyParser(&data); err != nil {
		return err
	}
	number, err := strconv.Atoi(data["number"])
	if err != nil {
		return c.JSON(fiber.Map{
			"message": "Incorect Input. It must be a number",
		})
	}
	if count > 5 {
		count = 1
		randomInt(&Num)
		return c.JSON(fiber.Map{
			"message": "You lost! Try again...",
		})
	} else if number > 10 || number < 0 {
		return c.JSON(fiber.Map{
			"message": "Number must be in between 0-10",
		})
	} else if number < Num {
		return c.JSON(fiber.Map{
			"message": "Try again with bigger number !",
		})
	} else if number > Num {
		return c.JSON(fiber.Map{
			"message": "Try again with smaller number !",
		})
	} else {
		randomInt(&Num)
		c.Status(fiber.StatusCreated)
		return c.JSON(fiber.Map{
			"message": "You win!",
		})
	}
}
