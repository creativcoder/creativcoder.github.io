---
date: "2020-12-07"
tags: ["algorithms", "databases", "merge", "key-value"]
title: "Merge k sorted arrays in Rust"
path: "/merge-k-sorted-arrays-rust"
excerpt: "An explanation and implementation blog post in Rust"
---

![Cover](https://dev-to-uploads.s3.amazonaws.com/i/aoh6yf5y0jv5q7kqad0e.png)

The other day, I was reading about LSM Tree based database storage engines (specifically, the LevelDB [docs](https://github.com/google/leveldb/blob/master/doc/impl.md)) where I came to know about a phase called compaction. LSM Tree based database storage engines are key-value storage systems where every operation is append only to favour less [write amplification](https://en.wikipedia.org/wiki/Write_amplification) and to reduce latency. LevelDB persists data file segments to disk (when the in-memory table hits a threshold) in sorted order to support efficient read queries. Even operations such as deletes or updates appends new entries to the underlying storage and this often leads to keys that are obsolete but still remain on disk and that increases disk usage. To overcome this, they often use a phase called _compaction_ where several sorted files are merged into single file to remove old data records in background. In order to implement a similar compaction strategy in my toy database project, I used the `merge` sub-routine from merge sort, generalizing it to k sorted arrays. In this post, I write about the implementation of the merge k algorithm in Rust. If you know the merge sub-routine from merge sort, you should feel right at home understanding the algorithm.

## The problem

Before formalizing the solution, we'll re-state the problem again with examples and reason up from there to come up with an implementation in Rust.

We are given `k` array of items that are sorted. The problem is to implement a function that given `k` sorted arrays, merges them and returns an array where all the elements are in sorted order.

For example, If we are given 2 sorted arrays:

`a = [3, 5]`

`b = [2, 7]` where `k = 2`

Then the merged array we get, would be `c = [2, 3, 5, 7]`

## Obvious naive solution

It's always a good idea to start with what you already know as the thinking lends itself to revealing more about the problem at hand. So, the obvious approach to solve this would be to just concatenate the two arrays and sort them. Here's a solution in Rust:

```rust
fn main() {
    let a = vec![3, 5];
    let b = vec![2, 7];
    let c = [a, b].concat();
    a.sort();
    dbg!(a);
}
```

That was quite easy, but it does have a `O(n*k * log n*k)` worst case time complexity, where `n` is the size of the resulting vector and `k` is the number of arrays. Can we do better?

Let's try a different approach. Without thinking about the implementation, how would you normally put these elements in order by hand? Let's distill down the above example and give it a thought with a case by case analysis. 

#### Case 1: 

Let's say for example, the arrays have only 1 element in them:
```rust
a = [3]
b = [2]
```

In this case, it's pretty trivial. We just compare the first item with the second and take the smallest of the two, and insert it as first element in the resulting array: `[2]`. What remains is `3` from `a` which we then append giving us `[2, 3]` as the merged sequence.

#### Case 2: 
Now, let's consider if one of the arrays have more than one element:

```rust
a = [3]
b = [2, 5]
```

In this case, we'll start again with the first item in both arrays and pick the smallest of the two items which is `2`. The next item to compare is `3` (from `a`) and `5` (from `b`), among which `3` is chosen as the next smallest element. At this point in time, we have exhausted all items in array `a`. Now, whatever remains to be put in the merged array has to be from array `b`. This is because of the invariant that we always pick the smallest item in each iteration so if all items from array `a` are exhausted, all remaining elements must be greater than last element in `a`. So we append `5` from `b` to our merged array to give us: `[2, 3, 5]`.

From the dry run of the above two cases, you must have already thought of using two variables as indexes over the arrays and walk over them one by one, taking the next smallest element in each iteration until one of them exhausts, and then copy all the items from the remaining array to our merged sequence. Sounds simple? Let's implement that:

## Implementation of merge k, where k = 2

To simplify the implementation for readability, we'll limit the items to integer (`i32`) values. Once we have the implementation in place, one can refactor it easily to make it generic over any `T`.

Here's how we can implement the above index pointer based solution in Rust:

```rust

fn merge(a: &[i32], b: &[i32]) -> Vec<i32> {
    let (mut i, mut j) = (0, 0);
    let mut sorted = vec![];
    let remaining;
    let remaining_idx;
    loop {
        if a[i] < b[j] {
            sorted.push(a[i]);
            i += 1;
            if i == a.len() {remaining = b; remaining_idx = j; break;}
        } else {
            sorted.push(b[j]);
            j += 1;
            if j == b.len() {remaining = a; remaining_idx = i; break;}
        }
    }
    for i in remaining_idx..remaining.len() {
        sorted.push(remaining[i]);
    }
    
    sorted
}
```

We have the `merge` function defined that takes in two slices of integers aka reference to an array of integers and returns a `Vec<i32>` (a heap allocated value). Within `merge`, we create two indexes `i, j` that start with `0`. We also create a `remaining` and `remaining_idx` to point to the array that gets left after all items from the other array gets exhausted. Next, we run a `loop {}`, where we pick the smallest item, push it to `sorted` and increment the respective index. We also do an additional check if we reach the end on one of the arrays and assign `remaining` and `remaining_idx` accordingly. After the loop, we loop over the `remaining` array items and push to `sorted`.

But, the above solution works only for 2 arrays. We need to generalize the solution to k sorted arrays.

## Generalizing to k sorted arrays

How would one extend the above solution to k sorted collection of items?

Well it turns out that now we need to keep k pointers to k arrays and pick the smallest item out of k. It's easy enough to write code to keep track of the pointers, if we have let's say < 10 or < 100 arrays to be merged. Or instead of keeping pointers, we could store an array of indexes into the arrays. That's another solution that works again for smaller values of k. But, it's not a convenient or maintainable code to write when we have very large arrays to be merged. Moreover, the number of comparision increases linearly as k increases.

Following along the same solution, let's think about what we need to find from the k arrays at the first iteration of the loop. That's right, we need to find the minimum from k items. This might give you a hint of using some data structure that supports getting minimum item from the `k` items. One data structure that comes to my mind is the heap data structure. In particular, a min-heap data structure.

## Enter the min heap

A Heap is a complete binary tree (nodes are inserted breadth first left to right) where there's a relation between parent and child nodes. This is the heap property. There are two variants of heap: min heap and max heap. In min heap the every parent node is smaller than the child and conversely for the max heap. At minimum, any implementation supports three key APIs:
1. inserting - Adds an element to the heap
2. removing - Removes an element to the heap
3. heapify - rebalances the tree while maintaining the heap property.

At all times the heap property must be maintained when inserting or removing items from the heap. Internally the heap uses the `siftDown` and `bubbleUp` sub-routines to maintain the heap property.

So using a min-heap, we can insert the first k items into the array. Then we keep popping until our heap is empty and keeping the array indexes.

To implement this, we need to modify our solution a bit.

Our `merge` method now takes in a `Vec<Vec<i32>>` as a parameter (an array of array of signed integers):

```rust

fn merge(arrays: Vec<Vec<i32>>) {

}

```

Next, let's create an `Item` struct that will hold references to the k arrays and their respective index as their iteration state. The index will tell us where in our array we are currently at. This `Item` instance will be the element that goes in our min heap. 

```rust
#[derive(Debug, Eq)]
struct Item<'a> {
    arr: &'a Vec<i32>,
    idx: usize
}
```

Now `Item` doesn't convey how they should be compared, as it's a new data type we've defined. So we need to tell the type system how they should be compared. Doing this is easy and we'll just need to implement a few traits and defer the comparision to the elements of the array using a helper method `get_item` (we define). On the `Item` struct we'll implement the required traits (`PartialEq`, `PartialOrd`, `Ord`) so that it can be inserted into min-heap:

```rust

impl<'a> PartialEq for Item<'a> {
    fn eq(&self, other: &Self) -> bool {
        self.get_item() == other.get_item()
    }
}

impl<'a> PartialOrd for Item<'a> {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        self.get_item().partial_cmp(&other.get_item())
    }
}

impl<'a> Ord for Item<'a> {
    fn cmp(&self, other: &Self) -> Ordering {
        self.get_item().cmp(&other.get_item())
    }    
}
```
We also have a few helper methods `new` and `get_item` purely for convenience.

```rust
impl<'a> Item<'a> {
    fn new(arr: &'a Vec<i32>, idx: usize) -> Self {
        Self {
            arr,
            idx
        }
    }

    fn get_item(&self) -> i32 {
        self.arr[self.idx]
    }
}
```


Once we have the required traits implemented for `Item`, we'll then implement the new `merge` algorithm:

```rust
use std::collections::BinaryHeap;
use std::cmp::Reverse;
use std::cmp::Ordering;

fn merge(arrays: Vec<Vec<i32>>) -> Vec<i32> {
    let mut sorted = vec![];

    let mut heap = BinaryHeap::with_capacity(arrays.len());
    for arr in &arrays {
        let item = Item::new(arr, 0);
        heap.push(Reverse(item));
    }

    while !heap.is_empty() {
        let mut it = heap.pop().unwrap();
        sorted.push(it.0.get_item());
        it.0.idx += 1;
        if it.0.idx < it.0.arr.len() {
            heap.push(it)
        }
    }

    sorted
}
```

We create a `Vec` that will hold our merged items. We then create a `BinaryHeap` instance and push all items in `arrays` as an `Item` with the start index `0`. We then wrap `item` with `Reverse` (as it's a max heap by default) and push it to heap.

Next, we run a loop while we still have elements in heap. Within the loop, we get the smallest item by `heap.pop()` and push it to `sorted` and increment the item's index by 1. Because we might still have items in the heap, we check for that and push it back in the last line.

Finally once we are done, we return the `sorted` array.

For this solution our complexity now reduces to `O(n*k * Log(k))

Finally let's test this out on a sample dataset:

```rust
fn main() {
    let a = vec![1, 5, 7];
    let b = vec![-2, 3, 4];
    let v = vec![a, b];
    dbg!(merge(v));
}

```

Final code: https://gist.github.com/creativcoder/20fda0f1a947bf2af3b93ab394d6bacb

## Taking it a step further

An optimization on top of this would be to stream sorted values as they are processed by exposing an iterator over the `k` items in heap.

With that said, I am open to suggestions, improvements to the solution and you can do so with comments below. Until next time!
