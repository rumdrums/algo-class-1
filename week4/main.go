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
	"math/rand"
	"strconv"
	"strings"
)


type vertex struct {
	idx   int
	edges []*edge
}


type edge struct {
	v1 int
	v2 int
}


func Min(a int, b int) int {
  if a < b {
    return a
  } else {
    return b
  }
}


func Max(a int, b int) int {
  if a > b {
    return a
  } else {
    return b
  }
}


func NewEdge(a vertex, b vertex) edge {
  // set minimum of two to be first element;
  // not sure why anymore:
  v1 := Min(a.idx, b.idx)
  v2 := Max(a.idx, b.idx)
  return edge{
  	v1: v1,
  	v2: v2,
  }
}

func isDuplicate(edges []*edge, e *edge) (bool, *edge) {
  for _, v := range edges {
  	if (( v.v1 == e.v1 && v.v2 == e.v2 ) || (v.v1 == e.v2 && v.v2 == e.v1)) {
  		return true, v
  	}
  }
  return false, nil
}

func load(file string) (map[int]*vertex, []*edge, error) {
	f, err := os.Open(file)
	if err != nil {
		return nil, nil, err
	}

	vertexMap := make(map[int]*vertex)
	var edges []*edge
	scanner := bufio.NewScanner(f)

	// scan input and create vertices from
	// the first element of each line:
	for scanner.Scan() {
		lineArr := strings.Split(scanner.Text(), "\t")
		idx, err := strconv.Atoi(lineArr[0])
        if err != nil {
			log.Fatal(err)
		}
        idxVertex := vertex{idx: idx,}
		vertexMap[idx] = &idxVertex
		// scan through rest of line, 
		// creating edges and adding them
		// to the current item in vertexMap:
		for _, v := range lineArr[1:] {
			// create vertex object if it doesn't
			// exist:
			val, err := strconv.Atoi(v)
			if err != nil {
				continue
			}
            var curVertex vertex
			if _, ok := vertexMap[val]; !ok {
				curVertex = vertex{idx: val,}
				vertexMap[val] = &curVertex
			} else {
				curVertex = *vertexMap[val]
			}
			edge := NewEdge(idxVertex, curVertex)
			if isDup, _ := isDuplicate(edges, &edge); !isDup {
				edges = append(edges, &edge)
			}
			if isDup, dup := isDuplicate(edges, &edge); isDup {
				idxVertex.edges = append(idxVertex.edges, dup)
			} else {
				idxVertex.edges = append(idxVertex.edges, &edge)
			}
		}
	}
	return vertexMap, edges, nil
}


func getRand(vertexMap map[int]*vertex, edges []*edge) int {
	for {
   		r := int(rand.Float64()*(float64(len(edges))-1))
		if _, ok := vertexMap[r]; ok {
			return r
		} 
	}
}


func isSelfLoop(e *edge) bool {
	if e.v1 == e.v2 {
		fmt.Println(*e, "is a self loop")
		return true
	}
	return false
}

func contract(vertexMap map[int]*vertex, edges []*edge) {
	// randomly choose an edge from the list;
	// slate vertex edge.b for removal;
	// iterate through edge.b's associated edges, 
	//	  change the matching vertex in each to edge.a;
	// add edge.b's edges to edge.a's edges
	// delete edge.b from vertexMap 
	for len(vertexMap) > 2 {
		// this is buggy:
		r := getRand(vertexMap, edges)
    	vToRemove := edges[r].v2
    	fmt.Println("remove vertex ", vToRemove)
    	vToKeep := edges[r].v1
    	for _, v := range vertexMap[vToRemove].edges {
    		if v.v1 == vToRemove {
    			fmt.Println("set ", v.v1, " to ", vToKeep)
    			v.v1 = vToKeep
    		} 
    		if v.v2 == vToRemove {
    			v.v2 = vToKeep
    		}
    		if !isSelfLoop(v) {
	    		vertexMap[vToKeep].edges = append(vertexMap[vToKeep].edges, v)
    		} 
    	}
    	delete(vertexMap, vToRemove)
    	edges = append(edges[:r], edges[r+1:]...)
	}
}


func main() {

//	myFile := "kargerMinCut.txt"
	myFile := "test.txt"
	vertexMap, edges, err := load(myFile)
	if err != nil {
		log.Fatal("Could not load data")
	}
	fmt.Printf("length of vertexMap: %v\n", len(vertexMap))
	contract(vertexMap, edges)
	for k, _ := range vertexMap {
		fmt.Printf("vertexMap[%v]: ", k)
		for _, v := range vertexMap[k].edges {
			fmt.Printf(" %p %v", v, *v)
		}
		fmt.Printf("\n")
	}
	fmt.Printf("length of vertexMap: %v\n", len(vertexMap))
}
