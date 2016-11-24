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
	idx   string
	edges []*edge
}

type edge struct {
	a vertex
	b vertex
}

func load(file string) (map[string]vertex, []edge, error) {
	f, err := os.Open(file)
	if err != nil {
		return nil, nil, err
	}

	vertexMap := make(map[string]vertex)
	var edges []edge
	scanner := bufio.NewScanner(f)

	// scan input and create vertices from
	// the first element of each line:
	for scanner.Scan() {
		lineArr := strings.Split(scanner.Text(), "\t")
		idx := lineArr[0]
		log.Println("idx: ", idx)
		vertexMap[idx] = vertex{idx: idx,}
		for _, v := range lineArr[1:] {
			if _, ok := vertexMap[v]; !ok {
				vertexMap[v] = vertex{idx: v,}
			}
			edges = append(edges, edge{
				a: vertexMap[idx],
				b: vertexMap[v],
			})
		}
	}

	return vertexMap, edges, nil
}

// func Load(file string) ([][]string, error) {

// }

func main() {

	myFile := "kargerMinCut.txt"
	vertexMap, edges, err := load(myFile)
	if err != nil {
		log.Fatal("Could not load data")
	}
	fmt.Println("vertexMap: ", vertexMap)
	fmt.Println("edges: ", edges)
	// log.Println(data)
}
