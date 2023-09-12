package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
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

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	todos := []Todo{}

	app.Get("/api/todos", func(c *fiber.Ctx) error {
		return c.JSON(todos)
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

	app.Patch("/api/todos/:id/done", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")

		if err != nil {
			return c.Status(401).SendString("Invalid ID")
		}

		for i, t := range todos {
			if t.ID == id {
				todos[i].DONE = true
				break
			}
		}
		return c.JSON(todos)
	})

	app.Delete("/api/todos/:id", func(c *fiber.Ctx) error {

		id, err := c.ParamsInt("id")

		if err != nil {
			return c.Status(401).SendString("Invalid ID")
		}

		if id == -1 {
			return c.JSON("ID not found")
		}

		for i, t := range todos {
			if t.ID == id {
				todos = append(todos[:i], todos[i+1:]...)
			}

		}
		return c.JSON("Deleted Successfully")
	})

	log.Fatal(app.Listen(":4000"))
}
