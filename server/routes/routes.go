package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/npumiratpong/gogame/server/controllers"
)

func Setup(app *fiber.App) {

	app.Get("/", controllers.Hello)
	app.Get("/api/user", controllers.User)
	app.Get("/api/random", controllers.RandomNumber)
	app.Post("/api/logout", controllers.Logout)
	app.Post("/api/login", controllers.Login)
	app.Post("/api/guess", controllers.Guess)
}
