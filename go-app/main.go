package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type User struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

var users = []User{}

func main() {
	app := fiber.New()

	// Create User
	app.Post("/api/users", func(c *fiber.Ctx) error {
		println("Create User")
		user := new(User)
		if err := c.BodyParser(user); err != nil {
			return c.Status(400).SendString(err.Error())
		}
		user.ID = uuid.New().String()
		users = append(users, *user)
		return c.Status(201).JSON(user)
	})

	// Read All Users
	app.Get("/api/users", func(c *fiber.Ctx) error {
		return c.JSON(users)
	})

	// Read Single User
	app.Get("/api/users/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		for _, user := range users {
			if user.ID == id {
				return c.JSON(user)
			}
		}
		return c.Status(404).SendString("User not found")
	})

	// Update User
	app.Put("/api/users/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		for i, user := range users {
			if user.ID == id {
				if err := c.BodyParser(&users[i]); err != nil {
					return c.Status(400).SendString(err.Error())
				}
				users[i].ID = id // Ensure ID doesn't change
				return c.JSON(users[i])
			}
		}
		return c.Status(404).SendString("User not found")
	})

	// Delete User
	app.Delete("/api/users/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		for i, user := range users {
			if user.ID == id {
				users = append(users[:i], users[i+1:]...)
				return c.SendStatus(204)
			}
		}
		return c.Status(404).SendString("User not found")
	})

	app.Listen(":3000")
}
