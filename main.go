package main

import (
  "github.com/gin-gonic/gin"
  "github.com/gin-gonic/contrib/static"
  "os"
)

func main() {
  r := gin.New()
  r.Use(gin.Logger())

  r.Use(static.Serve("/",
    static.LocalFile("./build", true)))

  r.Run(":" + os.Getenv("PORT"))
}
