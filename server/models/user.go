package models

type User struct {
	Email    string `json:"email"`
	Password []byte `json:"_"`
}

type Account struct {
	Email    string
	Password string
}
