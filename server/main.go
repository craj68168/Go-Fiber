package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

type Todo struct {
	ID    int    `json:"id"`
	TITLE string `json:"title"`
	DONE  bool   `json:"done"`
	BODY  string `json:"body"`
}

func main() {
	fmt.Print("Hello World")

	app := fiber.New()

	todos := []Todo{}

	app.Get("healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})

	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo := &Todo{}

		if error := c.BodyParser(todo); error != nil {
			return error
		}
		todo.ID = len(todos) + 1
		todos = append(todos, *todo)

		return c.JSON(todos)
	})

	log.Fatal(app.Listen(":4000"))
}
