#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import {differenceInSeconds} from "date-fns";

const res = await inquirer.prompt({
    name : "userInput",
    type : "number",
    message : chalk.bold.magentaBright("\nEnter Countdown Duration In Seconds: "),
    validate : (input) => {
        if (isNaN(input)) {
            return chalk.red("Please Enter Number must be in 60 Seconds: \n\tUse arrow-key to continue..")
        } else if (input > 60) {
            return chalk.red("Please Enter Number must be in 60 Seconds: \n\tUse arrow-key to continue..")
        } else {
            return true;
        }
    }
});

let num = res.userInput;

console.log(chalk.bold.blueBright(`\t\nBOMB Will Explode In  ${num} Seconds!`));
console.log(chalk.bold.cyan("Starting Countdown....\n"));


function startTime(val:number){
    const intTime = new Date().setSeconds(new Date().getSeconds() + (val+2));
    const intervalTime = new Date(intTime);
    setInterval( (() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.bold.underline.yellow("\t\tTIME UP!\n"));
            console.log(chalk.bold.redBright("\t!!!!!! BBHHHHOOOOOOMMMMM !!!!!!"));
            
            console.log(chalk.bold.green("\n\tThank You For Using Countdown Timer App"));
            console.log(chalk.green("/*/").repeat(20));
            process.exit();
        }
        const minute = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const second = Math.floor(timeDiff % 60);
        console.log(`${minute.toString().padStart(2, "0")} : ${second.toString().padStart(2, "0")}`);
        
    }), 1000)
}

startTime(num);
