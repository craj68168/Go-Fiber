package main

import (
	"github.com/gofiber/fiber/v2"
)

func healthCheck(c *fiber.Ctx) error {
	return c.SendString("Its Working")
}
func main() {
	app := fiber.New()

	app.Get("/healthChek", healthCheck)

	// Start the server
	err := app.Listen(":3000")
	if err != nil {
		panic(err)
	}
}
