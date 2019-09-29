const program = require('commander');
const apiKey = "f8f2ecde9684d05a5883eb8a4b6873763aa616a193f26429b579e3bcf490827aa25fc7d05891586952c444aad64fad7d22e8bf4d3084b3d4421e21b249d6ac78278045efc8ce6cd8e98c96a15f14be38";
const request = require("request");

program
    .version('0.0.1') //Defines the version of the application
    .description('Command Line Dictionary Tool'); // Defines what the app is about

program
    .command('definitions <word>')
    .description('Shows the definition of a word')
    .action((word) => {
        definitionsOfTheWord(word);
    });



program
    .command('synonymns <word>')
    .description('Shows the Synonymns of a word')
    .action((word) => {
        synonymsOfTheWord(word);
    });

program
    .command('examples <word>')
    .description('Shows the Examples of a word')
    .action((word) => {
        examplesOfTheWord(word);
    });


program
    .command('word of the day')
    .description('Shows the Details of a random word')
    .action(() => {
        wordOfTheDay();
    });

program
    .command('wordFullDetails <word>')
    .description('Shows the Details of a particular word')
    .action((word) => {
        wordFullDetails(word);
    });



//Function to get the definitions of the particular word
const definitionsOfTheWord = (word) => {
    var options = {
        method: 'GET',
        url: 'https://fourtytwowords.herokuapp.com/word/' + word + '/definitions',
        qs: { api_key: apiKey },
        headers:
        {
            'Postman-Token': '95195943-b023-e604-1f4e-153fa3fe4c85',
            'Cache-Control': 'no-cache'
        }
    };
    return new Promise(function (resolve, reject) {

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            let results = JSON.parse(body);
            let definitionCount = 1;
            console.log("The Definition/Definitions of the word are as below : \n")
            console.log("=====================================================");

            results.forEach(function (definition) {
                console.log(definitionCount + ' -> ' + definition.text + '\n');
                definitionCount++;
            });
            resolve();
        });
    })

}


//Function to get the Synonym of a particular word
const synonymsOfTheWord = (word) => {
    var options = {
        method: 'GET',
        url: 'https://fourtytwowords.herokuapp.com/word/' + word + '/relatedWords',
        qs: { api_key: apiKey },
        headers:
        {
            'Postman-Token': 'e743cbc4-f39a-e307-e91a-c62b650f7432',
            'Cache-Control': 'no-cache'
        }
    };
    return new Promise(function (resolve, reject) {

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            let synonyms = JSON.parse(body);
            let synonymCount = 1;

            console.log("The Synonym/Synonyms of the word are as below : \n");
            console.log("================================================")
            synonyms[0].words.forEach(function (synonym) {
                console.log(synonymCount + ' -> ' + synonym + '\n');
                synonymCount++;
            })
            resolve();
        });
    })
}


//Function to get the examples of a particular word
const examplesOfTheWord = (word) => {
    var options = {
        method: 'GET',
        url: 'https://fourtytwowords.herokuapp.com/word/' + word + '/examples',
        qs: { api_key: apiKey },
        headers:
        {
            'Postman-Token': 'e743cbc4-f39a-e307-e91a-c62b650f7432',
            'Cache-Control': 'no-cache'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        let examples = JSON.parse(body);
        let examplesCount = 1;

        console.log("The examples of the word are as below : \n");
        console.log("===========================================");

        examples.examples.forEach(function (example) {
            console.log(examplesCount + ' -> ' + example.text + '\n');
            examplesCount++;
        })
    });

}


//Function to display Word of the Day, It's definitions, examples and synonymns
const wordOfTheDay = () => {
    var options = {
        method: 'GET',
        url: 'https://fourtytwowords.herokuapp.com/words/randomWord',
        qs: { api_key: apiKey },
        headers:
        {
            'Postman-Token': '12b6c700-c156-4e11-2602-fb8c84cffd9a',
            'Cache-Control': 'no-cache'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        let wordOfTheDayJson = JSON.parse(body);
        var wordOfTheDay = wordOfTheDayJson.word
        console.log("Word of the Day -> " + wordOfTheDay + "\n");
        definitionsOfTheWord(wordOfTheDay)
            .then(() => {
                synonymsOfTheWord(wordOfTheDay);
            }).then(() => {
                examplesOfTheWord(wordOfTheDay);
            }).catch((error) => {
                console.log(error);
            })
    });

}



//Function to display of a particular word, It's definitions, examples and synonymns
const wordFullDetails = (word) => {
    definitionsOfTheWord(word)
        .then(() => {
            synonymsOfTheWord(word);
        }).then(() => {
            examplesOfTheWord(word);
        }).catch((error) => {
            console.log(error);
        })
}


program.parse(process.argv);


