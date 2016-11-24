package main 

/*

  while > 2 vertices:
    pick a remaining edge (u,v) at random
    merge (or "contract") u and v into a single vertex
     -- replace the second number in the pair with the first
    remove self-loops

*/
import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

type vertex struct {
  idx int 
  edges []edge 
}

type edge struct {
  a *vertex
  b *vertex
}

func load(file string) ([][]string, error)  {
	f, err := os.Open(file)
	var arr [][]string
	if err != nil {
		return nil, err
	}
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
      line := scanner.Text()
      arr = append(arr, strings.Split(line, "\t"))
	}
		for _, row := range arr {
		for i, col := range row {
			fmt.Println(col);
			fmt.Println(i)
		}
	}
	return arr, nil
}

// func Load(file string) ([][]string, error) {

// }

func main() {
	
	myFile := "kargerMinCut.txt"
	data, err := load(myFile)
	if err != nil {
		log.Fatal("Could not load data")
	}
	for _, row := range data {
		for i, col := range row {
			fmt.Println(col);
			fmt.Println(i)
		}
	}
	// log.Println(data)
}
