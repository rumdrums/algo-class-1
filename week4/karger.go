package main

import (
	"bufio"
	"fmt"
	"log"
	"math/rand"
	"os"
	"strconv"
	"strings"
)

// find element in slice and return its index value
// or -1
func findInSlice(intSlice []int, val int) int {
	for i, v := range intSlice {
		if v == val {
			return i
		}
	}
	return -1
}

func load(file string) (map[int][]int, error) {
	f, err := os.Open(file)
	if err != nil {
		return nil, err
	}
	vertexMap := make(map[int][]int)
	scanner := bufio.NewScanner(f)
	// scan input and create vertices from
	// the first element of each line:
	for scanner.Scan() {
		lineArr := strings.Split(scanner.Text(), "\t")
		idx, err := strconv.Atoi(lineArr[0])
		if err != nil {
			log.Fatal(err)
		}
		vertexMap[idx] = make([]int, 0)
		// scan through rest of line:
		for _, v := range lineArr[1:] {
			val, err := strconv.Atoi(v)
			if err != nil {
				continue
			}
			vertexMap[idx] = append(vertexMap[idx], val)
		}
	}
	return vertexMap, nil
}

func getRandKey(vertexMap map[int][]int) int {
	var keySlice []int
	for k, _ := range vertexMap {
		keySlice = append(keySlice, k)
	}
	r := rand.Perm(len(vertexMap)-1)[0]
	return keySlice[r]
}

func getRandValue(vertexArr []int) int {
	r := rand.Perm(len(vertexArr))
	return vertexArr[r[0]]
}

func getMinCut(vertexMap map[int][]int) int {
	iters := 100
	var minCut int 
	for i:=0; i<iters; i++ {
		c := map[int][]int{}
		for k, v := range vertexMap {
			w := make([]int, len(v))
			copy(w, v)
		    c[k] = w
		}
		contract(c)
		var j int
		for _, v := range c {
			j = len(v)
			fmt.Println("j: ", j)
			break
		}
		if minCut == 0 {
			minCut = j
		} else if j < minCut {
			minCut = j
		}
	}
	return minCut
}

func contract(vertexMap map[int][]int) {
	for len(vertexMap) > 2 {
		vToKeep := getRandKey(vertexMap)
		vToRemove := getRandValue(vertexMap[vToKeep])
		fmt.Printf("deleting %v from %v\n",vToKeep,vToRemove)
		for _, v := range vertexMap[vToRemove] {
			if v != vToKeep {
				vertexMap[vToKeep] = append(vertexMap[vToKeep], v)
				vertexMap[v] = append(vertexMap[v], vToKeep)
			}
			idxToRemove := findInSlice(vertexMap[v], vToRemove)
			vertexMap[v][idxToRemove] = vertexMap[v][len(vertexMap[v])-1] 
			vertexMap[v] = vertexMap[v][:len(vertexMap[v])-1]
		}
		delete(vertexMap, vToRemove)
	}
}

func main() {

	myFile := "kargerMinCut.txt"
	// myFile := "test2.txt"
	vertexMap, err := load(myFile)
	if err != nil {
		log.Fatal("Could not load data")
	}
	minCut := getMinCut(vertexMap)
	fmt.Println("number of cuts: ", minCut)
}
