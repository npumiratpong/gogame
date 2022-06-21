package controllers

import (
	"math/rand"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

// type Randomzied struct {
// 	Number int
// }

var Num int = rand.Intn(10)

func randomInt(c *int) {
	*c = rand.Intn(10)
}

func RandomNumber(c *fiber.Ctx) error {
	randomInt(&Num)
	return c.JSON(Num)
}

func Guess(c *fiber.Ctx) error {

	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}
	number, err := strconv.Atoi(data["number"])
	if err != nil {
		return c.JSON(fiber.Map{
			"message": "Incorect Input. It must be a number",
		})
	}

	if number > 10 || number < 0 {
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
