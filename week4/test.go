package main

import "fmt"

func main() {
	var a = make(map[int]string)
	a[0] = "barf"
    delete(a, 0)
	fmt.Println(a[0])
	fmt.Println(a[1])
	if _, ok := a[0]; ok {
		fmt.Println("yes")
	} else {
		fmt.Println("no")
	}
}
