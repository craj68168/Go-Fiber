package db

import (
	"sync"

	"go.mongodb.org/mongo-driver/mongo"
)

var clientInstance *mongo.Client

var mongoOnce sync.Once

const (
	url      = "mongodb://localhost:27017"
	Database = "products-api"
)

// func GetMongoClient() (*mongo.Client, error) {
// 	mongoOnce.Do(func() {
// 		clientOptions := options.Client().ApplyURI(url) //options comes from mongo driver options

// 		client, err := mongo.Connect(context.TODO(), client.Options)
// 	})
// }
