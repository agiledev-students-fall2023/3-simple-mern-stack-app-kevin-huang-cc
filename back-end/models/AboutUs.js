const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AboutUsSchema = new Schema(
    {
        text: {
        type: String,
        required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

// create mongoose Model
const AboutUs = mongoose.model('AboutUs', AboutUsSchema)

// export the model so other modules can import it
module.exports = {
    AboutUs,
}
