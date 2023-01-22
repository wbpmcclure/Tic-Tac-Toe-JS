//node TicTacToe
const boxStates = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

const prompt = require('prompt-sync')({sigint: true});

StartGame();

function StartGame(){
    while (!GameOver())
    {
        Turn('x');
        if (GameOver())
        {
            break;
        }
        Turn('o');
    }
    console.clear();

    RenderBoxes();
    console.log("");
    console.log("Game Over");
    console.log("");
    console.log(boxStates);
}

function RenderBoxes(){
    for(i = 0; i < 3; i++){
        console.log(boxStates[i * 3] + "|" + boxStates[i * 3 + 1] + "|" + boxStates[i * 3 + 2]);
    }
}

function Turn(player){
    if(GameOver()) return;

    console.clear();

    RenderBoxes();

    // let row = -1;
    // let column = -1;

    // rl.question("Which row would you like to place in? (1-3) : ", (answer) =>{
    //     row = answer;
    // })
    // rl.question("Which column would you like to place in? (1-3) : ", (answer) =>{
    //     column = answer;
    // })
    console.log('');
    console.log(`player ${player}'s turn.`);
    console.log('');
    const row = prompt("Which row would you like to place in? (1-3) : ");
    const column = prompt("Which column would you like to place in? (1-3) : ");

    if (ValidSpot(row, column))
    {
        boxStates[FindPosition(row, column)] = player;
    }
    else
    {
        console.clear();
        Retry(player);
    }
}

function Retry(player){
    console.log('Not a valid position');

    setTimeout(() => {
        Turn(player);
    }, 2000);
}

function FindPosition(row, column)
        {
            return ((row - 1) * 3 + (column - 1));  
        }

function ValidSpot(row, column)
{
    if (row < 1 || column < 1) return false;
    if (row > 3 || column > 3) return false;

    else
    {
            if (boxStates[FindPosition(row, column)] == ' ')
        {
            return true;
        }
        else return false;
    }
}


function GameOver(){
    for (i = 0; i < 2; i++)
            {
                let target = ' ';
                if (i == 0) target = 'x';
                else target = 'o';

                //rows
                for (r = 0; r < 3; r++)
                {
                    if (boxStates[r * 3] == target && boxStates[r * 3 + 1] == target && boxStates[r * 3 + 2] == target)
                    {
                        return true;
                    }
                }

                //columns
                for (c = 0; c < 3; c++)
                {
                    if (boxStates[c] == target && boxStates[c + 3] == target && boxStates[c + 6] == target)
                    {
                        return true;
                    }
                }

                //diagnols
                if (boxStates[0] == target && boxStates[4] == target && boxStates[8] == target)
                {
                    return true;
                }

                if (boxStates[2] == target && boxStates[4] == target && boxStates[6] == target)
                {
                    return true;
                }
            }

            //full board, no win
            if (!boxStates.includes(' ')) return true;

            return false;
}