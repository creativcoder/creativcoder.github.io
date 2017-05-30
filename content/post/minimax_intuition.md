+++
date = "2017-05-13T23:25:02+05:30"
draft = false
title = "Building minimax AI step by step"
tags = ["search", "tictactoe", "game", "ai"]
featureimage = "http://i.imgur.com/xjrpiKs.jpg"
comments = true
description = "A step by step explanation with implementation in python"

+++

This post is another attempt to explain the minimax algorithm that can be used to simulate an AI for a simple game of tic tac toe and other similar games like chess, checkers etc. There are many other [good](http://neverstopbuilding.com/minimax) [posts](http://www.flyingmachinestudios.com/programming/minimax/) on this topic so this post just complements them with a concise implementation step by step. We'll just implement the simplest form of minimax to help beginners get started. There maybe a follow up post where we enhance our AI to not perform redundant state evaluation by pruning the game tree using alpha beta parameters. The code is available on my [github](https://github.com/creativcoder/minimax) to follow along.

Lets get familiar with some background and jargons.

The origin of minimax algorithm is from a field called game theory where this algorithm is applied to games of perfect information. A tic tac toe game is one of simplest example of a game with perfect information. A game of perfect information will be transparent for both players in terms of its moves and there is no element of suprise as to what moves other player ends up making as in games such as poker. Every board piece or move is apprehensible by both players.

------------

In order for our computer program to analyze the game of tic tac toe and make intelligent moves, we need to give the computer a representation by which it can analyze the game. By analysing i mean it must be able to check whether there is a win/lose situation or how many empty slots are left in the game grid or how to make moves so that other player does get chance to make winning moves.

To help ourselves and the computer with the representation, we will build certain concepts and abstrations about our game in order to implement our AI. Let get to them one by one.

__Initial Game State__ - Its when we start our game with 9 empty cells. This will be our initial game state. In general a `State` in AI parlance is a collection of information that precisely describes the situation of an entity in its environment. In our case its just an array of cells each having a blank `-` slot.

```python
class Tictactoe(object):
    def __init__(self):
        self.board = ['-' for i in range(0,9)]
```
__Game Loop__: We need a looping mechanism of some sort, so that we can keep asking the human player for his next move until he wins (which he may never with our AI 👽) or the AI wins or its a draw.
```
def start_game(self):
    while True:
        # do stuff
```

__Players__: Of course we need players. Player one is the human and other will be the computer. We add a boolean __`won`__ to help break out of our game loop when any of the two player wins.
```
class Tictactoe(object):
    def __init__(self):
        self.board = ['-' for i in range(0,9)]
        self.player_one = None
        self.player_two = None
        self.won = False
```

__Game State__: It is the board configuration that we have at any point of time during the game.
For example, the board state
```
| - | O | - |
| - | X | X |
| - | - | - |
```
can be considered as some intermediary game state during the course of gameplay.

__Game Tree__ - From a given game state S, it is a tree with S as its root and its children consisting of all next states the game can go if we play all the remaining empty cells one by one. An example will make this clear:
```
| - | O | - |
| X | X | - |
| O | O | X | 
```
From this state, all possible next game states can be (suppose the player who plays these moves is X):

1)
```
|{X}| O | - |
| X | X | - |
| O | O | X |
```
2)
```
| - | O |{X}|
| X | X | - |
| O | O | X |
```
3) 
```
| - | O | - |
| X | X |{X}|
| O | O | X |
```

These our the only __next__ states that we can get from our state S when its player X's turn. It it these states that we will need to generate in our minimax algorithm

Now, we're getting close. Lets build helper utilities to check whether someone won the game or not:
```
def won(board):
    # Horizontal Check
    for i in range(0,9,3):
        if board[i:i+3].count(board[i]) == 3 and board[i] != '-':
            return board[i]
    # Vertical Check
    for i in range(0,3):
        if board[i] == board[i+3] == board[i+6] and board[i] != '-':
            return board[i]
    # Diagonal Check
    mid = board[4]
    if board[0] == mid == board[8] and mid != '-':
        return mid
    elif board[2] == mid == board[6] and mid != '-':
        return mid
```
Lets also make a function to get indices of empty slots in our game which comes handy in our minimax function:

```
def empty_slots(board):
    return [idx for i in range(len(board)) if board[i] == '-']
```

We need to check whether the game is a draw, so lets also add that method:

```
def is_draw(board):
    for i in board:
        if i == '-'
        return False
    return True
```


Now comes the interesting part.

### The Minimax algorithm overview
-------------------
The higher level idea behind the AI is that when it is computer's turn, we will invoke a procedure called `minimax`, which looks at the current tic tac toe board, generates the __next game states__ and tries to play the whole game from the current board state until it reaches a end state (which can be a win/lose or a draw state) and then decides which move is good based on the end game state. The minimax algorithm plays the role of both players. One being the __max__imizer (say X) and other other __mini__imizer (say Y). The maximizer plays the game to maximize his score, while the minimizer plays to minimize the score of the maximizer. The algorithm is a recursive one and flips between the minimizer and maximizer at every layer of game state traversal. ![alt tree](http://i.imgur.com/ileTCMW.jpg)

### The Minimax algorithm in detail
-----------------

```
def minimax(board, player, maximizing):
    # cool stuff ahead
```
The algorithm needs three information i.e., the board, the player who is playing and whether he plays for maximizing his score or the contrary. The algorithm proceeds by walking the game tree generated from the given game state in depth first search.


 Then It does the same thing (i.e., calls itself) on the played children states, until it reaches a leaf node that has all slots filled. As its a recursive algorithm so lets define our bases cases here. Since the algorithm walks and explore game states. There must be some end game state after which no more moves are possible. And these game states are the tree's leaf nodes. They can be in any one of the three states

    Human wins
    Computer wins
    A tie

Only leaf nodes in our game tree have some assoicated values with them which we call the utility of the nodes.

__Utility function__ - Its a criteria by which a particular game state can be distinguished to provide benefit towards winning.

So accordingly we assign certain scores to each of the leaf states.
    * Human wins - +1 (these will flip in sign as our minimax takes turns)
    * Computer wins -1
    * A tie 0

Minimax will actually use these leaf scores to figure out scores for the intermediate game states. Taking the scores from the leaf nodes make sense because, the path from root to leaf, is what leads us to that score, so the intermediate node also can assume the same score as of leaf, and bubble up that value to root to indicate that is move is beneficial for the player.

Now when minimax actually tries to 
