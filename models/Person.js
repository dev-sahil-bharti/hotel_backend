const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// define the person schema

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save', async function (next) {
    const person = this;

    // Hash the password only if it has been modified(or is new)
    if (!person.isModified('password')) return next();


    try {
        // hash password Genration
        const salt = await bcrypt.genSalt(10);

        // hass password
        const hashPassword = await bcrypt.hash(person.password, salt)

        // Override the plain password with the hashed one 
        person.password = hashPassword;

        next();
    } catch (error) {
        return next(error)
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        // Use bcrypt to compare the provied password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch;
    } catch (err) {
        throw err;
    }
}

// create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;