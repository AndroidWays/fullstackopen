const mongoose = require('mongoose')

// Check if the required number of arguments are provided
if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

// Get the arguments from the command line
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://GeeksWay:${password}@cluster0.7k1dgeu.mongodb.net/fullstackopenApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB')

        const personSchema = new mongoose.Schema({
            name: String,
            number: String,
        })

        const Person = mongoose.model('Person', personSchema)

        if (name && number) {
            const person = new Person({
                name,
                number,
            })

            return person.save()
                .then(() => {
                    console.log(`Added ${name}'s number, ${number} to phonebook`)
                    mongoose.connection.close()
                })
                .catch((error) => {
                    console.error('Error connecting to MongoDB or saving person:', error)
                    mongoose.connection.close()
                })
        } else {
            return Person.find({})
                .then(result => {
                    console.log('Phonebook:')
                    result.forEach(person => {
                        console.log(`${person.name} ${person.number}`)
                    })
                    mongoose.connection.close()
                })
        }
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB or fetching persons data:', error)
        mongoose.connection.close()
    })
